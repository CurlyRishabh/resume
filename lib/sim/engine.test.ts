import fc from "fast-check";
import { describe, expect, it } from "vitest";
import { MAX_PODS, STEPS, activePods, isSettled, paymentRetries, replay, runToEnd } from "./engine";
import type { Action, Input, SimState } from "./types";

const action: fc.Arbitrary<Action> = fc.oneof(
  fc.constantFrom<Action>(
    { type: "kill", target: "any" },
    { type: "kill", target: "agent" },
    { type: "kill", target: "payment" },
    { type: "deploy" },
    { type: "changePortal" },
    { type: "pushConfig" },
  ),
);

const inputs: fc.Arbitrary<Input[]> = fc
  .array(fc.record({ t: fc.integer({ min: 0, max: 60 }), action }), { maxLength: 14 })
  .map((list) => [...list].sort((a, b) => a.t - b.t));

const seed = fc.integer();

/** A run ends with a config fix so stale-selector orders get their retry. */
const withFix = (list: Input[]): Input[] => [...list, { t: 61, action: { type: "pushConfig" } }];

function eachPair(states: SimState[], check: (prev: SimState, next: SimState) => void) {
  for (let i = 1; i < states.length; i++) check(states[i - 1], states[i]);
}

describe("invariants under random chaos", () => {
  it("never starts a payment step twice for the same order", () => {
    fc.assert(
      fc.property(seed, inputs, (s, list) => {
        for (const state of runToEnd(s, list)) {
          expect(paymentRetries(state)).toBe(0);
          for (const order of state.orders) {
            order.steps.forEach((step, i) => {
              if (!STEPS[i].idempotent) expect(step.runs).toBeLessThanOrEqual(1);
            });
          }
        }
      }),
    );
  });

  it("never starts a step before every earlier step is done", () => {
    fc.assert(
      fc.property(seed, inputs, (s, list) => {
        for (const state of runToEnd(s, list)) {
          for (const order of state.orders) {
            order.steps.forEach((step, i) => {
              if (step.status === "running" || step.status === "done") {
                expect(order.steps.slice(0, i).every((prev) => prev.status === "done")).toBe(true);
              }
            });
          }
        }
      }),
    );
  });

  it("never re-runs a step that already completed (checkpoints hold)", () => {
    fc.assert(
      fc.property(seed, inputs, (s, list) => {
        eachPair(runToEnd(s, withFix(list)), (prev, next) => {
          prev.orders.forEach((order, o) => {
            order.steps.forEach((step, i) => {
              if (step.status === "done") expect(next.orders[o].steps[i]).toEqual(step);
            });
          });
        });
      }),
    );
  });

  it("never gives a draining pod new work", () => {
    fc.assert(
      fc.property(seed, inputs, (s, list) => {
        eachPair(runToEnd(s, list), (prev, next) => {
          for (const pod of prev.pods.filter((p) => p.state === "draining")) {
            const after = next.pods.find((p) => p.id === pod.id);
            if (after) expect([pod.order, null]).toContain(after.order);
          }
        });
      }),
    );
  });

  it("keeps at most MAX_PODS serving pods", () => {
    fc.assert(
      fc.property(seed, inputs, (s, list) => {
        for (const state of runToEnd(s, list)) expect(activePods(state).length).toBeLessThanOrEqual(MAX_PODS);
      }),
    );
  });

  it("always settles: every order ends done or flagged for review", () => {
    fc.assert(
      fc.property(seed, inputs, (s, list) => {
        const states = runToEnd(s, withFix(list));
        const last = states[states.length - 1];
        expect(isSettled(last)).toBe(true);
        for (const order of last.orders) {
          if (order.status === "done") expect(order.steps.every((st) => st.status === "done")).toBe(true);
          if (order.status === "review") expect(order.review).toBe("unknown-outcome");
        }
      }),
    );
  });

  it("is deterministic: same seed and inputs give the same history", () => {
    fc.assert(
      fc.property(seed, inputs, (s, list) => {
        expect(runToEnd(s, list)).toEqual(runToEnd(s, list));
      }),
      { numRuns: 50 },
    );
  });

  it("replay(t) matches the live run at every t (scrubbing is exact)", () => {
    fc.assert(
      fc.property(seed, inputs, (s, list) => {
        const states = runToEnd(s, list);
        for (const state of states) expect(replay(s, list, state.t)).toEqual(state);
      }),
      { numRuns: 30 },
    );
  });
});

describe("scenarios", () => {
  const last = (list: SimState[]) => list[list.length - 1];

  it("a calm run finishes every order", () => {
    const end = last(runToEnd(42));
    expect(end.orders.every((o) => o.status === "done")).toBe(true);
    expect(end.stats.resumed).toBe(0);
  });

  it("killing a pod mid-payment flags the order instead of retrying it", () => {
    const calm = runToEnd(7);
    const during = calm.find((s) => s.orders.some((o) => o.status === "running" && STEPS[o.current].id === "pay"))!;
    const end = last(runToEnd(7, [{ t: during.t, action: { type: "kill", target: "payment" } }]));
    const flagged = end.orders.filter((o) => o.review === "unknown-outcome");
    expect(flagged).toHaveLength(1);
    expect(paymentRetries(end)).toBe(0);
  });

  it("killing a pod during an agent step resumes from the checkpoint", () => {
    const end = last(runToEnd(7, [{ t: 3, action: { type: "kill", target: "agent" } }]));
    expect(end.stats.resumed).toBe(1);
    expect(end.orders.every((o) => o.status === "done")).toBe(true);
  });

  it("a portal change flags scripted steps until the config is pushed, then retries them", () => {
    const broken = last(runToEnd(3, [{ t: 0, action: { type: "changePortal" } }]));
    expect(broken.orders.every((o) => o.review === "stale")).toBe(true);

    const fixed = last(runToEnd(3, [
      { t: 0, action: { type: "changePortal" } },
      { t: 30, action: { type: "pushConfig" } },
    ]));
    expect(fixed.orders.every((o) => o.status === "done")).toBe(true);
  });

  it("a deploy drains in-flight orders instead of dropping them", () => {
    const end = last(runToEnd(11, [{ t: 6, action: { type: "deploy" } }]));
    expect(end.orders.every((o) => o.status === "done")).toBe(true);
    expect(end.stats.resumed).toBe(0);
    expect(end.pods.every((p) => p.version === 2)).toBe(true);
  });
});
