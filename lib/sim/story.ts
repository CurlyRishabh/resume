import type { Input } from "./types";

/** The run the home page plays by default: a crash mid-agent, a crash mid-payment, then a deploy. */
export const STORY_SEED = 42;

export const STORY: Input[] = [
  { t: 10, action: { type: "kill", target: "agent" } },
  { t: 21, action: { type: "kill", target: "payment" } },
  { t: 30, action: { type: "deploy" } },
];
