import fc from "fast-check";
import { describe, expect, it } from "vitest";
import { ALPHA, add, emptySketch, merge, quantile } from "./ddsketch";

const values = fc.array(fc.oneof(fc.double({ min: 0.0001, max: 60000, noNaN: true }), fc.constant(0)), { minLength: 1, maxLength: 400 });
const q = fc.double({ min: 0, max: 1, noNaN: true });

const exact = (list: number[], quant: number) => {
  const sorted = [...list].sort((a, b) => a - b);
  return sorted[Math.floor(quant * (sorted.length - 1))];
};

describe("DDSketch", () => {
  it("returns every quantile within the relative error bound", () => {
    fc.assert(
      fc.property(values, q, (list, quant) => {
        const sketch = list.reduce((s, v) => add(s, v), emptySketch());
        const truth = exact(list, quant);
        const estimate = quantile(sketch, quant)!;
        if (truth === 0) expect(estimate).toBe(0);
        else expect(Math.abs(estimate - truth) / truth).toBeLessThanOrEqual(ALPHA + 1e-12);
      }),
    );
  });

  it("merging two sketches equals sketching the combined data", () => {
    fc.assert(
      fc.property(values, values, (a, b) => {
        const left = merge(a.reduce((s, v) => add(s, v), emptySketch()), b.reduce((s, v) => add(s, v), emptySketch()));
        const both = [...a, ...b].reduce((s, v) => add(s, v), emptySketch());
        expect(left.count).toBe(both.count);
        expect(left.zero).toBe(both.zero);
        expect(new Map([...left.buckets].sort())).toEqual(new Map([...both.buckets].sort()));
      }),
    );
  });

  it("is empty-safe", () => {
    expect(quantile(emptySketch(), 0.5)).toBeNull();
  });
});
