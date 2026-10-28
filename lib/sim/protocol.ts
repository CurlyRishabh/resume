import type { Action, Input, SimState } from "./types";

/** Messages the page sends to the simulation (worker or in-thread fallback). */
export type ToSim =
  | { type: "load"; seed: number; inputs: Input[]; autoplay: boolean; settle?: boolean }
  | { type: "play" }
  | { type: "pause" }
  | { type: "seek"; t: number }
  | { type: "act"; action: Action }
  | { type: "visible"; value: boolean };

export interface Frame {
  state: SimState;
  /** Furthest second computed so far; the scrubber's range. */
  head: number;
  playing: boolean;
  /** At the end of the timeline with every order settled. */
  done: boolean;
  inputs: Input[];
  /** Average cost of computing one tick, in milliseconds. */
  tickCost: number;
}

/** Messages the simulation sends back. */
export type FromSim = { type: "frame"; frame: Frame };
