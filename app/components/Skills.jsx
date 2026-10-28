import { Fragment } from "react";
import { resume } from "../data/resume";

export default function Skills() {
    return (
        <section className="mt-20" aria-labelledby="skills">
            <h2 id="skills" className="section-label">Skills</h2>
            <dl className="m-0 grid gap-x-6 gap-y-0.5 sm:grid-cols-[8.5rem_1fr] sm:gap-y-3.5">
                {Object.entries(resume.skills).map(([group, items], i) => (
                    <Fragment key={group}>
                        <dt className={`pt-px font-mono text-[12.5px] font-medium leading-[1.6] text-muted ${i > 0 ? "mt-3 sm:mt-0" : ""}`}>
                            {group}
                        </dt>
                        <dd className="m-0">{items.join(", ")}</dd>
                    </Fragment>
                ))}
            </dl>
        </section>
    );
}
