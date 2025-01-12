import { projectData } from "../data";

export default function Projects() {
    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-12 text-center">Projects</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projectData.map((project, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                        >
                            <div className="aspect-video bg-gray-100">
                                {/* Add project image here */}
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                                <p className="text-gray-600 mb-4">{project.description}</p>
                                <div className="flex gap-4">
                                    {project.gitref && (
                                        <a
                                            href={project.gitref}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-accent hover:underline"
                                        >
                                            GitHub
                                        </a>
                                    )}
                                    {project.liveref && (
                                        <a
                                            href={project.liveref}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-accent hover:underline"
                                        >
                                            Live Demo
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
