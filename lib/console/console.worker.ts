/// <reference lib="webworker" />
import { resume } from "../../app/data/resume";
import { createApi, evaluate, format } from "./api";

export type ToConsole = { id: number; code: string };
export type FromConsole =
  | { id: number; ok: true; text: string; hash?: string; ms: number }
  | { id: number; ok: false; error: string; ms: number };

const scope = self as unknown as DedicatedWorkerGlobalScope & Record<string, unknown>;

// Visitor code runs here. No DOM exists in a worker; network APIs are switched off too.
for (const name of ["fetch", "XMLHttpRequest", "WebSocket", "EventSource", "importScripts", "indexedDB", "caches"]) {
  try {
    Object.defineProperty(scope, name, { value: undefined, configurable: false, writable: false });
  } catch {
    // Some engines lock these down already.
  }
}

const api = createApi(resume);

scope.onmessage = async (event: MessageEvent<ToConsole>) => {
  const { id, code } = event.data;
  const started = performance.now();
  try {
    const value = await evaluate(code, api);
    const hash = value && typeof value === "object" && "__hash" in value ? String((value as { __hash: string }).__hash) : undefined;
    const text = hash ? `Loaded run ${hash} into Fig. 1` : format(value);
    scope.postMessage({ id, ok: true, text, hash, ms: performance.now() - started } satisfies FromConsole);
  } catch (err) {
    const error = err instanceof Error ? `${err.name}: ${err.message}` : String(err);
    scope.postMessage({ id, ok: false, error, ms: performance.now() - started } satisfies FromConsole);
  }
};
