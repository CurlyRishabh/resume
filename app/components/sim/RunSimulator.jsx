"use client"
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { HANDOFF, STEPS, paymentRetries } from "@/lib/sim/engine";
import { decodeRun, encodeRun } from "@/lib/sim/share";
import { STORY, STORY_SEED } from "@/lib/sim/story";
import { toast } from "../Toaster";
import { useSimulation } from "./useSimulation";

const LOG_LINES = 6;

function orderLabel(order) {
    switch (order.status) {
        case "waiting": return { text: "—", tone: "text-muted" };
        case "queued": return { text: "queued", tone: "text-muted" };
        case "running": return { text: order.pod, tone: "text-ink" };
        case "done": return { text: `done ${order.finishedAt - order.startedAt}s`, tone: "text-ok" };
        default: return { text: "flagged", tone: "text-fail" };
    }
}

function podState(pod) {
    if (pod.state === "ready") return pod.order ? "busy" : "idle";
    return pod.state;
}

function useFps(ref) {
    const [fps, setFps] = useState(null);
    useEffect(() => {
        let raf;
        let frames = 0;
        let start = performance.now();
        let visible = true;
        const loop = (now) => {
            frames += 1;
            if (now - start >= 1000) {
                setFps(Math.round((frames * 1000) / (now - start)));
                frames = 0;
                start = now;
            }
            if (visible) raf = requestAnimationFrame(loop);
        };
        const observer = new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
            cancelAnimationFrame(raf);
            if (visible) {
                frames = 0;
                start = performance.now();
                raf = requestAnimationFrame(loop);
            }
        });
        if (ref.current) observer.observe(ref.current);
        return () => {
            observer.disconnect();
            cancelAnimationFrame(raf);
        };
    }, [ref]);
    return fps;
}

function Lanes({ state }) {
    const summary = `${state.orders.filter((o) => o.status === "done").length} of ${state.orders.length} orders done, ${state.stats.flagged} flagged`;
    const cell = (step, i, key) => {
        const progress = step.status === "running" ? Math.min(1, (state.t - step.startedAt) / step.duration) : 0;
        return (
            <span key={key} className={`cell cell-${step.status}`} title={`${STEPS[i].id}: ${step.status}`}>
                <i style={{ transform: `scaleX(${progress})` }} />
            </span>
        );
    };
    const withHandoff = (items, render) => {
        const out = items.map(render);
        out.splice(HANDOFF, 0, <span key="handoff" className="handoff" aria-hidden="true" />);
        return out;
    };

    return (
        <div className="overflow-x-auto">
            <div className="lanes" role="img" aria-label={summary}>
                <div className="lane lane-group">
                    <span />
                    <span className="col-span-3">LLM agent</span>
                    <span className="handoff" />
                    <span className="col-span-3">Scripted · Playwright</span>
                    <span />
                </div>
                <div className="lane lane-steps">
                    <span>order</span>
                    {withHandoff(STEPS, (s) => <span key={s.id}>{s.id}</span>)}
                    <span className="text-right">status</span>
                </div>
                {state.orders.map((order) => {
                    const label = orderLabel(order);
                    return (
                        <div key={order.id} className={`lane ${order.status === "waiting" ? "opacity-40" : ""}`}>
                            <span className="text-ink">{order.id}</span>
                            {withHandoff(order.steps, (step, i) => cell(step, i, i))}
                            <span className={`text-right ${label.tone}`} title={order.review === "unknown-outcome" ? "Pod died mid-payment. Not retried; needs a human." : order.review === "stale" ? "Portal changed. Nothing submitted; safe to retry after a config fix." : undefined}>
                                {label.text}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function Stat({ value, label, tone = "text-ink" }) {
    return (
        <div className="flex flex-col gap-0.5">
            <span className={`font-mono text-lg font-medium tabular-nums leading-none ${tone}`}>{value}</span>
            <span className="text-xs text-muted">{label}</span>
        </div>
    );
}

export default function RunSimulator() {
    const figureRef = useRef(null);
    const { frame, send, thread } = useSimulation(STORY_SEED);
    const fps = useFps(figureRef);
    const { state, head, playing, done, inputs, tickCost } = frame;

    useEffect(() => {
        const shared = decodeRun(window.location.hash);
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        send({
            type: "load",
            seed: shared?.seed ?? STORY_SEED,
            inputs: shared?.inputs ?? STORY,
            autoplay: !reduce,
            settle: reduce,
        });

        const observer = new IntersectionObserver(([entry]) => send({ type: "visible", value: entry.isIntersecting }));
        if (figureRef.current) observer.observe(figureRef.current);
        return () => observer.disconnect();
    }, [send]);

    const act = (action) => send({ type: "act", action });
    const portalStale = state.portalVersion > state.configVersion;
    const retries = paymentRetries(state);
    const log = state.log.slice(-LOG_LINES);

    const copyLink = async () => {
        const url = `${window.location.origin}${window.location.pathname}#${encodeRun(state.seed, inputs)}`;
        try {
            await navigator.clipboard.writeText(url);
            toast("Link to this exact run copied");
        } catch {
            toast("Couldn't copy the link");
        }
    };

    return (
        <figure
            ref={figureRef}
            className="rise mt-[52px] overflow-hidden rounded-xl border border-rule bg-surface"
            style={{ "--i": 4 }}
            aria-labelledby="sim-title"
            data-xray="client"
            data-xray-label="RunSimulator · client island + Web Worker"
        >
            <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 border-b border-rule px-4 py-3 font-mono text-[12.5px] text-muted">
                <span><b className="font-medium text-ink">Fig. 1</b>&nbsp; seed {state.seed >>> 0} · t={state.t}s</span>
                <span className="tabular-nums" title="The simulation ticks in a Web Worker; the main thread only renders.">
                    {thread === "worker" ? "worker" : "main thread"} · {tickCost ? `${tickCost.toFixed(2)} ms/tick` : "idle"} · {fps ?? "–"} fps
                </span>
            </div>

            <div className="flex flex-col gap-4 px-4 pb-4 pt-4">
                <Lanes state={state} />

                <div className="flex flex-wrap gap-1.5" aria-label="Pods">
                    {state.pods.map((pod) => (
                        <span key={pod.id} className={`pod pod-${podState(pod)}`}>
                            <i aria-hidden="true" />{pod.id} v{pod.version} · {podState(pod)}
                        </span>
                    ))}
                    <span className="pod pod-queue">queue {state.queue.length}</span>
                </div>

                <div className="grid grid-cols-2 gap-4 border-y border-rule py-3 sm:grid-cols-4">
                    <Stat value={`${state.stats.done}/${state.orders.length}`} label="orders done" />
                    <Stat value={state.stats.flagged} label="flagged for a human" tone={state.stats.flagged ? "text-fail" : "text-ink"} />
                    <Stat value={state.stats.resumed} label="resumed from checkpoint" />
                    <Stat value={retries} label="payments retried" tone={retries ? "text-fail" : "text-ok"} />
                </div>

                <ol className="m-0 h-[calc(6*1.7em)] list-none overflow-hidden p-0 font-mono text-xs leading-[1.7] text-muted" aria-label="Event log">
                    {log.map((entry) => (
                        <li key={`${entry.t}-${entry.text}`} className="log-line flex gap-3.5">
                            <span className="min-w-[3em] tabular-nums text-ink opacity-[0.55]">{entry.t}s</span>
                            <span className={entry.tone === "fail" ? "text-fail" : entry.tone === "ok" ? "text-ok" : entry.tone === "warn" ? "text-warn" : ""}>
                                {entry.text}
                            </span>
                        </li>
                    ))}
                </ol>

                <div className="flex flex-wrap gap-2">
                    <button type="button" className="btn" onClick={() => act({ type: "kill", target: "any" })}>Kill a pod</button>
                    <button type="button" className="btn" onClick={() => act({ type: "deploy" })}>Deploy</button>
                    <button type="button" className="btn" onClick={() => act({ type: "changePortal" })}>Change the portal</button>
                    <button type="button" className="btn" disabled={!portalStale} onClick={() => act({ type: "pushConfig" })}>Push config fix</button>
                </div>

                <div className="flex items-center gap-3">
                    <button type="button" className="btn w-[5.5rem] justify-center" onClick={() => send({ type: playing ? "pause" : "play" })}>
                        {playing ? "Pause" : done ? "Replay" : "Play"}
                    </button>
                    <input
                        type="range"
                        className="scrubber min-w-0 flex-1"
                        min={0}
                        max={Math.max(head, 1)}
                        value={state.t}
                        onChange={(e) => send({ type: "seek", t: Number(e.target.value) })}
                        aria-label="Scrub through the run"
                    />
                    <button type="button" className="btn" onClick={copyLink}>Copy link</button>
                </div>
            </div>

            <figcaption className="flex flex-col gap-1.5 border-t border-rule px-4 pb-4 pt-3.5 text-[14.5px]">
                <span id="sim-title" className="font-semibold">Order run simulator</span>
                <p className="m-0 max-w-[40rem] text-muted">
                    A from-scratch simulation of the patterns behind my browser automation work: queue-backed workers,
                    LLM agents for navigation, and deterministic code wherever money moves. Break it with the buttons,
                    or drag the timeline back and change history. It is a TypeScript state machine running in a Web Worker,
                    checked by property-based tests. Not production code.{" "}
                    <Link className="link text-ink" href="/work/browser-agents">Read the case study</Link>
                </p>
            </figcaption>
        </figure>
    );
}
