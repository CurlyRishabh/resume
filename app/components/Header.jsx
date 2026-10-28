import Link from "next/link";
import CopyEmailButton from "./CopyEmailButton";
import { resume } from "../data/resume";

export default function Header() {
    const current = resume.experience.find((job) => job.current);

    return (
        <header className="flex flex-col gap-5 pt-14 sm:pt-20" data-xray="server" data-xray-label="Header · server component">
            <div className="rise flex items-center gap-2 font-mono text-[12.5px] font-medium leading-none text-muted" style={{ "--i": 0 }}>
                <span className="h-1.5 w-1.5 rounded-full bg-ok" aria-hidden="true" />
                {current ? `SDE at ${current.company} · ` : ""}{resume.contact.city}
            </div>
            <h1 className="m-0 text-balance text-[clamp(2.3rem,7vw,3.4rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
                {resume.name.full}
            </h1>
            <p className="m-0 max-w-[36rem] text-pretty text-lg leading-[1.55]">
                {resume.tagline}{" "}
                <span className="text-muted">
                    {resume.total_experience_years} years, mostly {resume.primary_languages}.
                </span>
            </p>
            <div className="rise flex flex-wrap items-center gap-x-5 gap-y-2 text-[14.5px]" style={{ "--i": 1 }}>
                <CopyEmailButton email={resume.contact.email} />
                <a className="link" href={resume.contact.github}>GitHub</a>
                <a className="link" href={resume.contact.linkedin}>LinkedIn</a>
                <Link className="link" href="/resume">Resume</Link>
            </div>
        </header>
    );
}
