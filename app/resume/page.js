import Link from "next/link";
import { resume } from "../data/resume";
import PrintButton from "./PrintButton";

export const metadata = {
    title: "Resume - Rishabh Singh Bisht",
    description: "One-page resume for Rishabh Singh Bisht, generated from the same data as the website.",
};

const strip = (url) => url.replace(/^https?:\/\//, "");

function Role({ title, org, dates, items }) {
    return (
        <div className="resume-role">
            <div className="flex items-baseline justify-between gap-4">
                <h3 className="m-0 text-[11pt] font-semibold">{org}</h3>
                <span className="font-mono text-[8.5pt] text-muted">{dates}</span>
            </div>
            {title && <p className="m-0 text-[9.5pt] text-muted">{title}</p>}
            <ul className="m-0 mt-1 list-disc pl-4">
                {items.map((h) => (
                    <li key={h.text} className="text-pretty">
                        {/\d/.test(h.metric) && <strong className="font-semibold">{h.metric} {h.label}. </strong>}
                        {h.text}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default function ResumePage() {
    const { name, headline, contact, summary, experience, skills, education } = resume;

    return (
        <div data-xray="server" data-xray-label="Resume · server component, print stylesheet">
            <div className="resume-toolbar flex flex-wrap items-center justify-between gap-3 pb-6 pt-14 sm:pt-20">
                <Link href="/" className="link font-mono text-[12.5px] text-muted">← Rishabh Singh Bisht</Link>
                <PrintButton />
            </div>

            <article className="resume-sheet">
                <header className="flex flex-col gap-1 border-b border-rule pb-3">
                    <h1 className="m-0 text-[20pt] font-semibold leading-tight tracking-[-0.02em]">{name.full}</h1>
                    <p className="m-0 text-[10.5pt]">{headline}</p>
                    <p className="m-0 flex flex-wrap gap-x-3 font-mono text-[8.5pt] text-muted">
                        <span>{contact.location}</span>
                        <a href={`mailto:${contact.email}`}>{contact.email}</a>
                        <a href={contact.linkedin}>{strip(contact.linkedin)}</a>
                        <a href={contact.github}>{strip(contact.github)}</a>
                    </p>
                </header>

                <p className="m-0 mt-3 text-pretty">{summary}</p>

                <section className="mt-4">
                    <h2 className="resume-h2">Experience</h2>
                    <div className="flex flex-col gap-3">
                        {experience.map((job) => (
                            <div key={job.company} className="flex flex-col gap-2">
                                {job.highlights && (
                                    <Role
                                        org={job.company}
                                        title={`${job.title}${job.note ? ` · ${job.note}` : ""}`}
                                        dates={`${job.start_date} – ${job.end_date}`}
                                        items={job.highlights}
                                    />
                                )}
                                {job.clients && (
                                    <>
                                        <div className="flex items-baseline justify-between gap-4">
                                            <h3 className="m-0 text-[11pt] font-semibold">{job.company}</h3>
                                            <span className="font-mono text-[8.5pt] text-muted">{job.start_date} – {job.end_date}</span>
                                        </div>
                                        <p className="-mt-2 mb-0 text-[9.5pt] text-muted">{job.title} · {job.note}</p>
                                        {job.clients.map((c) => (
                                            <Role key={c.client} org={`Client: ${c.client}`} dates={`${c.start_date} – ${c.end_date}`} items={c.highlights} />
                                        ))}
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mt-4">
                    <h2 className="resume-h2">Skills</h2>
                    <dl className="m-0 grid grid-cols-[8.5rem_1fr] gap-x-3 gap-y-0.5">
                        {Object.entries(skills).map(([group, items]) => (
                            <div key={group} className="contents">
                                <dt className="font-medium">{group}</dt>
                                <dd className="m-0">{items.join(", ")}</dd>
                            </div>
                        ))}
                    </dl>
                </section>

                <section className="mt-4">
                    <h2 className="resume-h2">Education</h2>
                    {education.map((edu) => (
                        <div key={edu.institution} className="flex items-baseline justify-between gap-4">
                            <span><strong className="font-semibold">{edu.degree}, {edu.field}</strong> · {edu.institution}, {edu.location}</span>
                            <span className="font-mono text-[8.5pt] text-muted">{edu.start_year} – {edu.end_year}</span>
                        </div>
                    ))}
                </section>
            </article>
        </div>
    );
}
