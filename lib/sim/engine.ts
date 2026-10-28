import type { Action, Input, KillTarget, LogEntry, Order, Pod, SimState, StepDef, Tone } from "./types";

export const STEPS: readonly StepDef[] = [
  { id: "login", kind: "agent", idempotent: true, min: 2, max: 4 },
  { id: "search", kind: "agent", idempotent: true, min: 2, max: 4 },
  { id: "extract", kind: "agent", idempotent: true, min: 3, max: 5 },
  { id: "pay", kind: "scripted", idempotent: false, min: 2, max: 3 },
  { id: "mfa", kind: "scripted", idempotent: false, min: 2, max: 3 },
  { id: "confirm", kind: "scripted", idempotent: true, min: 1, max: 2 },
];

/** Index of the first scripted step: where the LLM hands off to deterministic code. */
export const HANDOFF = STEPS.findIndex((s) => s.kind === "scripted");

export const ORDER_COUNT = 6;
export const MAX_PODS = 3;
export const BOOT_TIME = 5;
/** Extra seconds an agent spends re-resolving elements after the portal changes. */
export const REPLAN_COST = 2;
const LOG_LIMIT = 40;
const POD_NAMES = "abcdefghijklmnopqrstuvwxyz";

// mulberry32: tiny, fast, and fully determined by its 32-bit state.
function nextRandom(s: SimState): number {
  let x = (s.rng = (s.rng + 0x6d2b79f5) | 0);
  x = Math.imul(x ^ (x >>> 15), x | 1);
  x ^= x + Math.imul(x ^ (x >>> 7), x | 61);
  return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
}

function randInt(s: SimState, min: number, max: number): number {
  return min + Math.floor(nextRandom(s) * (max - min + 1));
}

function log(s: SimState, text: string, tone?: Tone) {
  const entry: LogEntry = tone ? { t: s.t, text, tone } : { t: s.t, text };
  s.log.push(entry);
  if (s.log.length > LOG_LIMIT) s.log.shift();
}

function spawnPod(s: SimState, readyAt: number): Pod {
  const pod: Pod = {
    id: `pod-${POD_NAMES[s.podCounter % POD_NAMES.length]}`,
    version: s.version,
    state: "booting",
    order: null,
    readyAt,
  };
  s.podCounter += 1;
  s.pods.push(pod);
  return pod;
}

export const activePods = (s: SimState) => s.pods.filter((p) => p.state !== "draining");
const orderById = (s: SimState, id: string) => s.orders.find((o) => o.id === id)!;
const portalChanged = (s: SimState) => s.portalVersion > s.configVersion;

export function init(seed: number): SimState {
  const s: SimState = {
    t: 0,
    seed,
    rng: seed | 0,
    orders: [],
    pods: [],
    queue: [],
    version: 1,
    portalVersion: 1,
    configVersion: 1,
    podCounter: 0,
    log: [],
    stats: { done: 0, flagged: 0, resumed: 0 },
  };
  let arrivesAt = 1;
  for (let i = 0; i < ORDER_COUNT; i++) {
    s.orders.push({
      id: `#${1041 + i}`,
      arrivesAt,
      status: "waiting",
      pod: null,
      current: 0,
      steps: STEPS.map(() => ({ status: "queued", runs: 0, startedAt: null, duration: 0 })),
      review: null,
      startedAt: null,
      finishedAt: null,
    });
    arrivesAt += randInt(s, 0, 3);
  }
  const pod = spawnPod(s, 0);
  pod.state = "ready";
  return s;
}

function flag(s: SimState, order: Order, reason: NonNullable<Order["review"]>) {
  order.status = "review";
  order.review = reason;
  order.pod = null;
  order.finishedAt = s.t;
  order.steps.forEach((step, i) => {
    if (i > order.current && step.status === "queued") step.status = "skipped";
  });
  s.stats.flagged += 1;
}

function startStep(s: SimState, pod: Pod, order: Order) {
  const def = STEPS[order.current];
  const step = order.steps[order.current];

  if (def.kind === "scripted" && portalChanged(s)) {
    // Fixed selectors no longer match. Fail before touching anything rather than guess near money.
    step.status = "failed";
    pod.order = null;
    flag(s, order, "stale");
    log(s, `${order.id} ${def.id}: selector not found. Nothing submitted, flagged`, "fail");
    return;
  }

  step.status = "running";
  step.runs += 1;
  step.startedAt = s.t;
  step.duration = randInt(s, def.min, def.max);
  if (def.kind === "agent" && portalChanged(s)) {
    step.duration += REPLAN_COST;
    if (order.current === 0) log(s, `${order.id} agent re-resolved changed portal elements`, "warn");
  }
  if (order.current === HANDOFF) log(s, `${order.id} handoff: agent → scripted payment`);
}

function assign(s: SimState, pod: Pod, order: Order) {
  pod.order = order.id;
  order.pod = pod.id;
  order.status = "running";
  if (order.startedAt === null) order.startedAt = s.t;
  startStep(s, pod, order);
}

/** Advance the simulation by one second. Pure: returns a new state. */
export function tick(prev: SimState): SimState {
  const s = structuredClone(prev);
  s.t += 1;

  for (const order of s.orders) {
    if (order.status === "waiting" && order.arrivesAt <= s.t) {
      order.status = "queued";
      s.queue.push(order.id);
    }
  }

  for (const pod of s.pods) {
    if (pod.state === "booting" && pod.readyAt <= s.t) {
      pod.state = "ready";
      log(s, `${pod.id} v${pod.version} ready`);
    }
  }

  for (const pod of s.pods) {
    if (!pod.order) continue;
    const order = orderById(s, pod.order);
    const step = order.steps[order.current];
    if (step.status !== "running" || s.t - step.startedAt! < step.duration) continue;

    step.status = "done";
    if (STEPS[order.current].id === "pay") log(s, `${order.id} payment submitted`);
    order.current += 1;
    if (order.current === STEPS.length) {
      order.status = "done";
      order.pod = null;
      order.finishedAt = s.t;
      pod.order = null;
      s.stats.done += 1;
      log(s, `${order.id} done in ${s.t - order.startedAt!}s`, "ok");
    } else {
      startStep(s, pod, order);
    }
  }

  const drained = s.pods.filter((p) => p.state === "draining" && !p.order);
  for (const pod of drained) log(s, `${pod.id} drained, exited cleanly`);
  s.pods = s.pods.filter((p) => !drained.includes(p));

  for (const pod of s.pods) {
    if (pod.state === "ready" && !pod.order && s.queue.length > 0) {
      assign(s, pod, orderById(s, s.queue.shift()!));
    }
  }

  // HPA-style scale-up: one pod at a time while there is a backlog.
  const active = activePods(s);
  if (s.queue.length > 0 && active.length < MAX_PODS && !active.some((p) => p.state === "booting")) {
    spawnPod(s, s.t + BOOT_TIME);
    log(s, `autoscaler: backlog ${s.queue.length}, scaling to ${active.length + 1} pods`);
  }

  return s;
}

function pickVictim(s: SimState, target: KillTarget): Pod | undefined {
  const busy = s.pods.filter((p) => p.order);
  const inPayment = (p: Pod) => !STEPS[orderById(s, p.order!).current].idempotent;
  const pools: Record<KillTarget, Pod[]> = {
    payment: busy.filter(inPayment),
    agent: busy.filter((p) => STEPS[orderById(s, p.order!).current].kind === "agent"),
    any: busy,
  };
  const pool = pools[target].length ? pools[target] : busy.length ? busy : s.pods;
  return pool.length ? pool[randInt(s, 0, pool.length - 1)] : undefined;
}

/** Apply a user action at the current time. Pure: returns a new state. */
export function apply(prev: SimState, action: Action): SimState {
  const s = structuredClone(prev);

  switch (action.type) {
    case "kill": {
      const pod = pickVictim(s, action.target ?? "any");
      if (!pod) break;
      s.pods = s.pods.filter((p) => p !== pod);
      log(s, `${pod.id} killed (OOM)`, "fail");
      if (pod.state !== "draining") spawnPod(s, s.t + BOOT_TIME).version = pod.version;
      if (!pod.order) break;

      const order = orderById(s, pod.order);
      const def = STEPS[order.current];
      const step = order.steps[order.current];
      if (step.status === "running" && !def.idempotent) {
        step.status = "failed";
        flag(s, order, "unknown-outcome");
        log(s, `${order.id} died during ${def.id}. Outcome unknown, not retrying`, "fail");
      } else {
        step.status = "queued";
        step.startedAt = null;
        order.status = "queued";
        order.pod = null;
        s.queue.unshift(order.id);
        s.stats.resumed += 1;
        log(s, `${order.id} resumes from checkpoint at ${def.id}`, "warn");
      }
      break;
    }

    case "deploy": {
      s.version += 1;
      const replacing = activePods(s);
      for (const pod of replacing) {
        if (pod.order) pod.state = "draining";
      }
      s.pods = s.pods.filter((p) => p.state === "draining");
      for (let i = 0; i < Math.max(1, replacing.length); i++) spawnPod(s, s.t + BOOT_TIME);
      log(s, `deploy v${s.version}: SIGTERM, ${s.pods.filter((p) => p.state === "draining").length} pod(s) draining`);
      break;
    }

    case "changePortal": {
      s.portalVersion += 1;
      log(s, `portal changed its markup (v${s.portalVersion})`, "warn");
      break;
    }

    case "pushConfig": {
      if (!portalChanged(s)) {
        log(s, "config already matches the portal");
        break;
      }
      s.configVersion = s.portalVersion;
      log(s, `config v${s.configVersion} pushed, no deploy`, "ok");
      for (const order of s.orders) {
        if (order.status !== "review" || order.review !== "stale") continue;
        order.steps.forEach((step, i) => {
          if (i >= order.current) Object.assign(step, { status: "queued", startedAt: null });
        });
        order.status = "queued";
        order.review = null;
        order.finishedAt = null;
        s.stats.flagged -= 1;
        s.queue.push(order.id);
        log(s, `${order.id} retried: it never reached the payment form`);
      }
      break;
    }
  }

  return s;
}

/** Times any payment step started more than once. The design goal is that this is always 0. */
export const paymentRetries = (s: SimState) =>
  s.orders.reduce((n, o) => n + o.steps.reduce((m, step, i) => m + (STEPS[i].idempotent ? 0 : Math.max(0, step.runs - 1)), 0), 0);

export const isSettled = (s: SimState) => s.orders.every((o) => o.status === "done" || o.status === "review");

/**
 * Rebuild the state at time `t` from the seed and the input log.
 * The run is event-sourced, so this is how scrubbing works.
 */
export function replay(seed: number, inputs: readonly Input[], t: number): SimState {
  let s = init(seed);
  const applyDue = () => {
    for (const input of inputs) if (input.t === s.t) s = apply(s, input.action);
  };
  applyDue();
  while (s.t < t) {
    s = tick(s);
    applyDue();
  }
  return s;
}

/** Run until every order settles or `limit` seconds pass. Every intermediate state is returned. */
export function runToEnd(seed: number, inputs: readonly Input[] = [], limit = 400): SimState[] {
  const lastInput = inputs.reduce((max, i) => Math.max(max, i.t), 0);
  const states = [replay(seed, inputs, 0)];
  let s = states[0];
  while (s.t < limit && (s.t < lastInput || !isSettled(s))) {
    s = tick(s);
    for (const input of inputs) if (input.t === s.t) s = apply(s, input.action);
    states.push(s);
  }
  return states;
}

export type { Action, Input };
