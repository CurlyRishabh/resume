import Link from "next/link";
import XRayButton from "./XRayButton";
import { resume } from "../data/resume";

const Footer = () => {
  return (
    <footer className="mt-20 flex flex-wrap justify-between gap-x-6 gap-y-3 border-t border-rule pt-3.5 font-mono text-xs text-muted">
      <span>{resume.name.full} · Updated {resume.updated}</span>
      <span className="flex flex-wrap gap-x-4 gap-y-2">
        <Link className="link" href="/work/browser-agents">Case study</Link>
        <Link className="link" href="/status">Status</Link>
        <XRayButton />
      </span>
    </footer>
  );
};

export default Footer;
