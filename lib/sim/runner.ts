import { apply, isSettled, runToEnd, tick } from "./engine";
import type { Frame, ToSim } from "./protocol";
import type { Input, SimState } from "./types";

export const TICK_MS = 150;

/**
 * Owns one run: plays it in real time, caches every state for scrubbing,
 * and branches the timeline when the user acts in the past.
 * Has no DOM access, so the same class runs in a Web Worker or on the main thread.
 */
export class Runner {
  private seed = 0;
  private inputs: Input[] = [];
  private history: SimState[] = [];
  private view = 0;
  private playing = false;
  private visible = true;
  private timer: ReturnType<typeof setInterval> | null = null;
  private tickTime = 0;
  private tickCount = 0;

  constructor(private emit: (frame: Frame) => void) {}

  handle(msg: ToSim) {
    switch (msg.type) {
      case "load":
        this.seed = msg.seed;
        this.inputs = msg.inputs;
        this.history = msg.settle ? runToEnd(msg.seed, msg.inputs) : runToEnd(msg.seed, msg.inputs, 0);
        this.view = msg.settle ? this.history.length - 1 : 0;
        this.playing = msg.autoplay;
        break;
      case "play":
        if (this.done()) this.view = 0;
        this.playing = true;
        break;
      case "pause":
        this.playing = false;
        break;
      case "seek":
        this.playing = false;
        this.view = Math.max(0, Math.min(msg.t, this.history.length - 1));
        break;
      case "act": {
        // Acting in the past discards that branch's future, like rewriting history.
        const t = this.view;
        // Acting on a finished run should show the consequences, not leave the user to press Play.
        if (this.done()) this.playing = true;
        // Inputs at `t` are already folded into history[t], so they stay ahead of the new one.
        this.inputs = [...this.inputs.filter((i) => i.t <= t), { t, action: msg.action }];
        this.history = this.history.slice(0, t + 1);
        this.history[t] = apply(this.history[t], msg.action);
        break;
      }
      case "visible":
        this.visible = msg.value;
        break;
    }
    this.schedule();
    this.post();
  }

  private current() {
    return this.history[this.view];
  }

  private done() {
    const lastInput = this.inputs.reduce((max, i) => Math.max(max, i.t), 0);
    return this.view === this.history.length - 1 && this.view >= lastInput && isSettled(this.current());
  }

  private step() {
    if (this.view < this.history.length - 1) {
      this.view += 1;
    } else {
      const start = performance.now();
      let next = tick(this.current());
      for (const input of this.inputs) if (input.t === next.t) next = apply(next, input.action);
      this.tickTime += performance.now() - start;
      this.tickCount += 1;
      this.history.push(next);
      this.view = next.t;
    }
    if (this.done()) this.playing = false;
    this.schedule();
    this.post();
  }

  private schedule() {
    const shouldRun = this.playing && this.visible;
    if (shouldRun && !this.timer) this.timer = setInterval(() => this.step(), TICK_MS);
    if (!shouldRun && this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  private post() {
    this.emit({
      state: this.current(),
      head: this.history.length - 1,
      playing: this.playing,
      done: this.done(),
      inputs: this.inputs,
      tickCost: this.tickCount ? this.tickTime / this.tickCount : 0,
    });
  }
}
