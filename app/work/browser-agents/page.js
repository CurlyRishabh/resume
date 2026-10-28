import Link from "next/link";

export const metadata = {
    title: "Browser agents for portals with no API - Rishabh Singh Bisht",
    description: "How I built an LLM-driven browser automation platform: agents for navigation, deterministic code for payments, and a queue on Kubernetes that survives crashes and deploys.",
};

const numbers = [
    ["90%", "of eligible order volume automated"],
    ["80%", "accuracy across 8+ vendor portals"],
    ["10–20 min", "of analyst time saved per order"],
    ["1–3 days", "to onboard a vendor, down from 1–2 weeks"],
];

const constraints = [
    ["No APIs", "Each vendor exposes only a website, and the markup changes without notice."],
    ["Payments are not idempotent", "Submitting a payment form twice means paying twice. Portals offer no idempotency key to check against."],
    ["MFA on payment", "Some portals require a one-time code mid-payment."],
    ["Runs take minutes", "A run can take several minutes, so it cannot live inside an API request, and a deploy cannot be allowed to kill it."],
    ["Pod memory limits", "Workers run in Kubernetes pods with fixed memory and CPU limits."],
    ["Credentials", "Portal credentials must never end up in queue payloads or logs."],
];

const pipeline = [
    ["API pod", "accepts the order, strips credentials, enqueues"],
    ["Bull queue", "Redis-backed, decouples API from runs"],
    ["Worker pods", "Node cluster, HPA 1–3 pods"],
    ["LLM agent", "Stagehand: login, search, extract"],
    ["Playwright", "deterministic payment + MFA"],
];

const decisions = [
    {
        title: "LLM agents navigate. Deterministic code pays.",
        body: "Agents handle the part that changes most: finding the login form, the search box, the right property, the right document. Payment and MFA run as fixed Playwright scripts, because that is where a wrong guess costs money and where every action has to be auditable.",
        rejected: "All-agent runs (non-deterministic next to money) and all-scripted runs (break on every markup change).",
    },
    {
        title: "Runs live on a queue, not in the API",
        body: "Multi-minute agent workflows moved off the API pods onto a Bull/Redis queue consumed by a Node cluster on Kubernetes that autoscales from 1 to 3 pods. The API stays fast regardless of how many runs are in flight.",
        rejected: "Running workflows inside the request, which ties up API pods and hits timeouts.",
    },
    {
        title: "Zero retries on payment runs",
        body: "If a payment run fails partway, its outcome is unknown: the portal may or may not have accepted the payment. Those runs are never retried automatically. They go to an analyst.",
        rejected: "Retry after checking the portal for an existing payment. Portals do not expose a reliable way to check, so the check itself can be wrong.",
    },
    {
        title: "Deploys drain instead of killing",
        body: "On SIGTERM a worker stops taking new jobs and finishes the one it has, with a 35-minute grace period sized to the longest run. A deploy never cuts a run in half.",
    },
    {
        title: "Portals are configuration, not code",
        body: "Portal integrations became declarative, database-driven configs plus connection factories, done alongside a Stagehand v2 to v3 migration. Adding or fixing a vendor no longer needs a deployment, which took onboarding from 1–2 weeks to 1–3 days.",
    },
];

const failures = [
    ["Portal changes its markup", "Agent steps re-resolve elements. Scripted payment steps fail before submitting anything. A config update fixes them without a deploy."],
    ["Pod dies mid-navigation", "Navigation is read-only, so the run can safely start again."],
    ["Pod dies mid-payment", "Outcome unknown, so no retry. The order is flagged for an analyst."],
    ["Deploy during a run", "The worker drains for up to 35 minutes before it exits."],
    ["Out-of-memory crashes", "Cluster forks were sized from the host's CPU cores, not the pod's limit, so each pod forked too many workers. Fixed with CPU-aware process sizing, a 640 MB V8 heap cap, and matching requests and limits so HPA scaling stays stable."],
    ["Credentials in job data", "Stripped from payloads before they reach the queue."],
];

const differently = [
    "Track accuracy per portal from the first week, not in aggregate. One noisy portal can hide inside a healthy overall number.",
    "Build the config layer before the third integration, not after the eighth. The onboarding speed-up came late.",
    "Size worker processes from the cgroup CPU quota from day one. The OOM incident came from a default that assumes a whole machine.",
];

function Section({ id, title, children }) {
    return (
        <section className="mt-16" aria-labelledby={id}>
            <h2 id={id} className="section-label">{title}</h2>
            {children}
        </section>
    );
}

export default function BrowserAgentsCaseStudy() {
    return (
        <article>
            <header className="flex flex-col gap-4 pt-14 sm:pt-20">
                <Link href="/" className="link w-fit font-mono text-[12.5px] text-muted">← Rishabh Singh Bisht</Link>
                <p className="m-0 font-mono text-[12.5px] text-muted">Case study · RealPage · 2025 – now</p>
                <h1 className="m-0 text-balance text-[clamp(2rem,6vw,2.9rem)] font-semibold leading-[1.05] tracking-[-0.035em]">
                    Browser agents for portals with no API
                </h1>
                <p className="m-0 max-w-[36rem] text-pretty text-lg leading-[1.55]">
                    Analysts used to log into vendor portals by hand to look up a property, pull its documents and pay its fees.
                    I architected and own the platform that does this with LLM agents, without letting an agent anywhere near the payment button.
                </p>
            </header>

            <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 border-y border-rule py-5 sm:grid-cols-4">
                {numbers.map(([value, label]) => (
                    <div key={label} className="flex flex-col gap-1">
                        <span className="font-mono text-[1.3rem] font-medium leading-none tracking-[-0.02em] tabular-nums">{value}</span>
                        <span className="text-xs leading-[1.35] text-muted">{label}</span>
                    </div>
                ))}
            </div>

            <Section id="constraints" title="Constraints">
                <dl className="m-0 grid gap-x-6 gap-y-0.5 sm:grid-cols-[11rem_1fr] sm:gap-y-3.5">
                    {constraints.map(([term, detail], i) => (
                        <div key={term} className="contents">
                            <dt className={`font-medium ${i > 0 ? "mt-3 sm:mt-0" : ""}`}>{term}</dt>
                            <dd className="m-0 text-muted">{detail}</dd>
                        </div>
                    ))}
                </dl>
            </Section>

            <Section id="design" title="Design">
                <ol className="m-0 grid list-none gap-2 p-0 sm:grid-cols-5" aria-label="Request path">
                    {pipeline.map(([name, detail], i) => (
                        <li
                            key={name}
                            className={`relative flex flex-col gap-1 rounded-lg border p-3 ${i >= 4 ? "border-accent" : "border-rule"} bg-surface`}
                        >
                            <span className="font-mono text-[12.5px] font-medium">{name}</span>
                            <span className="text-xs leading-[1.4] text-muted">{detail}</span>
                        </li>
                    ))}
                </ol>
                <p className="mb-0 mt-3 font-mono text-xs text-muted">
                    The handoff sits between the agent and Playwright: nothing to the right of it is decided by a model.
                </p>

                <div className="mt-10 flex flex-col gap-8">
                    {decisions.map((d) => (
                        <div key={d.title} className="flex flex-col gap-2">
                            <h3 className="m-0 text-[1.0625rem] font-semibold tracking-[-0.01em]">{d.title}</h3>
                            <p className="m-0 max-w-[40rem] text-pretty">{d.body}</p>
                            {d.rejected && (
                                <p className="m-0 max-w-[40rem] text-pretty text-[14.5px] text-muted">
                                    <span className="font-mono text-xs uppercase tracking-[0.06em]">Rejected</span>&nbsp; {d.rejected}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </Section>

            <Section id="failures" title="Failure modes">
                <div className="flex flex-col divide-y divide-rule border-y border-rule">
                    {failures.map(([what, handling]) => (
                        <div key={what} className="grid gap-1 py-3.5 sm:grid-cols-[13rem_1fr] sm:gap-6">
                            <span className="font-medium">{what}</span>
                            <span className="text-pretty text-muted">{handling}</span>
                        </div>
                    ))}
                </div>
                <p className="mb-0 mt-4 text-[14.5px] text-muted">
                    The <Link href="/#sim-title" className="link text-ink">simulator on the home page</Link> models these failure modes. You can
                    kill pods mid-payment, deploy mid-run, or change the portal and watch how each one is contained.
                </p>
            </Section>

            <Section id="differently" title="What I'd do differently">
                <ul className="m-0 flex list-none flex-col gap-3 p-0">
                    {differently.map((item) => (
                        <li key={item} className="max-w-[40rem] text-pretty">{item}</li>
                    ))}
                </ul>
            </Section>

            <p className="mb-0 mt-16 text-[14.5px] text-muted">
                Stack: TypeScript, Node.js, Playwright, Stagehand, Bull, Redis, Kubernetes, Python, Django, Gemini, OpenAI.
                This page describes architecture only. No vendor names, internal code or customer data.
            </p>
        </article>
    );
}
