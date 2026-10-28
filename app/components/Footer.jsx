import { resume } from "../data/resume";

const Footer = () => {
  return (
    <footer className="mt-20 flex flex-wrap justify-between gap-3 border-t border-rule pt-3.5 font-mono text-xs text-muted">
      <span>{resume.name.full}</span>
      <span>Updated {resume.updated}</span>
    </footer>
  );
};

export default Footer;
