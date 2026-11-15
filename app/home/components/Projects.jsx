import { projectData } from "../data";
import Reveal from "@/app/components/common/Reveal";

/**
 * One row of the flow picture. "before" steps are grey and dashed: work a
 * person did. "after" steps are in the accent colour: work the software
 * does. The last "after" step is the result and is filled in.
 * `offset` continues the stagger from the row above.
 */
function FlowRow({ kind, steps, offset = 0 }) {
    const isAfter = kind === "after";
    return (
        <div>
            <p className={`text-xs uppercase tracking-wider font-semibold mb-2 ${isAfter ? "text-accent2" : "text-gray-500"}`}>
                {isAfter ? "After" : "Before"}
            </p>
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-2">
                {steps.map((step, index) => {
                    const isResult = isAfter && index === steps.length - 1;
                    let look = "border border-dashed border-gray-600 text-gray-400";
                    if (isAfter) look = "border border-accent2/50 bg-accent2/10 text-gray-100";
                    if (isResult) look = "bg-gradient-to-r from-accent2 to-accent text-white font-semibold shadow-lg shadow-accent2/20";
                    return (
                        <li key={step} className="flex items-center gap-2">
                            {index > 0 && (
                                <span
                                    className={`flow-arrow ${isAfter ? "text-accent2" : "text-gray-600"}`}
                                    style={{ "--i": offset + index }}
                                    aria-hidden="true"
                                >
                                    →
                                </span>
                            )}
                            <span
                                className={`flow-step rounded-lg px-3 py-1.5 text-sm leading-snug ${look}`}
                                style={{ "--i": offset + index }}
                            >
                                {step}
                            </span>
                        </li>
                    );
                })}
            </ol>
        </div>
    );
}

/** Two bars comparing a real "before" duration with the "after" duration. */
function DurationBars({ bars }) {
    return (
        <div className="space-y-3">
            {[bars.before, bars.after].map((bar, index) => (
                <div key={bar.label} className="flex items-center gap-3 text-sm">
                    <span className={`w-14 flex-shrink-0 text-xs uppercase tracking-wider font-semibold ${index ? "text-accent2" : "text-gray-500"}`}>
                        {bar.label}
                    </span>
                    <div className="flex-1 h-3 rounded-full bg-gray-800 overflow-hidden">
                        <div
                            className={`bar-fill h-full rounded-full ${index ? "bg-gradient-to-r from-accent2 to-accent" : "bg-gray-600"}`}
                            style={{ width: `${bar.width}%`, "--i": index }}
                        ></div>
                    </div>
                    <span className={`w-20 flex-shrink-0 text-right ${index ? "text-white font-semibold" : "text-gray-400"}`}>
                        {bar.value}
                    </span>
                </div>
            ))}
        </div>
    );
}

export default function Projects() {
    return (
        <section className="py-20 snap-start" id="projects">
            <div className="container mx-auto px-4">
                <Reveal className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="text-gray-500">Before</span>
                        <span className="text-accent2" aria-hidden="true"> → </span>
                        <span className="sr-only"> and </span>
                        <span className="bg-gradient-to-r from-accent2 to-accent bg-clip-text text-transparent">After</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Work that people used to do by hand, and what the software I built does now
                    </p>
                </Reveal>

                <div className="grid lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
                    {projectData.map((project) => (
                        <Reveal
                            as="article"
                            key={project.title}
                            className="bg-gray-900/70 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-gray-700/60 hover:border-accent2/50 flex flex-col"
                        >
                            <p className="text-sm text-gray-400 mb-1">{project.context}</p>
                            <h3 className="text-xl lg:text-2xl font-bold text-white mb-3">{project.title}</h3>
                            <p className="text-gray-200 text-lg leading-relaxed mb-6 max-w-3xl">{project.plain}</p>

                            <div className="space-y-5 mb-6">
                                <FlowRow kind="before" steps={project.before} />
                                <FlowRow kind="after" steps={project.after} offset={project.before.length} />
                                {project.bars && <DurationBars bars={project.bars} />}
                            </div>

                            <p className="mt-auto pt-4 border-t border-gray-700/60 text-sm text-gray-400 leading-relaxed">
                                <span className="font-mono text-xs uppercase tracking-wider text-accent2">Under the hood </span>
                                {project.tech}
                            </p>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
