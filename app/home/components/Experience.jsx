import { experienceData } from "../data";

export default function Experience() {
    return (
        <section className="py-20 snap-start">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-12 text-center">Experience</h2>
                <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gray-100" />

                    <div className="space-y-12 py-10">
                        {experienceData.map((experience, index) => (
                            <div
                                key={index}
                                className={`flex ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                                    } items-center`}
                            >
                                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8' : "pl-8"}`}>
                                    <div className="bg-[#173555] p-5 rounded-t-lg border-b-2 rounded-b-none">
                                        <div className={`${index % 2 === 0 ? "text-right" : "text-left"}`}>
                                            <div className="leading-2">
                                                <h3 className="text-2xl font-semibold text-[#75fac8]">{experience.company.name}</h3>
                                                <p className="text-[#f1f1e6] text-base font-semibold">{experience.role[0].title}</p>
                                                <p className="text-base text-[#f1f1e6] italic">
                                                    {new Date(experience.employment_period.start_date).toLocaleDateString()} -
                                                    {experience.employment_period.end_date.length == 0 ? " Present" : new Date(experience.employment_period.end_date).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <ul className="mt-2 text-base text-left space-y-3 list-disc pl-5">
                                                {experience.tasks.map((task, i) => (
                                                    <li key={i}>{task}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                </div>
                                <div className="w-10 h-10 bg-accent rounded-full absolute left-1/2 transform -translate-x-1/2 self-start mt-4 flex p-1 items-center justify-center" >
                                    <div className="h-full w-full bg-black rounded-full" />
                                </div>
                                <div className="w-1/2 pl-8" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
