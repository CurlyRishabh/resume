"use client"
import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useReportWebVitals } from "next/web-vitals";
import budget from "@/budget.json";

const VITALS = ["TTFB", "FCP", "LCP", "CLS", "INP"];

export function toggleXRay() {
    window.dispatchEvent(new Event("xray-toggle"));
}

function isTyping(target) {
    return target instanceof HTMLElement && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName));
}

function formatVital(name, value) {
    if (value === undefined) return "pending";
    if (name === "CLS") return value.toFixed(3);
    return value >= 1000 ? `${(value / 1000).toFixed(2)} s` : `${Math.round(value)} ms`;
}

/** Measures what this page actually shipped, from the browser's own resource timing. */
function measure() {
    const scripts = performance
        .getEntriesByType("resource")
        .filter((e) => e.initiatorType === "script" || (/\.js(\?|$)/.test(e.name) && e.initiatorType !== "link"));
    const bytes = scripts.reduce((sum, e) => sum + (e.transferSize || e.encodedBodySize || 0), 0);
    return {
        jsKb: bytes / 1024,
        jsFiles: scripts.length,
        server: document.querySelectorAll('[data-xray="server"]').length,
        client: document.querySelectorAll('[data-xray="client"]').length,
        workers: window.__activeWorkers ?? 0,
    };
}

export default function XRay() {
    const [on, setOn] = useState(false);
    const [stats, setStats] = useState(null);
    const [vitals, setVitals] = useState({});
    const pathname = usePathname();
    const route = pathname === "/" ? "/page" : `${pathname}/page`;
    const limit = budget.routes[route];

    // Must be stable: useReportWebVitals re-subscribes whenever the callback identity changes.
    const onVital = useCallback((metric) => setVitals((v) => ({ ...v, [metric.name]: metric.value })), []);
    useReportWebVitals(onVital);

    useEffect(() => {
        const toggle = () => setOn((v) => !v);
        const onKey = (e) => {
            if (e.key === "Escape") return setOn(false);
            if (e.key.toLowerCase() !== "x" || e.metaKey || e.ctrlKey || e.altKey || isTyping(e.target)) return;
            toggle();
        };
        window.addEventListener("keydown", onKey);
        window.addEventListener("xray-toggle", toggle);
        return () => {
            window.removeEventListener("keydown", onKey);
            window.removeEventListener("xray-toggle", toggle);
        };
    }, []);

    useEffect(() => {
        if (on) document.documentElement.dataset.xray = "on";
        else delete document.documentElement.dataset.xray;
        if (!on) return;
        setStats(measure());
        const id = setInterval(() => setStats(measure()), 1000);
        return () => clearInterval(id);
    }, [on, pathname]);

    return (
        <aside className={`xray-panel ${on ? "show" : ""}`} aria-hidden={!on} aria-label="X-ray: how this page is built">
            <div className="flex items-center justify-between gap-3 border-b border-rule pb-2">
                <span className="font-medium text-ink">X-ray · {pathname}</span>
                <button type="button" className="text-muted" onClick={() => setOn(false)} tabIndex={on ? 0 : -1} aria-label="Close X-ray">Close</button>
            </div>
            {stats && (
                <dl className="m-0 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 pt-2">
                    <dt>JS loaded</dt>
                    <dd className="m-0 text-right text-ink">{stats.jsKb.toFixed(1)} KB · {stats.jsFiles} files</dd>
                    <dt>JS budget</dt>
                    <dd className="m-0 text-right text-ink">{limit ? `${limit} KB gzip, CI-enforced` : "none"}</dd>
                    <dt>Server sections</dt>
                    <dd className="m-0 text-right text-ink">{stats.server} · no client JS</dd>
                    <dt>Client islands</dt>
                    <dd className="m-0 text-right text-ink">{stats.client}</dd>
                    <dt>Web Workers</dt>
                    <dd className="m-0 text-right text-ink">{stats.workers} running</dd>
                    {VITALS.map((name) => (
                        <div key={name} className="contents">
                            <dt>{name}</dt>
                            <dd className="m-0 text-right text-ink">{formatVital(name, vitals[name])}</dd>
                        </div>
                    ))}
                </dl>
            )}
            <p className="mb-0 mt-2 border-t border-rule pt-2 leading-[1.5]">
                Measured live in your browser. Dashed outlines are server-rendered; solid ones hydrate on the client.
            </p>
        </aside>
    );
}
