"use client";

import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Mail,
  Github,
  Linkedin,
  ChevronDown,
  ArrowRight,
} from "lucide-react";

const HeroScene = dynamic(() => import("./components/HeroScene"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-bg" />,
});

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const NAV = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

const EXPERIENCE = [
  {
    period: "2026 — Present",
    role: "Data Analytics Intern",
    org: "Metropolitan Transportation Authority",
    body: "Engineered Python and SQL ETL workflows to clean and standardize 1,600+ operational records, and shipped Power BI dashboards tracking material usage, fulfillment rates, and project KPIs. Automated manual memorandum and paper tracking with Power Automate, Power Apps, and SharePoint, and applied generative AI to accelerate data cleaning and surface structured insights from raw operational data.",
    tags: ["Python", "SQL", "Power BI", "Generative AI"],
  },
  {
    period: "2022 — Present",
    role: "Team Member",
    org: "Target",
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
    details: {
      problem:
        "Archive Studio Marketing needed a repeatable way to source and warm B2B leads without burning hours on manual prospecting.",
      approach: [
        "Phase 1 — source leads via Google Places API filtered by industry, geography, and rating.",
        "Phase 2 — enrich with Firecrawl site scraping and Hunter.io verified emails.",
        "Phase 3 — score leads on signal density: tech stack, hiring activity, recency.",
        "Phase 4 — Claude drafts personalized outreach grounded in scraped context.",
        "Phase 5 — smart send-time scheduling per timezone with throttling.",
      ],
      impact:
        "Turned a manual, ad-hoc workflow into a single command that produces ranked, ready-to-send sequences.",
    },
  },
  {
    title: "Tasteful Sweets Dashboard",
    year: "2026",
    href: "https://github.com/BrandonBalcacer",
    description:
      "An end-to-end operations and analytics dashboard running live for an active bakery business. Ingests Shopify orders via HMAC-verified webhooks, reconciles recipe and expense data in SQLite, and auto-generates weekly production schedules, shopping lists, and per-product profit margin reports — turning raw order data into the decisions that keep the bakery profitable.",
    role: "Production system",
    tags: ["Python", "Flask", "SQLite", "pandas"],
    details: {
      problem:
        "An active bakery needed visibility on margins, schedules, and shopping lists — straight from raw Shopify orders.",
      approach: [
        "HMAC-verified Shopify webhooks ingest live orders into SQLite.",
        "Recipe and expense tables let pandas reconcile per-product cost.",
        "Auto-generates weekly production schedules and shopping lists.",
        "Outputs profit-margin reports per SKU to drive pricing decisions.",
      ],
      impact:
        "What to bake, what to buy, and what to reprice are now decided by yesterday's orders, not gut feel.",
    },
  },
];

const SKILLS = [
  {
    group: "Languages & Data",
    items: ["Python", "pandas", "openpyxl", "SQL", "DAX", "PowerFx", "JavaScript", "HTML / CSS"],
  },
  {
    group: "Analytics & BI",
    items: ["Power BI", "Tableau", "Power Apps", "Power Automate", "SharePoint", "ETL Pipelines", "Statistical Analysis"],
  },
  {
    group: "Backend & Cloud",
    items: ["SQLite", "Flask", "REST APIs", "Webhooks (HMAC)", "AWS S3", "CloudFront", "IAM", "Git"],
  },
  {
    group: "AI & Tooling",
    items: ["Generative AI", "Prompt Engineering", "Claude API", "Workflow Automation"],
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
    <main className="relative min-h-screen bg-bg text-ink">
      <Nav scrolled={scrolled} />
      <Hero />
      <About />
      <Experience />
      <Work />
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
          ? "bg-bg/80 backdrop-blur-md border-b border-line"
          : "bg-transparent border-b border-transparent",
      ].join(" ")}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">
        <a href="#top" className="group inline-flex items-center gap-2">
          <span className="font-sans font-semibold text-ink tracking-tight">BB</span>
        </a>
        <nav className="hidden items-center gap-9 text-[13px] text-graphite md:flex">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="link-under hover:text-ink transition-colors">
              {n.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="hidden md:inline-flex items-center gap-2 rounded-full border border-rule bg-elevated/60 px-4 py-2 text-[13px] text-ink backdrop-blur hover:border-accent hover:text-accent transition-colors"
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
      className="relative isolate min-h-screen overflow-hidden bg-bg"
    >
      {/* Right-side 3D scene */}
      <div className="absolute inset-0 md:left-[40%]">
        <HeroScene />
      </div>

      {/* Subtle radial darkening on the left so text reads cleanly over the canvas */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 70% at 20% 50%, rgba(5,5,5,0.85) 0%, rgba(5,5,5,0.55) 45%, rgba(5,5,5,0) 75%)",
        }}
      />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 pt-32 pb-20 md:px-10">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="eyebrow"
        >
          Data Analyst & Builder
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-2xl font-sans text-[clamp(2.5rem,6vw,5.25rem)] font-semibold leading-[1.02] tracking-[-0.02em] text-ink"
        >
          Need a Solution?
          <br />
          I&apos;m the answer.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 max-w-md text-[15px] leading-relaxed text-graphite"
        >
          I build and ship data systems that power reliable, real-world
          applications and data products — ETL pipelines, BI dashboards, and
          AI-assisted automations.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10"
        >
          <a
            href="#work"
            className="group inline-flex items-center gap-4 text-[14px] text-ink"
          >
            <span className="link-under">Explore My Work</span>
            <span className="grid h-9 w-9 place-items-center rounded-full border border-rule transition-colors group-hover:border-accent group-hover:text-accent">
              <ArrowUpRight size={14} />
            </span>
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 right-10 hidden flex-col items-center gap-3 text-[10px] uppercase tracking-[0.32em] text-muted md:flex">
          <span>Scroll</span>
          <span className="h-10 w-px bg-rule" />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section primitives                                                 */
/* ------------------------------------------------------------------ */

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
}) {
  return (
    <Reveal className="mb-16 max-w-3xl">
      <p className="eyebrow mb-5">{eyebrow}</p>
      <h2 className="font-sans text-3xl md:text-5xl font-semibold leading-[1.05] tracking-[-0.02em] text-ink">
        {title}
      </h2>
      {lede && (
        <p className="mt-5 max-w-2xl text-[15px] md:text-base leading-relaxed text-graphite">
          {lede}
        </p>
      )}
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/*  About                                                              */
/* ------------------------------------------------------------------ */

function About() {
  return (
    <section id="about" className="relative border-t border-line bg-bg">
      <div className="mx-auto max-w-7xl px-6 py-28 md:px-10 md:py-36">
        <SectionHeading
          eyebrow="About"
          title="Analyst, builder, and the occasional sprinter."
          lede="I work with data, ship pragmatic tools, and try to keep a little of everything else outside the screen."
        />

        <div className="grid gap-10 md:grid-cols-12 md:gap-12">
          <Reveal delay={0.1} className="space-y-5 text-[15px] md:text-base leading-relaxed text-graphite md:col-span-7">
            <p>
              I&apos;m a data analyst and builder studying at Ramapo College of
              New Jersey. My work focuses on turning messy operational data —
              spreadsheets, tangled APIs, unstructured records — into clean ETL
              pipelines, BI dashboards, and AI-assisted automations that teams
              can actually run on.
            </p>
            <p>
              At the MTA I&apos;m engineering Python and SQL workflows that
              standardize 1,600+ operational records, building Power BI
              dashboards on top of them, and automating manual paperwork with
              Power Automate, Power Apps, and SharePoint.
            </p>
            <p>
              Outside of work I&apos;m a former NCAA track &amp; field athlete
              at Ramapo (NJAC Honorable Mention All-Conference, 100m dash). I
              still run and lift almost daily, and I spend a lot of weekends
              trying new restaurants around NJ and NYC.
            </p>
          </Reveal>

          <Reveal delay={0.2} className="grid grid-cols-2 gap-4 md:col-span-5">
            <figure className="overflow-hidden rounded-2xl border border-line bg-elevated">
              <div className="relative aspect-square">
                <Image
                  src="/track.jpg"
                  alt="Brandon Balcacer — NJAC Honorable Mention All-Conference, 100m Dash."
                  fill
                  sizes="(max-width: 768px) 50vw, 22vw"
                  className="object-cover opacity-95"
                />
              </div>
            </figure>
            <figure className="overflow-hidden rounded-2xl border border-line bg-elevated md:translate-y-8">
              <div className="relative aspect-[3/4]">
                <Image
                  src="/mta.jpg"
                  alt="Brandon at the MTA New York City Transit office during his Data Analytics Internship."
                  fill
                  sizes="(max-width: 768px) 50vw, 22vw"
                  className="object-cover opacity-95"
                />
              </div>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Experience  (template-2 style: date | role+org | arrow)           */
/* ------------------------------------------------------------------ */

function Experience() {
  return (
    <section id="experience" className="border-t border-line bg-bg">
      <div className="mx-auto max-w-7xl px-6 py-28 md:px-10 md:py-36">
        <SectionHeading
          eyebrow="Experience"
          title="Where I've shipped real work."
          lede="A mix of analytics, automation, and operations — bringing structure to messy data and messy systems."
        />

        <div>
          {EXPERIENCE.map((e, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <article className="group grid grid-cols-12 items-start gap-6 border-t border-line py-8 md:py-10">
                <div className="col-span-12 md:col-span-3">
                  <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-accent">
                    {e.period}
                  </p>
                </div>

                <div className="col-span-12 md:col-span-8">
                  <h3 className="font-sans text-2xl md:text-3xl font-medium tracking-tight text-ink">
                    {e.role}
                  </h3>
                  <p className="mt-1 text-[14px] text-graphite">{e.org}</p>
                  <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-graphite">
                    {e.body}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {e.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-line bg-elevated px-3 py-1 font-mono text-[11px] text-graphite"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="col-span-12 md:col-span-1 md:justify-self-end">
                  <button
                    type="button"
                    aria-label={`More about ${e.role}`}
                    className="grid h-10 w-10 place-items-center rounded-full border border-rule text-graphite transition-colors group-hover:border-accent group-hover:text-accent"
                  >
                    <ArrowUpRight size={16} />
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
          <div className="border-t border-line" />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Work                                                               */
/* ------------------------------------------------------------------ */

function Work() {
  return (
    <section id="work" className="border-t border-line bg-bg">
      <div className="mx-auto max-w-7xl px-6 py-28 md:px-10 md:py-36">
        <SectionHeading
          eyebrow="Selected Work"
          title="Projects that turn data into decisions."
          lede="A small set of recent builds — production systems, AI-assisted pipelines, and analytics surfaces."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {PROJECTS.map((p) => (
            <ProjectCard key={p.title} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: (typeof PROJECTS)[number] }) {
  const [open, setOpen] = useState(false);
  return (
    <article
      className={[
        "group relative flex flex-col overflow-hidden rounded-2xl border bg-elevated p-7 transition-all",
        open
          ? "border-accent/40"
          : "border-line hover:-translate-y-0.5 hover:border-accent/40",
      ].join(" ")}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accentSoft/30 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
      />

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full flex-col items-start text-left"
      >
        <div className="mb-5 flex w-full items-center justify-between font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
          <span>{project.role}</span>
          <span>{project.year}</span>
        </div>
        <h3 className="font-sans text-2xl md:text-[26px] font-medium leading-tight text-ink">
          {project.title}
          <ChevronDown
            size={20}
            className={[
              "ml-2 inline-block -translate-y-0.5 text-accent transition-transform duration-300",
              open ? "rotate-180" : "",
            ].join(" ")}
          />
        </h3>
        <p className="mt-4 text-[15px] leading-relaxed text-graphite">
          {project.description}
        </p>
        <span className="mt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-accent">
          {open ? "Hide details" : "Click to expand"}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="details"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.65, 0, 0.35, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-6 space-y-5 border-t border-line pt-6">
              <div>
                <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.25em] text-accent">
                  Problem
                </div>
                <p className="text-[15px] leading-relaxed text-graphite">
                  {project.details.problem}
                </p>
              </div>
              <div>
                <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.25em] text-accent">
                  Approach
                </div>
                <ul className="space-y-2 text-[15px] leading-relaxed text-graphite">
                  {project.details.approach.map((step, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-accent" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.25em] text-accent">
                  Impact
                </div>
                <p className="text-[15px] leading-relaxed text-graphite">
                  {project.details.impact}
                </p>
              </div>
              <Link
                href={project.href}
                target="_blank"
                className="inline-flex items-center gap-2 rounded-full border border-rule bg-bg px-4 py-2 text-sm hover:border-accent hover:text-accent transition-colors"
              >
                <Github size={14} /> View on GitHub <ArrowUpRight size={14} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.tags.map((t) => (
          <span
            key={t}
            className="rounded-full border border-line bg-bg px-3 py-1 font-mono text-[11px] text-graphite"
          >
            {t}
          </span>
        ))}
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/*  Skills                                                             */
/* ------------------------------------------------------------------ */

function Skills() {
  return (
    <section id="skills" className="border-t border-line bg-bg">
      <div className="mx-auto max-w-7xl px-6 py-28 md:px-10 md:py-36">
        <SectionHeading
          eyebrow="Toolkit"
          title="What I reach for."
          lede="The stack I use to move from question, to data, to decision."
        />

        <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2">
          {SKILLS.map((s) => (
            <div key={s.group} className="bg-elevated p-7 md:p-8">
              <h3 className="font-sans text-lg font-medium text-ink">
                {s.group}
              </h3>
              <ul className="mt-5 flex flex-wrap gap-2">
                {s.items.map((it) => (
                  <li
                    key={it}
                    className="rounded-full border border-line bg-bg px-3 py-1.5 font-mono text-[12px] text-graphite transition-colors hover:border-accent hover:text-accent"
                  >
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
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
      className="relative isolate overflow-hidden border-t border-line bg-bg"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(50% 60% at 50% 0%, rgba(59,130,246,0.18) 0%, rgba(59,130,246,0) 70%)",
        }}
      />
      <div className="mx-auto max-w-4xl px-6 py-28 text-center md:px-10 md:py-36">
        <p className="eyebrow">Let&apos;s build something</p>
        <h2 className="mt-5 font-sans text-4xl md:text-6xl font-semibold leading-tight tracking-[-0.02em]">
          Have a problem worth{" "}
          <span className="text-accent">solving</span>?
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-[15px] md:text-base leading-relaxed text-graphite">
          I&apos;m open to internships, contract analytics work, and
          collaborations on AI-assisted tooling. The fastest way to reach me is
          email.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <a
            href="mailto:balcacerrule@gmail.com"
            className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm text-bg hover:bg-accent hover:text-ink transition-colors"
          >
            <Mail size={16} /> balcacerrule@gmail.com
          </a>
          <a
            href="https://github.com/BrandonBalcacer"
            target="_blank"
            className="inline-flex items-center gap-2 rounded-full border border-rule bg-elevated px-6 py-3 text-sm hover:border-accent hover:text-accent transition-colors"
          >
            <Github size={16} /> GitHub
          </a>
          <a
            href="https://www.linkedin.com/"
            target="_blank"
            className="inline-flex items-center gap-2 rounded-full border border-rule bg-elevated px-6 py-3 text-sm hover:border-accent hover:text-accent transition-colors"
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
    <footer className="border-t border-line bg-bg">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-10 text-xs text-muted md:flex-row md:items-center md:justify-between md:px-10">
        <div className="flex items-center gap-2">
          <span className="grid h-6 w-6 place-items-center rounded-full bg-accent text-bg font-sans font-semibold text-[11px]">
            B
          </span>
          <span>© {new Date().getFullYear()} Brandon Balcacer</span>
        </div>
        <div className="flex items-center gap-5">
          <span className="font-mono uppercase tracking-[0.22em]">
            Designed &amp; built in Next.js
          </span>
        </div>
      </div>
    </footer>
  );
}
