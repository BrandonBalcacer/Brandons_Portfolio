import { projects } from "@/lib/data";
import { Reveal } from "@/components/reveal";
import { SectionHeader } from "@/components/section-header";
import { ArrowUpRight } from "lucide-react";

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
            <article className="group flex h-full flex-col rounded-xl border border-line bg-card p-5 transition-colors hover:border-accent/40 sm:p-6">
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
                      className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent"
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
              <div className="mt-5 flex flex-wrap gap-4 border-t border-line pt-4">
                {project.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${link.label} link for ${project.name}`}
                    className="group/link inline-flex items-center gap-1.5 font-mono text-xs text-accent transition-colors hover:text-foreground"
                  >
                    {link.label}
                    <ArrowUpRight
                      className="h-3.5 w-3.5 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </a>
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
