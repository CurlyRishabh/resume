import { homeData } from "../data";
import Image from "next/image";
import Badge from "@/app/components/common/Badge";

const linkBase = "flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 hover:scale-105";

export default function Hero() {
    return (
        <section className="min-h-[100vh] flex items-center snap-start relative pt-28 pb-16" id='home'>
            <div className="container mx-auto px-4 relative z-10">
                <div className="grid lg:grid-cols-[3fr_2fr] gap-12 items-center">
                    {/* Left side - who, what, and how to reach me */}
                    <div className="space-y-8 text-center lg:text-left">
                        <div className="space-y-5">
                            <div className="rise" style={{ "--i": 0 }}>
                                <h1 className="text-4xl md:text-6xl font-bold">
                                    <span className="bg-gradient-to-r from-primary via-accent2 to-accent bg-clip-text text-transparent">
                                        {homeData.name}
                                    </span>
                                </h1>
                                <p className="text-lg md:text-xl text-gray-300 mt-3">
                                    {homeData.headline}
                                    <span className="text-accent2"> · {homeData.focus}</span>
                                </p>
                            </div>

                            <p className="rise text-2xl md:text-4xl font-semibold text-white leading-snug" style={{ "--i": 2 }}>
                                {homeData.tagline}{" "}
                                <span className="draw-underline">{homeData.taglineAccent}</span>.
                            </p>

                            <p className="rise text-gray-300 text-lg max-w-2xl leading-relaxed mx-auto lg:mx-0" style={{ "--i": 3 }}>
                                {homeData.intro}
                            </p>
                        </div>

                        {/* Primary links */}
                        <div className="rise flex flex-wrap gap-3 justify-center lg:justify-start" style={{ "--i": 4 }}>
                            <a
                                href={homeData.resume}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`${linkBase} bg-accent hover:bg-accent/80 text-white hover:shadow-lg`}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16"/>
                                </svg>
                                Download Resume
                            </a>

                            <a
                                href={`mailto:${homeData.email}`}
                                className={`${linkBase} border border-accent2 text-accent2 hover:bg-accent2 hover:text-black`}
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                                </svg>
                                Email Me
                            </a>

                            <a
                                href={homeData.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`${linkBase} border border-gray-600 text-gray-200 hover:border-accent2 hover:text-accent2`}
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                    <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd"/>
                                </svg>
                                LinkedIn
                            </a>

                            <a
                                href={homeData.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`${linkBase} border border-gray-600 text-gray-200 hover:border-accent2 hover:text-accent2`}
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                </svg>
                                GitHub
                            </a>
                        </div>

                        {/* Location */}
                        <div className="rise flex flex-wrap gap-6 justify-center lg:justify-start text-sm text-gray-400" style={{ "--i": 5 }}>
                            <div className="flex items-center gap-2">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                                </svg>
                                {homeData.location}
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                Available for opportunities
                            </div>
                        </div>
                    </div>

                    {/* Right side - photo and floating badges */}
                    <div className="rise relative flex justify-center lg:justify-end" style={{ "--i": 3 }}>
                        <div className="relative">
                            <div className="w-64 h-64 sm:w-80 sm:h-80 relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-accent/30 to-accent2/30 rounded-full blur-2xl"></div>
                                <Image
                                    src="/hero/hero1.png"
                                    alt="Rishabh Singh Bisht"
                                    className="relative z-10 rounded-full object-cover border-4 border-accent2/20"
                                    fill={true}
                                    sizes="(max-width: 640px) 16rem, 20rem"
                                    priority
                                />
                            </div>

                            <Badge
                                text="AI Agents"
                                className="absolute -top-4 -right-4 animate-float bg-gradient-to-r from-accent to-accent2 text-white border-0 shadow-lg z-20"
                            />
                            <Badge
                                text="Automation"
                                className="absolute bottom-0 -right-2 animate-float-delayed bg-gradient-to-r from-primary to-accent2 text-black border-0 shadow-lg z-20"
                            />
                            <Badge
                                text={`${homeData.experienceYears} Years Experience`}
                                className="absolute top-1/2 -left-8 animate-float-slow bg-gradient-to-r from-accent2 to-secondary text-white border-0 shadow-lg z-20"
                            />
                        </div>
                    </div>
                </div>

                {/* Impact numbers: shown at once, no counting */}
                <dl className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-16">
                    {homeData.stats.map((stat, index) => (
                        <div
                            key={stat.label}
                            className="rise bg-gray-900/70 backdrop-blur-sm rounded-2xl p-5 border border-gray-700/60 text-center lg:text-left"
                            style={{ "--i": 6 + index }}
                        >
                            <dd className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-accent2 to-accent bg-clip-text text-transparent">{stat.value}</dd>
                            <dt className="text-gray-300 text-sm mt-1 leading-snug">{stat.label}</dt>
                        </div>
                    ))}
                </dl>
            </div>
        </section>
    );
}
