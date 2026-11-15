import { experienceData, educationData } from "../data";

function Highlights({ items }) {
    return (
        <ul className="space-y-3">
            {items.map((item) => (
                <li key={item} className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-accent2 rounded-full mt-2 flex-shrink-0" aria-hidden="true"></span>
                    <p className="text-gray-300 leading-relaxed">{item}</p>
                </li>
            ))}
        </ul>
    );
}

export default function Experience() {
    return (
        <section className="py-20 bg-gradient-to-br from-black via-gray-900 to-black snap-start" id="experience">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-primary via-accent2 to-accent bg-clip-text text-transparent">
                            Work Experience
                        </span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        2.5+ years building LLM agent platforms and the infrastructure that keeps them running
                    </p>
                </div>

                <div className="max-w-4xl mx-auto space-y-8">
                    {experienceData.map((experience) => (
                        <article
                            key={experience.company}
                            className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-gray-700/50 hover:border-accent2/50 transition-all duration-500"
                        >
                            {/* Company header */}
                            <div className="flex items-start gap-4 mb-5">
                                <div className="w-12 h-12 bg-gradient-to-br from-accent2 to-accent rounded-xl flex items-center justify-center flex-shrink-0" aria-hidden="true">
                                    <span className="text-white font-bold text-lg">
                                        {experience.company.charAt(0)}
                                    </span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                                        <h3 className="text-xl lg:text-2xl font-bold text-white">
                                            <a
                                                href={experience.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="hover:text-accent2 transition-colors"
                                            >
                                                {experience.company}
                                            </a>
                                        </h3>
                                        <span className="text-sm text-gray-400 whitespace-nowrap">{experience.period}</span>
                                    </div>
                                    <p className="text-accent font-semibold">
                                        {experience.title}
                                        {experience.location && <span className="text-gray-400 font-normal"> · {experience.location}</span>}
                                    </p>
                                    {experience.note && (
                                        <p className="text-sm text-gray-400 mt-1">{experience.note}</p>
                                    )}
                                </div>
                            </div>

                            {/* Tech */}
                            <div className="flex flex-wrap gap-2 mb-6">
                                {experience.tech.map((tech) => (
                                    <span
                                        key={tech}
                                        className="px-3 py-1 rounded-full text-xs font-medium border bg-accent2/10 text-primary border-accent2/20"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            {experience.highlights && <Highlights items={experience.highlights} />}

                            {experience.clients && (
                                <div className="space-y-6">
                                    {experience.clients.map((client) => (
                                        <div key={client.client} className="border-l-2 border-accent2/40 pl-5">
                                            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-3">
                                                <h4 className="text-lg font-semibold text-white">
                                                    <span className="text-gray-400 font-normal">Client: </span>
                                                    {client.client}
                                                </h4>
                                                <span className="text-sm text-gray-400 whitespace-nowrap">{client.period}</span>
                                            </div>
                                            <Highlights items={client.highlights} />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </article>
                    ))}

                    {/* Education */}
                    <article className="bg-gradient-to-r from-accent2/10 to-accent/10 rounded-2xl p-6 lg:p-8 border border-accent2/20">
                        <p className="text-sm uppercase tracking-wider text-accent2 font-semibold mb-2">Education</p>
                        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                            <h3 className="text-xl font-bold text-white">{educationData.degree}</h3>
                            <span className="text-sm text-gray-400 whitespace-nowrap">{educationData.period}</span>
                        </div>
                        <p className="text-gray-300 mt-1">{educationData.institution}</p>
                    </article>
                </div>
            </div>
        </section>
    );
}
