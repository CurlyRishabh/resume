import Header from "./components/Header";
import OrchestratorFigure from "./components/OrchestratorFigure";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Education from "./components/Education";
import Contact from "./components/Contact";
import { resume } from "./data/resume";

export default function Home() {
  return (
    <>
      <Header />
      <OrchestratorFigure project={resume.projects[0]} />
      <Experience />
      <Skills />
      <Education />
      <Contact />
    </>
  );
}
