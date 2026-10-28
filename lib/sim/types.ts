export type StepId = "login" | "search" | "extract" | "pay" | "mfa" | "confirm";

export interface StepDef {
  id: StepId;
  /** "agent" steps are driven by an LLM; "scripted" steps are deterministic Playwright. */
  kind: "agent" | "scripted";
  /** Safe to run again after an interruption. Payment steps are not. */
  idempotent: boolean;
  /** Duration range in simulated seconds. */
  min: number;
  max: number;
}

export type StepStatus = "queued" | "running" | "done" | "failed" | "skipped";

export interface StepState {
  status: StepStatus;
  /** Times this step actually started executing. */
  runs: number;
  startedAt: number | null;
  duration: number;
}

export type OrderStatus = "waiting" | "queued" | "running" | "done" | "review";

/** Why an order was flagged for a human. "stale" means nothing was submitted, so it is safe to retry. */
export type ReviewReason = "unknown-outcome" | "stale";

export interface Order {
  id: string;
  arrivesAt: number;
  status: OrderStatus;
  pod: string | null;
  current: number;
  steps: StepState[];
  review: ReviewReason | null;
  startedAt: number | null;
  finishedAt: number | null;
}

export type PodState = "booting" | "ready" | "draining";

export interface Pod {
  id: string;
  version: number;
  state: PodState;
  order: string | null;
  readyAt: number;
}

export type KillTarget = "any" | "agent" | "payment";

export type Action =
  | { type: "kill"; target?: KillTarget }
  | { type: "deploy" }
  | { type: "changePortal" }
  | { type: "pushConfig" };

export interface Input {
  t: number;
  action: Action;
}

export type Tone = "ok" | "fail" | "warn";

export interface LogEntry {
  t: number;
  text: string;
  tone?: Tone;
}

export interface Stats {
  done: number;
  flagged: number;
  resumed: number;
}

export interface SimState {
  t: number;
  seed: number;
  rng: number;
  orders: Order[];
  pods: Pod[];
  queue: string[];
  /** Deployed app version. */
  version: number;
  /** Portal markup version vs. the version the scripted selectors were written for. */
  portalVersion: number;
  configVersion: number;
  podCounter: number;
  log: LogEntry[];
  stats: Stats;
}
