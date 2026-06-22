import { experience } from "@/lib/data";
import { Reveal } from "@/components/reveal";
import { SectionHeader } from "@/components/section-header";

export function ExperienceSection() {
  return (
    <section className="mt-20">
      <SectionHeader
        index="01"
        title="experience"
        count={`${experience.length} roles`}
      />
      <div className="space-y-4">
        {experience.map((job, i) => (
          <Reveal key={job.company} delay={i * 0.06}>
            <article className="group rounded-xl border border-line bg-card p-5 transition-colors hover:border-foreground/30 sm:p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="font-medium tracking-tight">{job.role}</h3>
                <span className="font-mono text-xs text-subtle">
                  {job.period}
                </span>
              </div>
              <p className="mt-1 font-mono text-xs text-muted">
                {job.company}
                <span className="text-subtle"> · {job.team} · {job.location}</span>
              </p>
              <ul className="mt-4 space-y-2.5">
                {job.bullets.map((bullet, b) => (
                  <li
                    key={b}
                    className="flex gap-3 text-sm leading-relaxed text-muted"
                  >
                    <span
                      className="mt-2 h-1 w-1 shrink-0 rounded-full bg-subtle"
                      aria-hidden="true"
                    />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
