import TypeWriter from "@/app/components/common/TypeWriter";
import { homeData } from "../data";
import Image from "next/image";
import Badge from "@/app/components/common/Badge";

export default function Hero() {
    return (
        <section className="min-h-[100vh] flex items-center bg-black snap-mandatory">
            <div className="container mx-auto px-4 relative flex flex-col text-center p-4">
                <div className="">
                    <div className="space-y-4 text-white">
                        <h1 className="text-2xl md:text-3xl">
                            {"Hi, I'm "}<span className="font-semibold bg-gradient-to-r from-[#cbccff] via-[#9296f0] to-[#5b63b7] bg-clip-text text-transparent">{homeData.name}</span>
                        </h1>
                        <div className="text-2xl md:text-4xl text-white">
                            <TypeWriter
                                texts={homeData.typewriterTexts}
                                typingSpeed={100}
                                delayBetweenTexts={2000}
                            />
                        </div>
                    </div>

                </div>
                <div className="aspect-square flex rounded-lg  relative overflow-hidden h-[500px] self-center"><Image src="/hero/hero1.png" alt="hero2" className="" fill={true} /></div>
                {/* badges */}
                <Badge text="Software Engineer" className="absolute top-1/3 right-1/4 rounded-es-none" />

                <Badge text="Fullstack Developer" className="absolute top-1/2 left-1/4 -translate-x-1/2 rounded-ee-none" />

            </div>
        </section>
    );
}
