import { skills } from "@/lib/data";
import { Reveal } from "@/components/reveal";
import { SectionHeader } from "@/components/section-header";

export function SkillsSection() {
  return (
    <section id="skills" data-section-theme="coral" className="section-themed mt-20 scroll-mt-8">
      <SectionHeader index="03" title="skills" />
      <div className="space-y-6">
        {skills.map((group, i) => (
          <Reveal key={group.label} delay={i * 0.06}>
            <div data-field-blocker className="section-card flex flex-col gap-3 rounded-xl border p-5 sm:flex-row sm:gap-6 sm:p-6">
              <h3 className="section-accent shrink-0 pt-1 font-mono text-xs sm:w-40">
                {group.label}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="skill-pill rounded-md border px-2.5 py-1 text-xs text-muted"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
