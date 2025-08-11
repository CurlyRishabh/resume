import { skillsData } from "../data";

const categoryIcons = {
    languages: "💻",
    frontend: "🎨",
    backend: "⚙️",
    databases: "🗄️",
    devops_tools: "🚀",
    ai_ml: "🤖",
    automation: "🔄"
};

const categoryColors = {
    languages: "from-blue-500 to-purple-600",
    frontend: "from-pink-500 to-rose-600",
    backend: "from-green-500 to-emerald-600",
    databases: "from-yellow-500 to-orange-600",
    devops_tools: "from-indigo-500 to-blue-600",
    ai_ml: "from-purple-500 to-pink-600",
    automation: "from-teal-500 to-cyan-600"
};

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
                        A comprehensive toolkit of modern technologies and frameworks I use to build scalable, efficient solutions
                    </p>
                </div>

                <div className="grid gap-8 lg:gap-12">
                    {Object.entries(skillsData).map(([category, skills], categoryIndex) => (
                        <div
                            key={category}
                            className="group"
                            style={{ animationDelay: `${categoryIndex * 0.1}s` }}
                        >
                            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-gray-700/50 hover:border-accent2/50 transition-all duration-500 hover:shadow-2xl hover:shadow-accent2/10">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${categoryColors[category]} flex items-center justify-center text-2xl shadow-lg`}>
                                        {categoryIcons[category]}
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-white capitalize">
                                            {category.replace(/_/g, ' ')}
                                        </h3>
                                        <div className={`h-1 w-20 bg-gradient-to-r ${categoryColors[category]} rounded-full mt-1`}></div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                                    {skills.map((skill, skillIndex) => (
                                        <div
                                            key={skill.name}
                                            className="relative group/skill"
                                            style={{ animationDelay: `${(categoryIndex * 0.1) + (skillIndex * 0.05)}s` }}
                                        >
                                            <div className="bg-gray-700/30 hover:bg-gray-600/50 border border-gray-600/30 hover:border-accent2/50 rounded-xl p-4 transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-help">
                                                <div className="text-center">
                                                    <div className="w-8 h-8 mx-auto mb-2 bg-gradient-to-br from-accent2/20 to-accent/20 rounded-lg flex items-center justify-center">
                                                        <span className="text-accent2 text-sm font-bold">
                                                            {skill.name.charAt(0)}
                                                        </span>
                                                    </div>
                                                    <h4 className="text-white font-medium text-sm mb-1 leading-tight">
                                                        {skill.name}
                                                    </h4>
                                                </div>

                                                {/* Enhanced Tooltip */}
                                                <div className="absolute z-20 w-64 p-4 bg-gray-900/95 backdrop-blur-sm text-white text-sm rounded-xl border border-accent2/20 shadow-2xl
                                                    opacity-0 group-hover/skill:opacity-100 transition-all duration-300 pointer-events-none
                                                    bottom-full left-1/2 transform -translate-x-1/2 mb-3
                                                    before:content-[''] before:absolute before:top-full before:left-1/2
                                                    before:-translate-x-1/2 before:border-[8px] before:border-transparent
                                                    before:border-t-gray-900/95">
                                                    <div className="font-semibold text-accent2 mb-1">{skill.name}</div>
                                                    <div className="text-gray-300 leading-relaxed">{skill.description}</div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Skills Summary */}
                <div className="mt-16 text-center">
                    <div className="bg-gradient-to-r from-accent2/10 to-accent/10 rounded-2xl p-8 border border-accent2/20">
                        <h3 className="text-2xl font-bold text-white mb-4">
                            Always Learning & Growing
                        </h3>
                        <p className="text-gray-300 max-w-3xl mx-auto leading-relaxed">
                            Technology evolves rapidly, and so do I. I'm constantly exploring new frameworks, tools, and methodologies
                            to stay at the forefront of software development and deliver cutting-edge solutions.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 mt-6">
                            <div className="bg-accent2/20 text-accent2 px-4 py-2 rounded-full text-sm font-medium">
                                {Object.values(skillsData).flat().length}+ Technologies
                            </div>
                            <div className="bg-accent/20 text-accent px-4 py-2 rounded-full text-sm font-medium">
                                1+ Years Experience
                            </div>
                            <div className="bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium">
                                Full Stack Development
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
