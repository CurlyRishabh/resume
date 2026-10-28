import CopyEmailButton from "./CopyEmailButton";
import { resume } from "../data/resume";

export default function Contact() {
    return (
        <section className="mt-20" aria-labelledby="contact">
            <h2 id="contact" className="section-label">Contact</h2>
            <div className="flex flex-col gap-4">
                <p className="m-0 text-lg">Email is the fastest way to reach me.</p>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5">
                    <span className="font-mono text-sm">{resume.contact.email}</span>
                    <CopyEmailButton email={resume.contact.email} label="Copy" />
                </div>
                <div className="flex flex-wrap gap-5">
                    <a className="link" href={resume.contact.github}>GitHub</a>
                    <a className="link" href={resume.contact.linkedin}>LinkedIn</a>
                </div>
            </div>
        </section>
    );
}
