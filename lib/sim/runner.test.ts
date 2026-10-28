import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { replay } from "./engine";
import type { Frame } from "./protocol";
import { Runner, TICK_MS } from "./runner";

describe("Runner", () => {
  let frames: Frame[];
  let runner: Runner;
  const last = () => frames[frames.length - 1];

  beforeEach(() => {
    vi.useFakeTimers();
    frames = [];
    runner = new Runner((f) => frames.push(f));
  });
  afterEach(() => vi.useRealTimers());

  it("plays one tick per interval and stops when the run settles", () => {
    runner.handle({ type: "load", seed: 42, inputs: [], autoplay: true });
    vi.advanceTimersByTime(TICK_MS * 5);
    expect(last().state.t).toBe(5);
    vi.advanceTimersByTime(TICK_MS * 500);
    expect(last().playing).toBe(false);
    expect(last().state.orders.every((o) => o.status === "done")).toBe(true);
  });

  it("pauses while off-screen", () => {
    runner.handle({ type: "load", seed: 42, inputs: [], autoplay: true });
    runner.handle({ type: "visible", value: false });
    vi.advanceTimersByTime(TICK_MS * 10);
    expect(last().state.t).toBe(0);
  });

  it("acting in the past branches the timeline and matches a clean replay", () => {
    const story = [{ t: 30, action: { type: "deploy" as const } }];
    runner.handle({ type: "load", seed: 42, inputs: story, autoplay: false, settle: true });
    runner.handle({ type: "seek", t: 10 });
    runner.handle({ type: "act", action: { type: "kill", target: "agent" } });

    expect(last().inputs).toEqual([{ t: 10, action: { type: "kill", target: "agent" } }]);
    expect(last().head).toBe(10);

    runner.handle({ type: "play" });
    vi.advanceTimersByTime(TICK_MS * 20);
    expect(last().state).toEqual(replay(42, last().inputs, last().state.t));
  });

  it("resumes playback when the user acts on a finished run", () => {
    runner.handle({ type: "load", seed: 3, inputs: [{ t: 0, action: { type: "changePortal" } }], autoplay: false, settle: true });
    expect(last().done).toBe(true);
    runner.handle({ type: "act", action: { type: "pushConfig" } });
    expect(last().playing).toBe(true);
    vi.advanceTimersByTime(TICK_MS * 200);
    expect(last().state.orders.every((o) => o.status === "done")).toBe(true);
  });
});
