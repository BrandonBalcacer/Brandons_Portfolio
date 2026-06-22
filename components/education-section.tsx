import { Award } from "lucide-react";
import { education, honors } from "@/lib/data";
import { Reveal } from "@/components/reveal";
import { SectionHeader } from "@/components/section-header";

export function EducationSection() {
  return (
    <section className="mt-20">
      <SectionHeader index="04" title="education & honors" />
      <div className="grid gap-4 sm:grid-cols-2">
        <Reveal>
          <article className="h-full rounded-xl border border-line bg-card p-5 sm:p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="font-medium tracking-tight">{education.school}</h3>
              <span className="font-mono text-xs text-subtle">
                {education.period}
              </span>
            </div>
            <p className="mt-1 font-mono text-xs text-muted">
              {education.degree}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {education.coursework}
            </p>
          </article>
        </Reveal>

        <Reveal delay={0.06}>
          <article className="h-full rounded-xl border border-line bg-card p-5 sm:p-6">
            <h3 className="font-mono text-xs text-subtle">honors</h3>
            <ul className="mt-4 space-y-3">
              {honors.map((honor) => (
                <li
                  key={honor}
                  className="flex gap-3 text-sm leading-relaxed text-muted"
                >
                  <Award
                    className="mt-0.5 h-4 w-4 shrink-0 text-subtle"
                    aria-hidden="true"
                  />
                  <span>{honor}</span>
                </li>
              ))}
            </ul>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
