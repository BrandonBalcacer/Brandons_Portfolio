import Link from "next/link";
import { ArrowUpRight, ArrowRight, Github, LockKeyhole } from "lucide-react";
import { detailedProjects } from "@/lib/project-details";
import { LiquidProjectGrid } from "@/components/liquid/liquid-project-grid";
import { SectionHeader } from "@/components/section-header";
import { ProjectVisual } from "@/components/project-visual";

export function ProjectsSection() {
  return (
    <section id="projects" className="mt-20 scroll-mt-8">
      <SectionHeader index="01" title="projects" count={`${detailedProjects.length} builds`} />
      <p className="mb-8 max-w-xl text-muted">A few things I&apos;ve built. Open a project for the use case, the decisions, and what&apos;s under the hood.</p>
      <LiquidProjectGrid items={detailedProjects.map((project, index) => ({
        id: project.slug,
        node: (
            <article className="project-card group" data-project={project.slug} data-field-blocker>
              <div className="flex items-start justify-between gap-4">
                <span className="font-mono text-xs text-subtle">0{index + 1} / {project.tagline}</span>
                <ArrowUpRight size={20} className="project-accent shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
              </div>
              <ProjectVisual images={project.images} slug={project.slug} />
              <h3 className="text-2xl font-semibold tracking-tight"><Link href={`/projects/${project.slug}`} className="project-main-link" aria-label={`Explore ${project.name}`}>{project.name}</Link></h3>
              <p className="mt-2 text-base leading-relaxed text-muted">{project.summary}</p>
              <div className="mt-5 flex flex-wrap gap-2">{project.stack.slice(0, 4).map((tech) => <span key={tech} className="tech-tag">{tech}</span>)}</div>
              <p className="mb-4 mt-5 font-mono text-xs text-subtle">{project.context}</p>
              <a href={project.website.href} target="_blank" rel="noopener noreferrer" className="project-website" aria-label={`${project.website.label}, opens in a new tab`}>
                <span><span className="block text-sm">{project.website.label}</span><span className="mt-1 block font-mono text-[11px] text-muted">{project.website.display ?? new URL(project.website.href).hostname}</span></span>
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
              {project.website.note ? <p className="mb-4 mt-2 font-mono text-[11px] text-subtle">{project.website.note}</p> : null}
              <div className="project-actions">
                <Link href={`/projects/${project.slug}`} className="project-action" aria-label={`${project.name} case study`}>Case study <ArrowRight size={14} aria-hidden="true" /></Link>
                <a href={project.repository.href} target="_blank" rel="noopener noreferrer" className="project-action" aria-label={`${project.name} GitHub repository${project.repository.private ? ', private, access required' : ''}`}><Github size={14} aria-hidden="true" />Source{project.repository.private ? <><LockKeyhole size={11} aria-hidden="true" /><span className="text-subtle">Private</span></> : <ArrowUpRight size={12} aria-hidden="true" />}</a>
              </div>
            </article>
        ),
      }))} />
    </section>
  );
}
