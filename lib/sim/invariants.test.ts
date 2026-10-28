import fc from "fast-check";
import { describe, expect, it } from "vitest";
import { runToEnd } from "./engine";
import { violations } from "./invariants";
import type { Action } from "./types";

const action = fc.constantFrom<Action>(
  { type: "kill", target: "any" },
  { type: "kill", target: "payment" },
  { type: "deploy" },
  { type: "changePortal" },
  { type: "pushConfig" },
);

describe("violations()", () => {
  it("finds nothing wrong in random chaos runs", () => {
    fc.assert(
      fc.property(fc.integer(), fc.array(fc.record({ t: fc.integer({ min: 0, max: 60 }), action }), { maxLength: 12 }), (seed, list) => {
        const inputs = [...list].sort((a, b) => a.t - b.t);
        inputs.push({ t: 61, action: { type: "pushConfig" } });
        expect(violations(runToEnd(seed, inputs))).toEqual([]);
      }),
    );
  });

  it("catches a payment that started twice and a lost checkpoint", () => {
    const states = runToEnd(42);
    const tampered = structuredClone(states);
    const end = tampered[tampered.length - 1];
    end.orders[0].steps[3].runs = 2;
    end.orders[1].steps[0].status = "queued";
    const found = violations(tampered);
    expect(found.some((v) => v.includes("payment step started twice"))).toBe(true);
    expect(found.some((v) => v.includes("lost its login checkpoint"))).toBe(true);
  });
});
