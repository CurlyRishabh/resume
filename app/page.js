import Hero from "./home/components/Hero";
import Skills from "./home/components/Skills";
import Experience from "./home/components/Experience";
import Projects from "./home/components/Projects";
import MainContent from "./home/components/MainContent";

export default function Home() {
  return (
    <div className="min-h-screen snap-mandatory snap-y">
      <Hero />
      <Skills />
      <Experience />
      <Projects />
    </div>
  );
}
