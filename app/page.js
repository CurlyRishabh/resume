import Header from "./components/Header";
import RunSimulator from "./components/sim/RunSimulator";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Education from "./components/Education";
import Contact from "./components/Contact";

export default function Home() {
  return (
    <>
      <Header />
      <RunSimulator />
      <Experience />
      <Skills />
      <Education />
      <Contact />
    </>
  );
}
