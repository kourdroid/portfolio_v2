import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Projects } from "@/components/portfolio/Projects";
import { Skills } from "@/components/portfolio/Skills";
import { Contact } from "@/components/portfolio/Contact";
import { FAQ } from "@/components/portfolio/FAQ";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
      <FAQ />
    </div>
  );
}
