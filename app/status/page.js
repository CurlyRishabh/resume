import Link from "next/link";
import budget from "@/budget.json";
import lighthouse from "@/lighthouserc.json";
import { quantile } from "@/lib/vitals/ddsketch";
import { METRICS, getStore, lastDays } from "@/lib/vitals/store";

export const dynamic = "force-dynamic";

export const metadata = {
    title: "Status - Rishabh Singh Bisht",
    description: "How fast this site is for real visitors, measured privately, and the performance budget it is held to.",
};

const WINDOW_DAYS = 7;

// Google's "good" thresholds for each metric, judged at the 75th percentile.
const GOOD = { LCP: 2500, INP: 200, CLS: 0.1, FCP: 1800, TTFB: 800 };
const NAMES = {
    LCP: "Largest Contentful Paint",
    INP: "Interaction to Next Paint",
    CLS: "Cumulative Layout Shift",
    FCP: "First Contentful Paint",
    TTFB: "Time to First Byte",
};

function format(metric, value) {
    if (value === null) return "–";
    if (metric === "CLS") return value.toFixed(3);
    return value >= 1000 ? `${(value / 1000).toFixed(2)} s` : `${Math.round(value)} ms`;
}

async function readVitals() {
    const store = getStore();
    const days = lastDays(WINDOW_DAYS);
    try {
        const rows = await Promise.all(
            METRICS.map(async (metric) => {
                const sketch = await store.read(metric, days);
                return {
                    metric,
                    count: sketch.count,
                    p50: quantile(sketch, 0.5),
                    p75: quantile(sketch, 0.75),
                    p95: quantile(sketch, 0.95),
                };
            }),
        );
        return { kind: store.kind, rows, error: false };
    } catch {
        return { kind: store.kind, rows: [], error: true };
    }
}

function Section({ id, title, children }) {
    return (
        <section className="mt-16" aria-labelledby={id}>
            <h2 id={id} className="section-label">{title}</h2>
            {children}
        </section>
    );
}

export default async function StatusPage() {
    const { kind, rows, error } = await readVitals();
    const samples = rows.reduce((max, r) => Math.max(max, r.count), 0);
    const assertions = lighthouse.ci.assert.assertions;

    return (
        <article data-xray="server" data-xray-label="Status · server component, rendered per request">
            <header className="flex flex-col gap-4 pt-14 sm:pt-20">
                <Link href="/" className="link w-fit font-mono text-[12.5px] text-muted">← Rishabh Singh Bisht</Link>
                <h1 className="m-0 text-[clamp(2rem,6vw,2.9rem)] font-semibold leading-[1.05] tracking-[-0.035em]">Status</h1>
                <p className="m-0 max-w-[36rem] text-pretty text-lg leading-[1.55]">
                    How fast this site is for the people who actually visit it, over the last {WINDOW_DAYS} days, and the budget every change is held to.
                </p>
            </header>

            <Section id="field" title="Real visitors">
                {error ? (
                    <p className="m-0 text-muted">The metrics store is unreachable right now. The site itself is unaffected.</p>
                ) : samples === 0 ? (
                    <p className="m-0 text-muted">No data yet. Numbers appear here once visitors have loaded a few pages.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[520px] border-collapse font-mono text-[12.5px] tabular-nums">
                            <thead className="text-left text-muted">
                                <tr className="border-b border-rule">
                                    <th className="py-2 pr-4 font-medium">Metric</th>
                                    <th className="py-2 pr-4 text-right font-medium">p50</th>
                                    <th className="py-2 pr-4 text-right font-medium">p75</th>
                                    <th className="py-2 pr-4 text-right font-medium">p95</th>
                                    <th className="py-2 pr-4 text-right font-medium">Samples</th>
                                    <th className="py-2 text-right font-medium">p75 vs good</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((r) => {
                                    const good = r.p75 !== null && r.p75 <= GOOD[r.metric];
                                    return (
                                        <tr key={r.metric} className="border-b border-rule">
                                            <td className="py-2.5 pr-4" title={NAMES[r.metric]}>{r.metric}</td>
                                            <td className="py-2.5 pr-4 text-right">{format(r.metric, r.p50)}</td>
                                            <td className="py-2.5 pr-4 text-right text-ink">{format(r.metric, r.p75)}</td>
                                            <td className="py-2.5 pr-4 text-right">{format(r.metric, r.p95)}</td>
                                            <td className="py-2.5 pr-4 text-right text-muted">{r.count}</td>
                                            <td className={`py-2.5 text-right ${r.count === 0 ? "text-muted" : good ? "text-ok" : "text-fail"}`}>
                                                {r.count === 0 ? "–" : `${good ? "good" : "over"} (≤ ${format(r.metric, GOOD[r.metric])})`}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
                <p className="mb-0 mt-4 max-w-[40rem] text-pretty text-[14.5px] text-muted">
                    Each page view sends one number per metric. The server keeps only a{" "}
                    <a className="link text-ink" href="https://arxiv.org/abs/1908.10693">DDSketch</a> per metric per day: a set of
                    logarithmic bucket counters, accurate to 1%, incremented atomically. No raw events, cookies, IP addresses or URLs are
                    stored, and browsers sending Do Not Track or Global Privacy Control are not counted.
                    Store: {kind === "upstash" ? "Upstash Redis" : "in-memory (local development; resets on restart)"}.
                </p>
            </Section>

            <Section id="budget" title="Budget">
                <div className="grid gap-8 sm:grid-cols-2">
                    <div>
                        <h3 className="m-0 mb-3 text-[15px] font-medium">JavaScript per route</h3>
                        <dl className="m-0 grid grid-cols-[1fr_auto] gap-x-4 gap-y-1.5 font-mono text-[12.5px] tabular-nums">
                            {Object.entries(budget.routes).map(([route, kb]) => (
                                <div key={route} className="contents">
                                    <dt className="text-muted">{route.replace(/\/page$/, "") || "/"}</dt>
                                    <dd className="m-0 text-right">{kb} KB gzip</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                    <div>
                        <h3 className="m-0 mb-3 text-[15px] font-medium">Lighthouse, every pull request</h3>
                        <dl className="m-0 grid grid-cols-[1fr_auto] gap-x-4 gap-y-1.5 font-mono text-[12.5px] tabular-nums">
                            <dt className="text-muted">Performance</dt>
                            <dd className="m-0 text-right">≥ {assertions["categories:performance"][1].minScore * 100}</dd>
                            <dt className="text-muted">Accessibility</dt>
                            <dd className="m-0 text-right">≥ {assertions["categories:accessibility"][1].minScore * 100}</dd>
                            <dt className="text-muted">LCP</dt>
                            <dd className="m-0 text-right">≤ {assertions["largest-contentful-paint"][1].maxNumericValue / 1000} s</dd>
                            <dt className="text-muted">CLS</dt>
                            <dd className="m-0 text-right">≤ {assertions["cumulative-layout-shift"][1].maxNumericValue}</dd>
                            <dt className="text-muted">Total blocking time</dt>
                            <dd className="m-0 text-right">≤ {assertions["total-blocking-time"][1].maxNumericValue} ms</dd>
                        </dl>
                    </div>
                </div>
                <p className="mb-0 mt-4 text-[14.5px] text-muted">
                    A pull request that breaks any of these fails CI and cannot merge.
                </p>
            </Section>
        </article>
    );
}
