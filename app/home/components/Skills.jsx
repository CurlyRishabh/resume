import { skillsData } from "../data";
import Reveal from "@/app/components/common/Reveal";

// Two rows of every skill, sliding in opposite directions. Decorative:
// the grouped lists below carry the same content for reading.
const ALL = skillsData.flatMap((group) => group.skills);
const ROWS = [ALL.slice(0, Math.ceil(ALL.length / 2)), ALL.slice(Math.ceil(ALL.length / 2))];

export default function Skills() {
    return (
        <section className="py-28 snap-start" id="skills">
            <div className="container mx-auto px-4">
                <Reveal className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-semibold tracking-tight mb-5">
                        <span className="text-white">
                            Technical Skills
                        </span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        The tools I use in production, grouped the way I use them
                    </p>
                </Reveal>

                <div className="marquee space-y-3 mb-12" aria-hidden="true">
                    {ROWS.map((row, index) => (
                        <div key={index} className="overflow-hidden">
                            <div className={`marquee-track flex w-max gap-3 ${index ? "marquee-reverse" : ""}`}>
                                {[...row, ...row, ...row, ...row].map((skill, i) => (
                                    <span key={i} className="rounded-full border border-accent2/30 bg-gray-900/70 px-5 py-2 text-primary font-mono text-sm whitespace-nowrap">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                    {skillsData.map((group) => (
                        <Reveal
                            key={group.category}
                            className="bg-white/[0.03] backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-white/10 hover:border-accent2/50"
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
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
