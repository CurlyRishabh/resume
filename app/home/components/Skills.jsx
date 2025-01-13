import { skillsData } from "../data";

export default function Skills() {
    return (
        <section className="py-20 te snap- ">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-12 text-center">My Skills</h2>
                <div className="grid gap-8">
                    {Object.entries(skillsData).map(([category, skills]) => (
                        <div key={category} className="space-y-4">
                            <h3 className="text-xl font-semibold capitalize">
                                {category.replace(/_/g, ' ')}
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {skills.map((skill) => (
                                    <div key={skill.name} className="relative group">
                                        <span className="px-4 py-2 bg-white text-black rounded-full text-sm cursor-help transition-all duration-300 hover:bg-slate-400 hover:text-white hover:scale-110 inline-block">
                                            {skill.name}
                                        </span>
                                        {/* Tooltip */}
                                        <div className="absolute z-10 w-48 p-2 bg-gray-900 text-white text-xs rounded-lg 
                                            opacity-0 group-hover:opacity-100 transition-opacity duration-300
                                            bottom-full left-1/2 transform -translate-x-1/2 mb-2
                                            before:content-[''] before:absolute before:bottom-[-5px] before:left-1/2 
                                            before:-translate-x-1/2 before:border-[6px] before:border-transparent
                                            before:border-t-gray-900 pointer-events-none">
                                            {skill.description}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
