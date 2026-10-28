import type { Action, Input } from "./types";

/**
 * Encode a run as a URL hash: `run-42-k10a.k21p.d30`.
 * k = kill (a/p/n target), d = deploy, c = change portal, f = push config fix.
 */
const KILL_CODES = { agent: "a", payment: "p", any: "n" } as const;
const KILL_TARGETS = { a: "agent", p: "payment", n: "any" } as const;

function encodeAction(action: Action): string {
  switch (action.type) {
    case "kill":
      return `k${KILL_CODES[action.target ?? "any"]}`;
    case "deploy":
      return "d";
    case "changePortal":
      return "c";
    case "pushConfig":
      return "f";
  }
}

export function encodeRun(seed: number, inputs: readonly Input[]): string {
  const events = inputs.map((i) => {
    const code = encodeAction(i.action);
    return code[0] + i.t + code.slice(1);
  });
  return `run-${seed >>> 0}${events.length ? "-" + events.join(".") : ""}`;
}

const EVENT = /^([kdcf])(\d{1,4})([apn]?)$/;

export function decodeRun(hash: string): { seed: number; inputs: Input[] } | null {
  const match = /^#?run-(\d{1,10})(?:-([\w.]+))?$/.exec(hash);
  if (!match) return null;
  const seed = Number(match[1]) | 0;
  const inputs: Input[] = [];
  for (const token of match[2]?.split(".") ?? []) {
    const ev = EVENT.exec(token);
    if (!ev) return null;
    const t = Number(ev[2]);
    const action: Action =
      ev[1] === "k"
        ? { type: "kill", target: KILL_TARGETS[(ev[3] || "n") as keyof typeof KILL_TARGETS] }
        : ev[1] === "d"
          ? { type: "deploy" }
          : ev[1] === "c"
            ? { type: "changePortal" }
            : { type: "pushConfig" };
    inputs.push({ t, action });
  }
  inputs.sort((a, b) => a.t - b.t);
  return { seed, inputs };
}
