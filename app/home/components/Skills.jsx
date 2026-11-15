import { skillsData } from "../data";

export default function Skills() {
    return (
        <section className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 snap-start" id="skills">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-primary via-accent2 to-accent bg-clip-text text-transparent">
                            Technical Skills
                        </span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        The tools I use in production, grouped the way I use them
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                    {skillsData.map((group) => (
                        <div
                            key={group.category}
                            className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-gray-700/50 hover:border-accent2/50 transition-all duration-500"
                        >
                            <h3 className="text-xl font-bold text-white">{group.category}</h3>
                            <div className="h-1 w-16 bg-gradient-to-r from-accent2 to-accent rounded-full mt-2 mb-5" aria-hidden="true"></div>
                            <ul className="flex flex-wrap gap-2">
                                {group.skills.map((skill) => (
                                    <li
                                        key={skill}
                                        className="px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-700/40 text-gray-100 border border-gray-600/40"
                                    >
                                        {skill}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
