import { resume } from "../data/resume";

export default function Education() {
    return (
        <section className="mt-20" aria-labelledby="education" data-xray="server" data-xray-label="Education · server component">
            <h2 id="education" className="section-label">Education</h2>
            {resume.education.map((edu) => (
                <div key={edu.institution} className="grid grid-cols-[1fr_auto] items-baseline gap-x-4 gap-y-0.5">
                    <strong className="font-semibold">{edu.degree}, {edu.field}</strong>
                    <span className="font-mono text-[12.5px] tabular-nums text-muted">
                        {edu.start_year} – {edu.end_year}
                    </span>
                    <span className="col-span-2 text-muted">{edu.institution}, {edu.location}</span>
                </div>
            ))}
        </section>
    );
}
