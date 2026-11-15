import { builtData } from "../data";
import Reveal from "@/app/components/common/Reveal";
import PointerGlow from "@/app/components/motion/PointerGlow";
import VoiceDemo from "./demos/VoiceDemo";
import TerminalDemo from "./demos/TerminalDemo";
import ShopPreview from "./demos/ShopPreview";
import LauncherDemo from "./demos/LauncherDemo";

const VISUALS = { voice: VoiceDemo, launcher: LauncherDemo, shop: ShopPreview, terminal: TerminalDemo };

export default function Built() {
    return (
        <section className="py-28 snap-start" id="built">
            <div className="container mx-auto px-4">
                <Reveal className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-semibold tracking-tight mb-5">
                        <span className="text-white">
                            Built by Me
                        </span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Personal projects you can download, run and read the code of
                    </p>
                </Reveal>

                <div className="max-w-6xl mx-auto space-y-10">
                    {builtData.map((project, index) => {
                        const Visual = VISUALS[project.visual];
                        return (
                            <Reveal key={project.id}>
                                <PointerGlow
                                    as="article"
                                    tilt={3}
                                    className="tilt-card rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-6 lg:p-12 grid lg:grid-cols-2 gap-10 lg:gap-14 items-center"
                                >
                                    <div className={`min-w-0 ${index % 2 ? "lg:order-2" : ""}`}>
                                        <p className="font-mono text-xs uppercase tracking-wider text-accent2 mb-2">{project.kind}</p>
                                        <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">{project.name}</h3>
                                        <p className="text-gray-200 text-lg leading-relaxed mb-6">{project.line}</p>

                                        <ul className="space-y-3 mb-6">
                                            {project.points.map((point) => (
                                                <li key={point} className="flex items-start gap-3 text-gray-300">
                                                    <svg className="w-5 h-5 mt-0.5 flex-shrink-0 text-accent2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/>
                                                    </svg>
                                                    <span className="leading-relaxed">{point}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        <ul className="flex flex-wrap gap-2 mb-8">
                                            {project.techStack.map((tech) => (
                                                <li key={tech} className="px-3 py-1 rounded-full text-xs font-medium border bg-accent2/10 text-primary border-accent2/20">
                                                    {tech}
                                                </li>
                                            ))}
                                        </ul>

                                        <div className="flex flex-wrap gap-3">
                                            {project.links.map((link) => (
                                                <a
                                                    key={link.label}
                                                    href={link.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={
                                                        link.primary
                                                            ? "inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold hover:bg-gray-200"
                                                            : "inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gray-600 text-gray-200 hover:border-accent2 hover:text-accent2"
                                                    }
                                                >
                                                    {link.label}
                                                    <span aria-hidden="true">↗</span>
                                                </a>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="min-w-0">
                                        <Visual />
                                        <p className="mt-3 text-center text-xs text-gray-500">{project.caption}</p>
                                    </div>
                                </PointerGlow>
                            </Reveal>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
