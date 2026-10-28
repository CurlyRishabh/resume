/// <reference lib="webworker" />
import type { FromSim, ToSim } from "./protocol";
import { Runner } from "./runner";

const scope = self as unknown as DedicatedWorkerGlobalScope;
const runner = new Runner((frame) => scope.postMessage({ type: "frame", frame } satisfies FromSim));

scope.onmessage = (event: MessageEvent<ToSim>) => runner.handle(event.data);
