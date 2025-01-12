import TypeWriter from "@/app/components/common/TypeWriter";
import { homeData } from "../data";
export default function MainContent() {
    const texts = ["Software Enginner", "Tech Enthusiast", "MERN Stack Developer", "Open Source Contributor"];

    return <section>
        <div className="flex">
            <div className="w-full self-center space-y-3">
                <p className="text-xl md:text-4xl">Hi</p>
                <p className="text-xl md:text-4xl">I'M <span className="font-bold">{homeData?.name}</span></p>
                <p className="text-xl md:text-5xl font-serif text-accent">
                    <TypeWriter
                        texts={homeData?.typewriterTexts}
                        typingSpeed={100}  // Optional: default is 100ms
                        delayBetweenTexts={2000}  // Optional: default is 2000ms
                    />
                </p>
            </div>
            <div className="bg-gray-100 w-full h-full">
                <div className="h-[500px] bg-gray">

                </div>
            </div>
        </div>
    </section>
}