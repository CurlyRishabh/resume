import { init, paymentRetries, runToEnd } from "../sim/engine";
import { violations } from "../sim/invariants";
import { encodeRun } from "../sim/share";
import type { Action, Input, KillTarget } from "../sim/types";

type EventName = "kill" | "kill:agent" | "kill:payment" | "deploy" | "portal" | "fix";
export interface RunOptions {
  seed?: number;
  /** [second, event] pairs, e.g. [[10, "kill:payment"], [30, "deploy"]] */
  events?: [number, EventName][];
}

const toAction = (name: EventName): Action => {
  if (name.startsWith("kill")) return { type: "kill", target: (name.split(":")[1] ?? "any") as KillTarget };
  if (name === "deploy") return { type: "deploy" };
  if (name === "portal") return { type: "changePortal" };
  if (name === "fix") return { type: "pushConfig" };
  throw new Error(`Unknown event "${name}". Use kill, kill:agent, kill:payment, deploy, portal or fix.`);
};

function toInputs(events: RunOptions["events"] = []): Input[] {
  if (!Array.isArray(events)) throw new Error("events must be an array of [second, event] pairs");
  return events
    .map(([t, name]) => {
      if (!Number.isInteger(t) || t < 0 || t > 9999) throw new Error(`Bad time ${t}: use a whole second between 0 and 9999`);
      return { t, action: toAction(name) };
    })
    .sort((a, b) => a.t - b.t);
}

/** Small deterministic PRNG so sim.check(n, seed) is reproducible. */
function prng(seed: number) {
  let x = seed | 0 || 1;
  return () => {
    x ^= x << 13;
    x ^= x >>> 17;
    x ^= x << 5;
    return (x >>> 0) / 4294967296;
  };
}

const CHAOS: EventName[] = ["kill", "kill:agent", "kill:payment", "deploy", "portal", "fix"];

export function createApi(resume: unknown) {
  const sim = {
    /** Run the simulator headlessly and summarise the outcome. */
    run({ seed = 42, events = [] }: RunOptions = {}) {
      const inputs = toInputs(events);
      const states = runToEnd(seed, inputs);
      const end = states[states.length - 1];
      return {
        seed,
        seconds: end.t,
        done: end.stats.done,
        flagged: end.orders.filter((o) => o.status === "review").map((o) => `${o.id} (${o.review})`),
        resumedFromCheckpoint: end.stats.resumed,
        paymentRetries: paymentRetries(end),
        violations: violations(states, { expectSettled: false }),
        link: `/#${encodeRun(seed, inputs)}`,
      };
    },

    /** Load a run into the home page figure. */
    show(options: RunOptions = {}) {
      return { __hash: encodeRun(options.seed ?? 42, toInputs(options.events)) };
    },

    /** Property check in your browser: n random chaos runs against every invariant. */
    check(n = 200, seed = Date.now()) {
      if (!Number.isInteger(n) || n < 1 || n > 5000) throw new Error("n must be a whole number from 1 to 5000");
      const rand = prng(seed);
      const started = performance.now();
      const failures: { seed: number; events: [number, EventName][]; violations: string[] }[] = [];
      for (let i = 0; i < n; i++) {
        const runSeed = Math.floor(rand() * 2 ** 31);
        const events: [number, EventName][] = Array.from({ length: Math.floor(rand() * 10) }, () => [
          Math.floor(rand() * 60),
          CHAOS[Math.floor(rand() * CHAOS.length)],
        ]);
        events.push([61, "fix"]);
        const found = violations(runToEnd(runSeed, toInputs(events)));
        if (found.length) failures.push({ seed: runSeed, events, violations: found });
      }
      return { runs: n, violations: failures.length, ms: Math.round(performance.now() - started), failures: failures.slice(0, 3) };
    },

    /** The engine's initial state for a seed, for poking around. */
    state(seed = 42) {
      return init(seed);
    },
  };

  const help = () => HELP;
  return { resume, sim, help };
}

export const HELP = `Everything runs in a sandboxed Web Worker: no DOM, no network.

  resume                         this site's data, e.g. resume.experience.map(j => j.company)
  sim.run({ seed, events })      run the simulator headlessly
                                   events: [[10, "kill:payment"], [30, "deploy"]]
                                   kinds: kill, kill:agent, kill:payment, deploy, portal, fix
  sim.show({ seed, events })     load that run into the figure on the home page
  sim.check(n = 200)             n random chaos runs checked against every invariant
  sim.state(seed)                the initial state for a seed
  clear                          clear the console        ↑ ↓  history        esc  close`;

/** Evaluate an expression (or, failing that, statements) with the API in scope. */
export async function evaluate(code: string, api: ReturnType<typeof createApi>): Promise<unknown> {
  const names = Object.keys(api);
  const values = Object.values(api);
  let fn: (...args: unknown[]) => unknown;
  try {
    fn = new Function(...names, `"use strict"; return (${code}\n);`) as typeof fn;
  } catch {
    fn = new Function(...names, `"use strict"; ${code}`) as typeof fn;
  }
  return await fn(...values);
}

/** Render any value as readable text, bounded in size. */
export function format(value: unknown, limit = 6000): string {
  let text: string;
  if (typeof value === "string") text = value;
  else if (typeof value === "function") text = `[function ${value.name || "anonymous"}]`;
  else if (value === undefined) text = "undefined";
  else try {
    text = JSON.stringify(
      value,
      (_k, v) => (v instanceof Map ? Object.fromEntries(v) : typeof v === "function" ? `[function ${v.name || "anonymous"}]` : v),
      2,
    );
  } catch {
    text = String(value);
  }
  return text.length > limit ? `${text.slice(0, limit)}\n… (${text.length - limit} more characters)` : text;
}
