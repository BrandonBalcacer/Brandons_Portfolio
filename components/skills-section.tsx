import { skills } from "@/lib/data";
import { Reveal } from "@/components/reveal";
import { SectionHeader } from "@/components/section-header";

export function SkillsSection() {
  return (
    <section className="mt-20">
      <SectionHeader index="03" title="skills" />
      <div className="space-y-6">
        {skills.map((group, i) => (
          <Reveal key={group.label} delay={i * 0.06}>
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-6">
              <h3 className="shrink-0 pt-1 font-mono text-xs text-subtle sm:w-40">
                {group.label}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-md border border-line bg-card px-2.5 py-1 text-xs text-muted transition-colors hover:border-accent/40 hover:text-accent"
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
