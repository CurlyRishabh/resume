import Link from "next/link";
import { resume } from "../data/resume";

function Highlights({ items }) {
    return (
        <ul className="m-0 flex list-none flex-col gap-5 p-0">
            {items.map((item) => (
                <li key={item.text} className="grid gap-1 sm:grid-cols-[8.5rem_1fr] sm:gap-6">
                    <div className="flex items-baseline gap-2.5 font-mono text-lg font-medium leading-[1.15] tracking-[-0.02em] tabular-nums sm:block sm:text-[1.3rem]">
                        {item.metric}
                        <small className="block font-sans text-xs font-normal leading-[1.35] tracking-normal text-muted sm:mt-1">
                            {item.label}
                        </small>
                    </div>
                    <p className="m-0 text-pretty">{item.text}</p>
                </li>
            ))}
        </ul>
    );
}

function Dates({ start, end, className = "" }) {
    return (
        <span className={`font-mono text-[12.5px] tabular-nums text-muted ${className}`}>
            {start} – {end === "Present" ? "now" : end}
        </span>
    );
}

export default function Experience() {
    return (
        <section className="mt-20" aria-labelledby="experience">
            <h2 id="experience" className="section-label">Experience</h2>

            <div className="flex flex-col gap-14">
                {resume.experience.map((job) => (
                    <article key={job.company}>
                        <div className="mb-[22px] grid items-baseline gap-x-4 gap-y-0.5 sm:grid-cols-[1fr_auto]">
                            <h3 className="m-0 text-lg font-semibold tracking-[-0.01em]">{job.company}</h3>
                            <Dates start={job.start_date} end={job.end_date} className="sm:text-right" />
                            <span className="text-muted sm:col-span-2">
                                {job.title}{job.note ? ` · ${job.note}` : ""}
                            </span>
                        </div>

                        {job.highlights && <Highlights items={job.highlights} />}
                        {job.case_study && (
                            <Link className="link mt-5 inline-block text-[14.5px]" href={job.case_study.href}>
                                {job.case_study.label}
                            </Link>
                        )}

                        {job.clients?.map((client) => (
                            <div key={client.client}>
                                <div className="mb-4 mt-[30px] flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                                    <h4 className="m-0 text-[15px] font-medium">{client.client}</h4>
                                    <Dates start={client.start_date} end={client.end_date} />
                                </div>
                                <Highlights items={client.highlights} />
                            </div>
                        ))}

                        <p className="mb-0 mt-[22px] font-mono text-[12.5px] leading-[1.7] text-muted">
                            {job.tech.join(" · ")}
                        </p>
                    </article>
                ))}
            </div>
        </section>
    );
}
