import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, Github, LockKeyhole } from "lucide-react";
import { detailedProjects, getProject } from "@/lib/project-details";
import { ProjectWorkflow } from "@/components/project-workflow";
import { ProjectGallery } from "@/components/project-gallery";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return detailedProjects.map(({ slug }) => ({ slug })); }
export const dynamicParams = false;
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return {
    title: `${project.name} | Brandon Balcacer`,
    description: project.summary,
    openGraph: { title: `${project.name} | Brandon Balcacer`, description: project.summary, url: `/projects/${project.slug}`, images: [{ url: project.images[0].src, alt: project.images[0].alt }] },
    twitter: { card: "summary_large_image", title: `${project.name} | Brandon Balcacer`, description: project.summary, images: [project.images[0].src] },
  };
}
export default async function ProjectPage({ params }: Props) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  const next = detailedProjects[(detailedProjects.indexOf(project) + 1) % detailedProjects.length];
  return (
    <main id="top" data-project={project.slug} className="case-page relative z-10 mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-16">
      <Link href="/#projects" className="nav-link mb-12 inline-flex font-mono text-xs"><ArrowLeft size={15} aria-hidden="true" /> All projects</Link>
      <header className="case-header" data-field-blocker>
        <p className="font-mono text-xs text-accent">{project.context}</p>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-6xl">{project.name}<span className="text-accent">.</span></h1>
        <p className="mt-5 max-w-2xl text-xl leading-relaxed text-muted sm:text-2xl">{project.summary}</p>
        <dl className="mt-10 grid gap-6 border-t border-line pt-6 sm:grid-cols-2"><div><dt className="case-label">Built for</dt><dd className="mt-2 text-sm">{project.audience}</dd></div><div><dt className="case-label">My contribution</dt><dd className="mt-2 text-sm">{project.role}</dd></div></dl>
        <div className="mt-6 flex flex-wrap gap-2">{project.stack.map((tech) => <span key={tech} className="tech-tag">{tech}</span>)}</div>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={project.website.href} target="_blank" rel="noopener noreferrer" className="primary-link website-primary" aria-label={`${project.website.label}, opens in a new tab`}>{project.website.label}<ArrowUpRight size={16} aria-hidden="true" /></a>
          <a href={project.repository.href} target="_blank" rel="noopener noreferrer" className="primary-link" aria-label={`${project.name} GitHub repository${project.repository.private ? ', private, access required' : ''}`}><Github size={15} aria-hidden="true" />View repository {project.repository.private ? <><LockKeyhole size={12} aria-hidden="true" /><span className="text-subtle">Private</span></> : <ArrowUpRight size={15} aria-hidden="true" />}</a>
        </div>
        <p className="mt-3 break-all font-mono text-xs text-muted">{project.website.display ?? new URL(project.website.href).hostname}{project.website.note ? ` · ${project.website.note}` : ""}</p>
        {project.repository.private ? <p className="mt-3 font-mono text-xs text-subtle">Source is private. Repository access is required.</p> : null}
      </header>
      <ProjectGallery images={project.images} name={project.name} />
      <section className="case-section" aria-labelledby="use-case-title"><div><p className="case-label">01 / The use case</p><h2 id="use-case-title" className="mt-3 text-2xl font-medium">Where it starts.</h2></div><p className="case-prose">{project.problem}</p></section>
      <section className="case-section" aria-labelledby="approach-title"><div><p className="case-label">02 / The approach</p><h2 id="approach-title" className="mt-3 text-2xl font-medium">What I built.</h2></div><p className="case-prose">{project.approach}</p></section>
      <section className="case-section" aria-labelledby="challenge-title"><div><p className="case-label">The challenge</p><h2 id="challenge-title" className="mt-3 text-2xl font-medium">What took the work.</h2></div><p className="case-prose">{project.challenge}</p></section>
      <section className="mt-16" aria-labelledby="workflow-title"><p className="case-label">03 / Under the hood</p><h2 id="workflow-title" className="mb-6 mt-3 text-2xl font-medium">Follow the flow.</h2><ProjectWorkflow steps={project.steps} /></section>
      <section className="case-section" aria-labelledby="implementation-title"><div><p className="case-label">04 / Implementation</p><h2 id="implementation-title" className="mt-3 text-2xl font-medium">The details.</h2></div><ul className="space-y-6">{project.bullets.map((bullet) => <li key={bullet} className="case-prose flex gap-3"><span aria-hidden="true" className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent" /><span>{bullet}</span></li>)}</ul></section>
      <section className="my-16 border-y border-line py-8"><p className="case-label">What matters to me</p><p className="mt-4 max-w-3xl text-xl leading-relaxed">{project.takeaway}</p></section>
      <nav className="flex flex-wrap items-center justify-between gap-4 border-t border-line py-8" aria-label="Project navigation"><Link href="/#projects" className="nav-link font-mono text-xs"><ArrowLeft size={14} aria-hidden="true" />All projects</Link><Link href={`/projects/${next.slug}`} className="nav-link text-sm">Next: {next.name}<ArrowRight size={16} aria-hidden="true" /></Link></nav>
    </main>
  );
}
