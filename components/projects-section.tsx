import { projects } from "@/lib/data";
import { Reveal } from "@/components/reveal";
import { SectionHeader } from "@/components/section-header";

export function ProjectsSection() {
  return (
    <section className="mt-20">
      <SectionHeader
        index="02"
        title="projects"
        count={`${projects.length} builds`}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal key={project.name} delay={i * 0.06}>
            <article className="group flex h-full flex-col rounded-xl border border-line bg-card p-5 transition-colors hover:border-foreground/30 sm:p-6">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-medium tracking-tight">{project.name}</h3>
                <span className="font-mono text-[11px] text-subtle">
                  {project.context}
                </span>
              </div>
              <p className="mt-0.5 font-mono text-xs text-muted">
                {project.tagline}
              </p>
              <ul className="mt-4 space-y-2.5">
                {project.bullets.map((bullet, b) => (
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
              <div className="mt-5 flex flex-wrap gap-1.5 pt-1">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-line bg-background px-2 py-0.5 font-mono text-[11px] text-muted"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
