import Hero from "./home/components/Hero";
import Skills from "./home/components/Skills";
import Experience from "./home/components/Experience";
import Projects from "./home/components/Projects";
import Contact from "./home/components/Contact";
import Built from "./home/components/Built";

export default function Home() {
  return (
    <div className="min-h-screen snap-mandatory snap-y">
      <Hero />
      <Built />
      <Projects />
      <Experience />
      <Skills />
      <Contact />
    </div>
  );
}
