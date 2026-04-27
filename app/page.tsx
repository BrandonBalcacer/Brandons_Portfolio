"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Mail,
  Github,
  Linkedin,
  Sparkles,
  MapPin,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const NAV = [
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const EXPERIENCE = [
  {
    role: "Data Analytics Intern",
    org: "MTA — Metropolitan Transportation Authority",
    period: "Jan 2026 — Present",
    body: "Engineered Python and SQL ETL workflows to clean and standardize 1,600+ operational records, and shipped Power BI dashboards tracking material usage, fulfillment rates, and project KPIs. Automated manual memorandum and paper tracking with Power Automate, Power Apps, and SharePoint, and applied generative AI to accelerate data cleaning and surface structured insights from raw operational data.",
    tags: ["Python", "SQL", "Power BI", "Generative AI"],
  },
  {
    role: "Team Member",
    org: "Target",
    period: "2022 — Present",
    body: "Covered Front-End Team Lead duties overseeing guest service, cashier management, and digital order fulfillment, diagnosing issues across 12+ POS and self-checkout systems. Picked and batched digital orders with 99% accuracy, trained new hires on fulfillment tech, and earned the Annual Performance Bonus for team contributions.",
    tags: ["Operations", "Leadership", "Retail Tech"],
  },
];

const PROJECTS = [
  {
    title: "B2B Lead Generator",
    year: "2026",
    href: "https://github.com/BrandonBalcacer",
    description:
      "A 5-phase automated outreach pipeline for Archive Studio Marketing — sources, scores, and enriches B2B leads using Google Places, Firecrawl, and Hunter.io, then uses Claude to draft personalized emails with smart send-time scheduling. Built to turn cold prospecting into a repeatable, revenue-driving system.",
    role: "End-to-end build",
    tags: ["Python", "APIs", "Claude AI", "Automation"],
  },
  {
    title: "Tasteful Sweets Dashboard",
    year: "2026",
    href: "https://github.com/BrandonBalcacer",
    description:
      "An end-to-end operations and analytics dashboard running live for an active bakery business. Ingests Shopify orders via HMAC-verified webhooks, reconciles recipe and expense data in SQLite, and auto-generates weekly production schedules, shopping lists, and per-product profit margin reports — turning raw order data into the decisions that keep the bakery profitable.",
    role: "Production system",
    tags: ["Python", "Flask", "SQLite", "pandas"],
  },
];

const SKILLS = [
  {
    group: "Languages & Data",
    items: [
      "Python",
      "pandas",
      "openpyxl",
      "SQL",
      "DAX",
      "PowerFx",
      "JavaScript",
      "HTML / CSS",
    ],
  },
  {
    group: "Analytics & BI",
    items: [
      "Power BI",
      "Tableau",
      "Power Apps",
      "Power Automate",
      "SharePoint",
      "ETL Pipelines",
      "Statistical Analysis",
    ],
  },
  {
    group: "Backend & Cloud",
    items: [
      "SQLite",
      "Flask",
      "REST APIs",
      "Webhooks (HMAC)",
      "AWS S3",
      "CloudFront",
      "IAM",
      "Git",
    ],
  },
  {
    group: "AI & Tooling",
    items: [
      "Generative AI",
      "Prompt Engineering",
      "Claude API",
      "Workflow Automation",
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="relative min-h-screen text-ink">
      <Nav scrolled={scrolled} />
      <Hero />
      <Intro />
      <Work />
      <Experience />
      <Skills />
      <Contact />
      <Footer />
    </main>
  );
}

/* ------------------------------------------------------------------ */
/*  Nav                                                                */
/* ------------------------------------------------------------------ */

function Nav({ scrolled }: { scrolled: boolean }) {
  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-ivory/80 backdrop-blur border-b border-line"
          : "bg-transparent border-b border-transparent",
      ].join(" ")}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10">
        <a href="#top" className="flex items-center gap-2 group">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-clay text-cream text-sm font-serif italic">
            B
          </span>
          <span className="font-serif text-base text-ink group-hover:text-clay transition-colors">
            Brandon Balcacer
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm text-graphite">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="link-under">
              {n.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="hidden md:inline-flex items-center gap-2 rounded-full border border-ink/15 bg-paper px-4 py-2 text-sm shadow-soft hover:bg-clay hover:text-cream hover:border-clay transition-colors"
        >
          Get in touch
          <ArrowUpRight size={14} />
        </a>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */

function Hero() {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden pt-40 pb-28 md:pt-52 md:pb-40"
    >
      {/* paper texture / gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-32 h-[120%] -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 80% 10%, rgba(204,120,92,0.18) 0%, rgba(204,120,92,0) 60%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-32 h-[80%] -z-10"
        style={{
          background:
            "radial-gradient(40% 40% at 10% 60%, rgba(204,120,92,0.10) 0%, rgba(204,120,92,0) 60%)",
        }}
      />

      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="mb-8 flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-muted">
          <span className="asterisk text-clay">✻</span>
          Portfolio · 2026
          <span className="hidden md:inline-flex items-center gap-1 ml-3">
            <MapPin size={12} className="text-clay" /> New Jersey
          </span>
        </div>

        <h1 className="font-serif text-[clamp(2.75rem,8vw,7.5rem)] leading-[0.95] tracking-tightest text-ink">
          Turning operational <br className="hidden md:block" />
          data into{" "}
          <span className="italic text-clay">decisions</span>.
        </h1>

        <div className="mt-10 grid gap-10 md:grid-cols-12">
          <p className="md:col-span-7 text-lg md:text-xl leading-relaxed text-graphite max-w-2xl">
            I&apos;m{" "}
            <span className="text-ink font-medium">Brandon Balcacer</span> — a
            data analyst and builder studying at Ramapo College of New Jersey.
            I design ETL pipelines, BI dashboards, and AI-assisted workflows
            that move teams from raw spreadsheets to clear, repeatable
            decisions.
          </p>

          <div className="md:col-span-5 flex flex-col justify-end gap-4">
            <div className="flex flex-wrap gap-3">
              <a
                href="#work"
                className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm text-cream hover:bg-clay transition-colors"
              >
                See selected work <ArrowUpRight size={16} />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-paper px-5 py-3 text-sm hover:border-clay hover:text-clay transition-colors"
              >
                <Mail size={16} /> Contact
              </a>
            </div>
            <p className="text-xs text-subtle">
              Available for analytics and automation work.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Intro / About strip                                                */
/* ------------------------------------------------------------------ */

function Intro() {
  const facts = [
    { k: "Focus", v: "Analytics, ETL, AI workflows" },
    { k: "Stack", v: "Python · SQL · Power BI · Claude" },
    { k: "Status", v: "Open to roles & projects" },
  ];
  return (
    <section className="border-y border-line bg-cream/60">
      <div className="mx-auto grid max-w-6xl gap-6 px-6 py-10 md:grid-cols-3 md:px-10">
        {facts.map((f) => (
          <div key={f.k} className="flex items-baseline gap-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-clay">
              {f.k}
            </span>
            <span className="font-serif text-lg text-ink">{f.v}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section heading                                                    */
/* ------------------------------------------------------------------ */

function SectionHeading({
  index,
  eyebrow,
  title,
  lede,
}: {
  index: string;
  eyebrow: string;
  title: string;
  lede?: string;
}) {
  return (
    <div className="mb-14 max-w-3xl">
      <div className="mb-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
        <span className="text-clay">{index}</span>
        <span className="h-px w-10 bg-rule" />
        {eyebrow}
      </div>
      <h2 className="font-serif text-4xl md:text-5xl leading-tight tracking-tight text-ink">
        {title}
      </h2>
      {lede && (
        <p className="mt-4 max-w-2xl text-base md:text-lg text-graphite">
          {lede}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Work                                                               */
/* ------------------------------------------------------------------ */

function Work() {
  return (
    <section id="work" className="mx-auto max-w-6xl px-6 py-28 md:px-10 md:py-36">
      <SectionHeading
        index="01"
        eyebrow="Selected Work"
        title="Projects that turn data into decisions."
        lede="A small set of recent builds — production systems, AI-assisted pipelines, and analytics surfaces."
      />

      <div className="grid gap-6 md:grid-cols-2">
        {PROJECTS.map((p) => (
          <ProjectCard key={p.title} project={p} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({
  project,
}: {
  project: (typeof PROJECTS)[number];
}) {
  return (
    <Link
      href={project.href}
      target="_blank"
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-line bg-paper p-7 shadow-card transition-all hover:-translate-y-0.5 hover:border-clay/40"
    >
      {/* hover glow */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-clayLight/40 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
      />
      <div>
        <div className="mb-5 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
          <span>{project.role}</span>
          <span>{project.year}</span>
        </div>
        <h3 className="font-serif text-2xl md:text-[28px] leading-tight text-ink">
          {project.title}
          <ArrowUpRight
            size={20}
            className="ml-2 inline-block -translate-y-0.5 text-clay opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
          />
        </h3>
        <p className="mt-4 text-[15px] leading-relaxed text-graphite">
          {project.description}
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.tags.map((t) => (
          <span
            key={t}
            className="rounded-full border border-line bg-cream px-3 py-1 font-mono text-[11px] text-graphite"
          >
            {t}
          </span>
        ))}
      </div>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/*  Experience                                                         */
/* ------------------------------------------------------------------ */

function Experience() {
  return (
    <section
      id="experience"
      className="border-t border-line bg-cream/40"
    >
      <div className="mx-auto max-w-6xl px-6 py-28 md:px-10 md:py-36">
        <SectionHeading
          index="02"
          eyebrow="Experience"
          title="Where I've shipped real work."
          lede="A mix of analytics, automation, and operations — bringing structure to messy data and messy systems."
        />

        <ol className="relative">
          <span
            aria-hidden
            className="absolute left-2 top-2 bottom-2 w-px bg-rule md:left-3"
          />
          {EXPERIENCE.map((e, i) => (
            <li key={i} className="relative pl-10 md:pl-14 pb-12 last:pb-0">
              <span className="absolute left-0 top-2 grid h-5 w-5 place-items-center rounded-full border border-clay bg-ivory">
                <span className="h-2 w-2 rounded-full bg-clay" />
              </span>

              <div className="grid gap-6 md:grid-cols-12">
                <div className="md:col-span-4">
                  <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-clay">
                    {e.period}
                  </div>
                  <h3 className="mt-2 font-serif text-2xl text-ink">
                    {e.role}
                  </h3>
                  <p className="mt-1 text-sm text-muted">{e.org}</p>
                </div>

                <div className="md:col-span-8">
                  <p className="text-[15px] leading-relaxed text-graphite">
                    {e.body}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {e.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-line bg-paper px-3 py-1 font-mono text-[11px] text-graphite"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Skills                                                             */
/* ------------------------------------------------------------------ */

function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 py-28 md:px-10 md:py-36">
      <SectionHeading
        index="03"
        eyebrow="Toolkit"
        title="What I reach for."
        lede="The stack I use to move from question, to data, to decision."
      />

      <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2">
        {SKILLS.map((s) => (
          <div key={s.group} className="bg-paper p-7 md:p-8">
            <div className="mb-5 flex items-center gap-2">
              <Sparkles size={14} className="text-clay" />
              <h3 className="font-serif text-xl text-ink">{s.group}</h3>
            </div>
            <ul className="flex flex-wrap gap-2">
              {s.items.map((it) => (
                <li
                  key={it}
                  className="rounded-full border border-line bg-cream px-3 py-1.5 font-mono text-[12px] text-graphite transition-colors hover:border-clay hover:bg-clay hover:text-cream"
                >
                  {it}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Contact                                                            */
/* ------------------------------------------------------------------ */

function Contact() {
  return (
    <section
      id="contact"
      className="relative isolate overflow-hidden border-y border-line bg-cream/60"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 0%, rgba(204,120,92,0.18) 0%, rgba(204,120,92,0) 70%)",
        }}
      />
      <div className="mx-auto max-w-4xl px-6 py-28 text-center md:px-10 md:py-36">
        <div className="mb-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
          <span className="text-clay">✻</span> Let&apos;s build something
        </div>
        <h2 className="font-serif text-4xl md:text-6xl leading-tight tracking-tight">
          Have a problem worth <span className="italic text-clay">solving</span>?
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base md:text-lg text-graphite">
          I&apos;m open to internships, contract analytics work, and
          collaborations on AI-assisted tooling. The fastest way to reach me is
          email.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <a
            href="mailto:bbalcace@ramapo.edu"
            className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm text-cream hover:bg-clay transition-colors"
          >
            <Mail size={16} /> bbalcace@ramapo.edu
          </a>
          <a
            href="https://github.com/BrandonBalcacer"
            target="_blank"
            className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-paper px-6 py-3 text-sm hover:border-clay hover:text-clay transition-colors"
          >
            <Github size={16} /> GitHub
          </a>
          <a
            href="https://www.linkedin.com/"
            target="_blank"
            className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-paper px-6 py-3 text-sm hover:border-clay hover:text-clay transition-colors"
          >
            <Linkedin size={16} /> LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Footer                                                             */
/* ------------------------------------------------------------------ */

function Footer() {
  return (
    <footer className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-10 text-xs text-muted md:flex-row md:items-center md:justify-between md:px-10">
      <div className="flex items-center gap-2">
        <span className="grid h-6 w-6 place-items-center rounded-full bg-clay text-cream font-serif italic text-[11px]">
          B
        </span>
        <span>© {new Date().getFullYear()} Brandon Balcacer</span>
      </div>
      <div className="flex items-center gap-5">
        <span className="font-mono uppercase tracking-[0.22em]">
          Designed & built in Next.js
        </span>
      </div>
    </footer>
  );
}
