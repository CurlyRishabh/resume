import TypeWriter from "@/app/components/common/TypeWriter";
import { homeData } from "../data";

export default function Hero() {
  return (
    <section className="min-h-[100vh] flex items-center bg-primary/30 snap-mandatory">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold">
              Hi, I'm {homeData.name}
            </h1>
            <div className="text-2xl md:text-4xl text-accent">
              <TypeWriter
                texts={homeData.typewriterTexts}
                typingSpeed={100}
                delayBetweenTexts={2000}
              />
            </div>
          </div>
          <div className="hidden md:block">
            {/* Add your hero image here */}
            <div className="aspect-square rounded-full bg-accent/20"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
