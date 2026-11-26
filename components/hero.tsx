import Image from "next/image";
import { ArrowDown, ArrowUpRight, MapPin } from "lucide-react";
import { profile } from "@/lib/data";

export function Hero() {
  return (
    <header>
      <nav className="mb-10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs" aria-label="Main navigation">
        <a href="#top" className="nav-link inline-flex min-h-11 items-center text-foreground">brandon<span className="text-accent">.</span></a>
        <div className="flex items-center gap-6 text-muted">
          <a href="#projects" className="nav-link">Projects</a>
          <a href="#experience" className="nav-link">Experience</a>
          <a href="#connect" className="nav-link">Connect <ArrowUpRight size={13} aria-hidden="true" /></a>
        </div>
      </nav>
      <div className="hero-grid">
        <div className="overflow-hidden rounded-xl border border-line bg-card" data-field-blocker>
          <div className="flex items-center gap-2 border-b border-line px-5 py-4" aria-hidden="true"><span className="h-2 w-2 rounded-full bg-accent" /><span className="ml-2 font-mono text-xs text-subtle">{profile.handle}@{profile.host}: ~</span></div>
          <div className="p-6 sm:p-8">
            <p className="font-mono text-xs text-muted"><span className="text-accent">$</span> whoami</p>
            <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">Brandon<br />Balcacer<span className="text-accent">.</span></h1>
            <p className="mt-4 font-mono text-sm leading-relaxed text-accent">{profile.role}</p>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-foreground">I&apos;m just a guy who enjoys building and shipping and working with data.</p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">{profile.bio}</p>
            <div className="mt-7 flex flex-wrap items-center gap-5"><a href="#projects" className="primary-link">Explore my work <ArrowDown size={15} aria-hidden="true" /></a><span className="inline-flex items-center gap-1.5 font-mono text-xs text-subtle"><MapPin size={13} aria-hidden="true" />{profile.location}</span></div>
          </div>
        </div>
        <figure className="hero-photo" data-field-blocker>
          <a href="/images/brandon-cnbc-nyse.jpg" target="_blank" rel="noopener noreferrer" aria-label="View full photograph at the CNBC Investing Club annual meeting" className="group block h-full">
            <Image src="/images/brandon-cnbc-nyse.jpg" alt="Brandon at the NYSE podium at the CNBC Investing Club annual meeting" fill sizes="(max-width: 767px) 100vw, 420px" preload className="object-cover object-[center_65%] transition-transform duration-500 motion-safe:group-hover:scale-[1.02]" />
          </a>
        </figure>
      </div>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-muted"><span className="inline-flex items-center gap-2"><span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />{profile.status}</span><span className="text-subtle">Founder. Builder. Sprinter.</span></div>
    </header>
  );
}
