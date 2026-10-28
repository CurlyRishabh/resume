"use client"
import { useCallback, useEffect, useRef, useState } from "react";
import { init } from "@/lib/sim/engine";
import { Runner } from "@/lib/sim/runner";

/**
 * Runs the simulation in a Web Worker so the page never janks while it ticks.
 * Falls back to the same Runner on the main thread if workers are unavailable.
 */
export function useSimulation(initialSeed) {
    const [frame, setFrame] = useState(() => ({
        state: init(initialSeed),
        head: 0,
        playing: false,
        done: false,
        inputs: [],
        tickCost: 0,
    }));
    const [thread, setThread] = useState("worker");
    const sendRef = useRef(() => {});

    useEffect(() => {
        let worker;
        let runner;
        try {
            worker = new Worker(new URL("../../../lib/sim/sim.worker.ts", import.meta.url), { type: "module" });
            worker.onmessage = (event) => setFrame(event.data.frame);
            sendRef.current = (msg) => worker.postMessage(msg);
            window.__activeWorkers = (window.__activeWorkers ?? 0) + 1;
        } catch {
            runner = new Runner(setFrame);
            sendRef.current = (msg) => runner.handle(msg);
            setThread("main");
        }
        return () => {
            if (worker) {
                worker.terminate();
                window.__activeWorkers -= 1;
            }
            runner?.handle({ type: "pause" });
        };
    }, []);

    const send = useCallback((msg) => sendRef.current(msg), []);
    return { frame, send, thread };
}
