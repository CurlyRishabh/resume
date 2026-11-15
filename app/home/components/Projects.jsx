import { projectData } from "../data";

function Row({ label, children }) {
    return (
        <div>
            <dt className="text-xs uppercase tracking-wider text-accent2 font-semibold mb-1">{label}</dt>
            <dd className="text-gray-300 leading-relaxed">{children}</dd>
        </div>
    );
}

export default function Projects() {
    return (
        <section className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 snap-start" id="projects">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-primary via-accent2 to-accent bg-clip-text text-transparent">
                            What I&apos;ve Built
                        </span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Systems I designed and shipped at work: the problem, what I built, and what changed
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
                    {projectData.map((project, index) => (
                        <article
                            key={project.title}
                            className={`bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-gray-700/50 hover:border-accent2/50 transition-all duration-500 flex flex-col ${
                                index === 0 ? "lg:col-span-2" : ""
                            }`}
                        >
                            <p className="text-sm text-gray-400 mb-1">{project.context}</p>
                            <h3 className="text-xl lg:text-2xl font-bold text-white mb-5">{project.title}</h3>

                            <dl className={`gap-5 mb-6 grid ${index === 0 ? "lg:grid-cols-3" : ""}`}>
                                <Row label="Problem">{project.problem}</Row>
                                <Row label="What I built">{project.built}</Row>
                                <Row label="Result">
                                    <span className="text-white font-medium">{project.result}</span>
                                </Row>
                            </dl>

                            <ul className="flex flex-wrap gap-2 mt-auto">
                                {project.techStack.map((tech) => (
                                    <li
                                        key={tech}
                                        className="px-3 py-1 rounded-full text-xs font-medium border bg-accent2/10 text-primary border-accent2/20"
                                    >
                                        {tech}
                                    </li>
                                ))}
                            </ul>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
