"use client"
import { useEffect, useState } from "react";

const W = 120;
const H = 40;
const COL = (640 - 24 - W) / 3;

const NODES = [
    { id: "extract", label: "extract", col: 0, row: 0.5 },
    { id: "parse", label: "parse_pdf", col: 1, row: 0 },
    { id: "rates", label: "fetch_rates", col: 1, row: 1 },
    { id: "recon", label: "reconcile", col: 2, row: 0.5 },
    { id: "write", label: "write_db", col: 3, row: 0 },
    { id: "notify", label: "notify", col: 3, row: 1 },
].map((n) => ({ ...n, x: 12 + n.col * COL, y: 14 + n.row * 100 }));

const byId = Object.fromEntries(NODES.map((n) => [n.id, n]));

const EDGES = [
    ["extract", "parse"], ["extract", "rates"],
    ["parse", "recon"], ["rates", "recon"],
    ["recon", "write"], ["recon", "notify"],
].map(([from, to]) => {
    const a = byId[from], b = byId[to];
    const x1 = a.x + W, y1 = a.y + H / 2, x2 = b.x, y2 = b.y + H / 2, mx = (x1 + x2) / 2;
    return { key: `${from}>${to}`, d: `M${x1} ${y1} C${mx} ${y1} ${mx} ${y2} ${x2} ${y2}` };
});

// One run of the demo: fetch_rates loses its worker, the run resumes from the checkpoint.
const RUN = [
    { at: 0, nodes: { extract: ["running", "running"] }, log: ["0.0s", "run r-2187 started, 6 steps"] },
    { at: 600, nodes: { extract: ["done", "0.6s"], parse: ["running", "running"], rates: ["running", "running"] }, flows: ["extract>parse", "extract>rates"], log: ["0.6s", "extract done"] },
    { at: 1700, nodes: { parse: ["done", "1.1s"] }, log: ["1.7s", "parse_pdf done, output checkpointed"] },
    { at: 2200, nodes: { rates: ["failed", "worker lost"] }, log: ["2.2s", "fetch_rates failed: worker lost (SIGKILL)", "fail"] },
    { at: 3000, nodes: { rates: ["running", "retry 1/3"] }, log: ["3.0s", "resumed from checkpoint, re-running fetch_rates only"] },
    { at: 3900, nodes: { rates: ["done", "0.9s"], recon: ["running", "running"] }, flows: ["parse>recon", "rates>recon"], log: ["3.9s", "fetch_rates done"] },
    { at: 4600, nodes: { recon: ["done", "0.7s"], write: ["running", "running"], notify: ["running", "running"] }, flows: ["recon>write", "recon>notify"], log: ["4.6s", "reconcile done"] },
    { at: 5300, nodes: { write: ["done", "0.7s"], notify: ["done", "0.5s"] }, log: ["5.3s", "run complete. 1 of 6 steps ran twice", "ok"] },
];

function stateAt(applied) {
    const nodes = Object.fromEntries(NODES.map((n) => [n.id, ["queued", "queued"]]));
    const flows = new Set();
    const log = [];
    RUN.slice(0, applied).forEach((event) => {
        Object.assign(nodes, event.nodes);
        event.flows?.forEach((f) => flows.add(f));
        log.push(event.log);
    });
    return { nodes, flows, log };
}

const toneClass = { fail: "text-fail", ok: "text-ok" };

export default function OrchestratorFigure({ project }) {
    const [applied, setApplied] = useState(0);
    const [runId, setRunId] = useState(0);

    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setApplied(RUN.length);
            return;
        }
        setApplied(0);
        const delay = runId === 0 ? 750 : 0;
        const timers = RUN.map((event, i) => setTimeout(() => setApplied(i + 1), delay + event.at));
        return () => timers.forEach(clearTimeout);
    }, [runId]);

    const { nodes, flows, log } = stateAt(applied);

    return (
        <figure className="rise mt-[52px] overflow-hidden rounded-xl border border-rule bg-surface" style={{ "--i": 4 }} aria-labelledby="fig-title">
            <div className="flex items-center justify-between gap-3 border-b border-rule px-4 py-3">
                <span className="font-mono text-[12.5px] text-muted">
                    <b className="font-medium text-ink">Fig. 1</b>&nbsp; run r-2187 · 6 steps
                </span>
                <button type="button" className="btn" onClick={() => setRunId((id) => id + 1)}>
                    <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                        <path d="M2.5 8a5.5 5.5 0 1 0 1.7-3.97" />
                        <path d="M2.5 2.5v3h3" />
                    </svg>
                    Replay
                </button>
            </div>

            <div className="overflow-x-auto px-4 pb-1.5 pt-[18px]">
                <svg
                    className="dag block h-auto w-full min-w-[580px]"
                    viewBox="0 0 640 168"
                    role="img"
                    aria-label="Six-step workflow graph. fetch_rates fails, the run resumes from its checkpoint, and only that step runs again."
                >
                    {EDGES.map((e) => (
                        <path key={e.key} d={e.d} className="edge" />
                    ))}
                    {EDGES.map((e) => (
                        <path key={e.key} d={e.d} pathLength="1" className={`flow ${flows.has(e.key) ? "on" : ""}`} />
                    ))}
                    {NODES.map((n) => (
                        <g key={n.id} className="node" data-state={nodes[n.id][0]}>
                            <rect className="box" x={n.x + 0.5} y={n.y + 0.5} width={W - 1} height={H - 1} rx="8" />
                            <circle className="dot" cx={n.x + W - 14} cy={n.y + 14} r="3.5" />
                            <text className="label" x={n.x + 12} y={n.y + 18}>{n.label}</text>
                            <text className="status" x={n.x + 12} y={n.y + 31}>{nodes[n.id][1]}</text>
                            <rect className="bar" x={n.x + 10} y={n.y + H - 4} width={W - 20} height="1.5" rx="0.75" />
                        </g>
                    ))}
                </svg>
            </div>

            <ol className="m-0 h-[calc(8*1.75em+22px)] list-none overflow-hidden px-4 pb-3.5 pt-2 font-mono text-xs leading-[1.75] text-muted">
                {log.map(([t, msg, tone], i) => (
                    <li key={i} className="log-line flex gap-3.5">
                        <span className="min-w-[3.2em] tabular-nums text-ink opacity-[0.55]">{t}</span>
                        <span className={toneClass[tone] ?? ""}>{msg}</span>
                    </li>
                ))}
            </ol>

            <figcaption className="flex flex-col gap-1.5 border-t border-rule px-4 pb-4 pt-3.5 text-[14.5px]">
                <div className="flex flex-wrap justify-between gap-x-4 gap-y-1 font-semibold">
                    <span id="fig-title">{project.name}</span>
                    <span className="font-mono text-[12.5px] font-normal text-muted">{project.tech.join(" · ")}</span>
                </div>
                <p className="m-0 max-w-[38rem] text-muted">
                    {project.description} <a className="link text-ink" href={project.url}>Source on GitHub</a>
                </p>
            </figcaption>
        </figure>
    );
}
