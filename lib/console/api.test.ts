import { describe, expect, it } from "vitest";
import { createApi, evaluate, format, HELP } from "./api";

const api = createApi({ name: { full: "Test" }, experience: [{ company: "A" }, { company: "B" }] });
const run = (code: string) => evaluate(code, api);

describe("console", () => {
  it("evaluates expressions against the resume data", async () => {
    expect(await run("resume.experience.map(j => j.company)")).toEqual(["A", "B"]);
  });

  it("falls back to statements", async () => {
    expect(await run("const n = 2; return n * 21")).toBe(42);
  });

  it("runs the simulator headlessly", async () => {
    const result = (await run('sim.run({ seed: 42, events: [[10, "kill:agent"], [21, "kill:payment"], [30, "deploy"]] })')) as Record<string, unknown>;
    expect(result).toMatchObject({ seed: 42, done: 5, resumedFromCheckpoint: 1, paymentRetries: 0, violations: [] });
    expect(result.link).toBe("/#run-42-k10a.k21p.d30");
  });

  it("checks invariants over random runs", async () => {
    expect(await run("sim.check(25, 1)")).toMatchObject({ runs: 25, violations: 0, failures: [] });
  });

  it("explains bad input instead of crashing", async () => {
    await expect(run('sim.run({ events: [[5, "explode"]] })')).rejects.toThrow(/Unknown event/);
    await expect(run("sim.check(0)")).rejects.toThrow(/1 to 5000/);
  });

  it("returns a navigation marker from sim.show", async () => {
    expect(await run('sim.show({ seed: 7, events: [[3, "portal"]] })')).toEqual({ __hash: "run-7-c3" });
  });

  it("formats values readably and bounded", () => {
    expect(format(HELP)).toBe(HELP);
    expect(format(new Map([["a", 1]]))).toBe('{\n  "a": 1\n}');
    expect(format("x".repeat(10), 5)).toBe("xxxxx\n… (5 more characters)");
    expect(format({ s: "x".repeat(20) }, 10)).toMatch(/more characters/);
  });
});
