import { experienceData } from "../data";

export default function Experience() {
    return (
        <section className="py-20 snap-start">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-12 text-center">Experience</h2>
                <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gray-200" />

                    <div className="space-y-12">
                        {experienceData.map((experience, index) => (
                            <div
                                key={index}
                                className={`flex ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                                    } items-center`}
                            >
                                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8' : "pl-8"}`}>
                                    <div className={`${index % 2 === 0 ? "text-right" : "text-left"}`}>
                                        <h3 className="text-xl font-bold">{experience.company.name}</h3>
                                        <p className="text-accent">{experience.role[0].title}</p>
                                        <p className="text-base text-accent2">
                                            {new Date(experience.employment_period.start_date).toLocaleDateString()} -
                                            {experience.employment_period.end_date.length == 0 ? " Present" : new Date(experience.employment_period.end_date).toLocaleDateString()}
                                        </p>
                                        <ul className="mt-2 text-sm text-left space-y-3">
                                            {experience.tasks.map((task, i) => (
                                                <li key={i}>{task}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className="w-4 h-4 bg-accent rounded-full absolute left-1/2 transform -translate-x-1/2" />
                                <div className="w-1/2 pl-8" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
