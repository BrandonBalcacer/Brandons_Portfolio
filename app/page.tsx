import { Hero } from "@/components/hero";
import { IntroScreen } from "@/components/intro/intro-screen";
import { ExperienceSection } from "@/components/experience-section";
import { ProjectsSection } from "@/components/projects-section";
import { SkillsSection } from "@/components/skills-section";
import { EducationSection } from "@/components/education-section";
import { ConnectSection } from "@/components/connect-section";

export default function Home() {
  return (
    <>
      <IntroScreen />
      <main id="top" className="relative z-10 min-h-screen text-foreground">
        <div className="mx-auto max-w-5xl px-5 py-8 sm:px-8 sm:py-12">
          <Hero />
          <ProjectsSection />
          <ExperienceSection />
          <SkillsSection />
          <EducationSection />
          <ConnectSection />
        </div>
      </main>
    </>
  );
}
