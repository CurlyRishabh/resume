import { projectData } from "../data";

const techStackColors = {
    "React.js": "bg-blue-500/20 text-blue-300 border-blue-500/30",
    "Next.js": "bg-gray-500/20 text-gray-300 border-gray-500/30",
    "Node.js": "bg-green-500/20 text-green-300 border-green-500/30",
    "Express.js": "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
    "MongoDB": "bg-green-600/20 text-green-400 border-green-600/30",
    "PostgreSQL": "bg-blue-600/20 text-blue-400 border-blue-600/30",
    "Django": "bg-green-700/20 text-green-400 border-green-700/30",
    "Flask": "bg-gray-600/20 text-gray-300 border-gray-600/30",
    "Python": "bg-yellow-600/20 text-yellow-400 border-yellow-600/30",
    "JavaScript": "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
    "TypeScript": "bg-blue-700/20 text-blue-400 border-blue-700/30",
    "Docker": "bg-blue-500/20 text-blue-300 border-blue-500/30",
    "Redis": "bg-red-500/20 text-red-300 border-red-500/30",
    "JWT": "bg-purple-500/20 text-purple-300 border-purple-500/30",
    "Ollama": "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
    "Django ORM": "bg-green-700/20 text-green-400 border-green-700/30"
};

export default function Projects() {
    return (
        <section className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 snap-start" id="projects">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-primary via-accent2 to-accent bg-clip-text text-transparent">
                            Featured Projects
                        </span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        A showcase of my recent work, demonstrating expertise in full-stack development and AI integration
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
                    {projectData.map((project, index) => (
                        <div
                            key={index}
                            className="group bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-accent2/50 transition-all duration-500 hover:shadow-2xl hover:shadow-accent2/10 hover:scale-[1.02]"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            {/* Project Image/Icon */}
                            <div className="aspect-video bg-gradient-to-br from-accent2/20 via-accent/20 to-primary/20 relative overflow-hidden">
                                {project.image ? (
                                    <>
                                        {/* Actual Project Image */}
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-br from-black/30 to-transparent"></div>
                                    </>
                                ) : (
                                    <>
                                        {/* Placeholder with initials */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent"></div>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-20 h-20 bg-gradient-to-br from-accent2 to-accent rounded-2xl flex items-center justify-center shadow-2xl">
                                                <span className="text-white text-2xl font-bold">
                                                    {project.title.split(' ').map(word => word.charAt(0)).join('').slice(0, 2)}
                                                </span>
                                            </div>
                                        </div>
                                    </>
                                )}
                                {/* Floating tech icons */}
                                <div className="absolute top-4 right-4 flex gap-2">
                                    {project.techStack?.slice(0, 3).map((tech, techIndex) => (
                                        <div
                                            key={techIndex}
                                            className="w-8 h-8 bg-black/50 backdrop-blur-sm rounded-lg flex items-center justify-center text-xs font-bold text-white"
                                        >
                                            {tech.charAt(0)}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="p-6">
                                {/* Project Title */}
                                <h3 className="text-xl lg:text-2xl font-bold text-white mb-3 group-hover:text-accent2 transition-colors">
                                    {project.title}
                                </h3>

                                {/* Project Description */}
                                <p className="text-gray-300 mb-4 leading-relaxed line-clamp-3">
                                    {project.description}
                                </p>

                                {/* Highlights */}
                                {project.highlights && (
                                    <div className="mb-4">
                                        <h4 className="text-sm font-semibold text-accent2 mb-2">Key Achievements:</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {project.highlights.map((highlight, highlightIndex) => (
                                                <span
                                                    key={highlightIndex}
                                                    className="text-xs bg-accent/20 text-accent px-2 py-1 rounded-full border border-accent/30"
                                                >
                                                    {highlight}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Tech Stack */}
                                {project.techStack && (
                                    <div className="mb-6">
                                        <h4 className="text-sm font-semibold text-gray-400 mb-3">Tech Stack:</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {project.techStack.map((tech, techIndex) => (
                                                <span
                                                    key={techIndex}
                                                    className={`text-xs px-3 py-1 rounded-full border transition-all duration-300 hover:scale-105 ${
                                                        techStackColors[tech] || "bg-gray-500/20 text-gray-300 border-gray-500/30"
                                                    }`}
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Action Buttons */}
                                <div className="flex gap-4">
                                    {project.gitref && (
                                        <a
                                            href={project.gitref}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-4 py-2 bg-gray-700/50 hover:bg-gray-600/50 text-white rounded-lg transition-all duration-300 hover:scale-105 text-sm font-medium"
                                        >
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd"/>
                                            </svg>
                                            GitHub
                                        </a>
                                    )}
                                    {project.liveref && (
                                        <a
                                            href={project.liveref}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent/80 text-white rounded-lg transition-all duration-300 hover:scale-105 text-sm font-medium"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                                            </svg>
                                            Live Demo
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Projects Summary */}
                <div className="mt-16 text-center">
                    <div className="bg-gradient-to-r from-accent2/10 to-accent/10 rounded-2xl p-8 border border-accent2/20 max-w-4xl mx-auto">
                        <h3 className="text-2xl font-bold text-white mb-4">
                            More Projects Coming Soon
                        </h3>
                        <p className="text-gray-300 mb-6 leading-relaxed">
                            I'm constantly working on new projects and exploring cutting-edge technologies.
                            Check out my GitHub for the latest updates and contributions to open-source projects.
                        </p>
                        <a
                            href="https://github.com/CurlyRishabh"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent/80 text-white rounded-full transition-all duration-300 hover:scale-105 font-medium"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd"/>
                            </svg>
                            View All Projects on GitHub
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
