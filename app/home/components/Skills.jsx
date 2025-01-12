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
                                    <span
                                        key={skill}
                                        className="px-4 py-2 bg-white text-black rounded-full text-sm"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
