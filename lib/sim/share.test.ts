import fc from "fast-check";
import { describe, expect, it } from "vitest";
import { decodeRun, encodeRun } from "./share";
import type { Action, Input } from "./types";

const action = fc.constantFrom<Action>(
  { type: "kill", target: "any" },
  { type: "kill", target: "agent" },
  { type: "kill", target: "payment" },
  { type: "deploy" },
  { type: "changePortal" },
  { type: "pushConfig" },
);

describe("run links", () => {
  it("round-trips any seed and input log", () => {
    fc.assert(
      fc.property(
        fc.integer(),
        fc.array(fc.record({ t: fc.integer({ min: 0, max: 9999 }), action }), { maxLength: 20 }),
        (seed, list) => {
          const sorted: Input[] = [...list].sort((a, b) => a.t - b.t);
          const decoded = decodeRun("#" + encodeRun(seed, sorted))!;
          expect(decoded.seed).toBe(seed);
          expect(decoded.inputs.map((i) => i.t)).toEqual(sorted.map((i) => i.t));
          expect(new Set(decoded.inputs.map((i) => JSON.stringify(i)))).toEqual(new Set(sorted.map((i) => JSON.stringify(i))));
        },
      ),
    );
  });

  it("produces short, readable links", () => {
    expect(encodeRun(42, [
      { t: 10, action: { type: "kill", target: "agent" } },
      { t: 30, action: { type: "deploy" } },
    ])).toBe("run-42-k10a.d30");
  });

  it("rejects anything that is not a run link", () => {
    for (const bad of ["", "#contact", "#run-", "#run-42-x1", "#run-42-k10z", "#run-42-k99999"]) {
      expect(decodeRun(bad)).toBeNull();
    }
  });
});
