import TypeWriter from "@/app/components/common/TypeWriter";
import { homeData } from "../data";
import Image from "next/image";
import Badge from "@/app/components/common/Badge";

export default function Hero() {
    return (
        <section className="min-h-[100vh] flex items-center bg-gradient-to-br from-black via-gray-900 to-black snap-start relative overflow-hidden" id='home'>
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-accent/20 to-accent2/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left side - Text content */}
                    <div className="space-y-8 text-center lg:text-left">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <p className="text-accent text-lg font-medium animate-fade-in">Hello, I'm</p>
                                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold">
                                    <span className="bg-gradient-to-r from-primary via-accent2 to-accent bg-clip-text text-transparent animate-gradient">
                                        {homeData.name}
                                    </span>
                                </h1>
                            </div>
                            
                            <div className="text-2xl md:text-3xl lg:text-4xl text-white font-light">
                                <TypeWriter
                                    texts={homeData.typewriterTexts}
                                    typingSpeed={100}
                                    delayBetweenTexts={2000}
                                />
                            </div>
                            
                            <p className="text-gray-300 text-lg max-w-2xl leading-relaxed">
                                {homeData.summary}
                            </p>
                        </div>

                        {/* Contact info */}
                        <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                            <a
                                href={`mailto:${homeData.email}`}
                                className="flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent/80 text-white rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                                </svg>
                                Contact Me
                            </a>
                            
                            <a
                                href={homeData.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-6 py-3 border border-accent2 text-accent2 hover:bg-accent2 hover:text-black rounded-full transition-all duration-300 hover:scale-105"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd"/>
                                </svg>
                                LinkedIn
                            </a>
                        </div>

                        {/* Location and availability */}
                        <div className="flex flex-wrap gap-6 justify-center lg:justify-start text-sm text-gray-400">
                            <div className="flex items-center gap-2">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
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

                    {/* Right side - Image and floating badges */}
                    <div className="relative flex justify-center lg:justify-end">
                        <div className="relative">
                            <div className="w-80 h-80 lg:w-96 lg:h-96 relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-accent/30 to-accent2/30 rounded-full blur-2xl animate-pulse"></div>
                                <Image
                                    src="/hero/hero1.png"
                                    alt="Rishabh Singh Bisht"
                                    className="relative z-10 rounded-full object-cover border-4 border-accent2/20"
                                    fill={true}
                                    style={{
                                        filter: "drop-shadow(0px 10px 30px rgba(91, 99, 183, 0.3))",
                                    }}
                                />
                            </div>

                            {/* Floating badges with animations */}
                            <Badge
                                text="AI/ML Engineer"
                                className="absolute -top-4 -right-4 animate-float bg-gradient-to-r from-accent to-accent2 text-white border-0 shadow-lg"
                            />
                            <Badge
                                text="Full Stack Developer"
                                className="absolute -bottom-4 -left-4 animate-float-delayed bg-gradient-to-r from-primary to-accent2 text-black border-0 shadow-lg"
                            />
                            <Badge
                                text="1+ Years Experience"
                                className="absolute top-1/2 -left-8 animate-float-slow bg-gradient-to-r from-accent2 to-secondary text-white border-0 shadow-lg"
                            />
                        </div>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <div className="w-6 h-10 border-2 border-accent2 rounded-full flex justify-center">
                        <div className="w-1 h-3 bg-accent2 rounded-full mt-2 animate-pulse"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}
