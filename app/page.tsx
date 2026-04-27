"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Mail,
  Github,
  Linkedin,
  Sparkles,
  MapPin,
  Plus,
  Minus,
  Activity,
  UtensilsCrossed,
  BookOpen,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const NAV = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const EMAIL = "balcacerrule@gmail.com";

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

type Project = {
  title: string;
  year: string;
  href: string;
  role: string;
  summary: string;
  tags: string[];
  problem: string;
  approach: string[];
  outcome: string;
  stack: string[];
};

const PROJECTS: Project[] = [
  {
    title: "B2B Lead Generator",
    year: "2026",
    href: "https://github.com/BrandonBalcacer",
    role: "End-to-end build",
    summary:
      "A 5-phase automated outreach pipeline for Archive Studio Marketing — sources, scores, and enriches B2B leads, then uses Claude to draft personalized emails with smart send-time scheduling.",
    tags: ["Python", "APIs", "Claude AI", "Automation"],
    problem:
      "Cold prospecting at Archive Studio was slow, manual, and inconsistent — leads were going out before they were qualified, and there was no audit trail of what was sent to whom or why.",
    approach: [
      "Phase 1 — Source: Pull businesses from Google Places by ICP filters (industry, geography, size).",
      "Phase 2 — Enrich: Use Firecrawl to crawl each site and Hunter.io to resolve decision-maker emails.",
      "Phase 3 — Score: Rank leads on fit and intent signals before any outreach goes out.",
      "Phase 4 — Generate: Claude drafts a personalized opener that references real copy from the lead's site.",
      "Phase 5 — Schedule: Smart send-time queue with per-domain throttling and warmup-aware pacing.",
    ],
    outcome:
      "Replaced ad-hoc prospecting with a single repeatable, traceable pipeline. Every email sent has a clear lineage from source query → enrichment → score → draft → send window.",
    stack: [
      "Python",
      "Google Places API",
      "Firecrawl",
      "Hunter.io",
      "Claude API",
      "SQLite",
    ],
  },
  {
    title: "Tasteful Sweets Dashboard",
    year: "2026",
    href: "https://github.com/BrandonBalcacer",
    role: "Production system",
    summary:
      "A live operations and analytics dashboard for an active bakery — ingests Shopify orders via HMAC-verified webhooks, reconciles recipe and expense data, and turns it into the decisions that keep the bakery profitable.",
    tags: ["Python", "Flask", "SQLite", "pandas"],
    problem:
      "An active bakery was running schedules, recipes, and margins out of memory — losing visibility on per-product profitability, weekly prep load, and which orders were actually paying for themselves.",
    approach: [
      "Built an HMAC-verified Shopify webhook receiver to ingest orders the moment they're placed.",
      "Normalized orders, recipes, and expenses into a single SQLite store the dashboard reads from.",
      "Reconciled recipe ingredients against expense data so cost-of-goods updates the moment prices change.",
      "Auto-generated weekly outputs: production schedule, shopping list, and per-product margin reports.",
    ],
    outcome:
      "A live system the bakery actually runs on — turning what was tribal knowledge into a dashboard the owner checks before placing orders or pricing new items.",
    stack: [
      "Python",
      "Flask",
      "SQLite",
      "pandas",
      "Shopify Webhooks (HMAC)",
      "AWS S3 / CloudFront",
    ],
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
      <About />
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
          data into <span className="italic text-clay">decisions</span>.
        </h1>

        <div className="mt-10 grid gap-10 md:grid-cols-12">
          <p className="md:col-span-7 text-lg md:text-xl leading-relaxed text-graphite max-w-2xl">
            I&apos;m{" "}
            <span className="text-ink font-medium">Brandon Balcacer</span> — a
            data analyst, builder, and former NCAA sprinter studying at Ramapo
            College of New Jersey. I design ETL pipelines, BI dashboards, and
            AI-assisted workflows that move teams from raw spreadsheets to
            clear, repeatable decisions.
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
/*  About                                                              */
/* ------------------------------------------------------------------ */

function About() {
  const beyond = [
    {
      icon: Activity,
      title: "Track & Field",
      body: "Former NCAA sprinter at Ramapo — NJAC Honorable Mention All-Conference in the 100m. Still chasing PRs.",
    },
    {
      icon: BookOpen,
      title: "Always Learning",
      body: "Currently going deep on AI-assisted data tooling, prompt design, and operations analytics.",
    },
    {
      icon: UtensilsCrossed,
      title: "Eats & Travel",
      body: "Big food guy — always hunting new restaurants, cuisines, and weird hole-in-the-wall finds.",
    },
  ];

  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-28 md:px-10 md:py-36">
      <SectionHeading
        index="01"
        eyebrow="About"
        title="A little more about me."
        lede="The short version: I like clean data, fast splits, and good food — usually in that order."
      />

      <div className="grid gap-10 md:grid-cols-12 md:gap-14">
        {/* Photos */}
        <div className="md:col-span-5">
          <div className="relative">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-line bg-sand shadow-card">
              <Image
                src="/brandon-mta.jpg"
                alt="Brandon at the MTA — Data Analytics Intern"
                fill
                sizes="(min-width: 768px) 40vw, 90vw"
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute -bottom-10 -right-4 hidden md:block w-2/3 rotate-2">
              <div className="relative aspect-square overflow-hidden rounded-2xl border border-line bg-sand shadow-card">
                <Image
                  src="/brandon-track.jpg"
                  alt="Brandon Balcacer — NJAC Honorable Mention All-Conference, 100m Dash, Ramapo"
                  fill
                  sizes="(min-width: 768px) 26vw, 60vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Mobile second photo */}
          <div className="mt-6 md:hidden relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-line bg-sand shadow-card">
            <Image
              src="/brandon-track.jpg"
              alt="Brandon Balcacer — NJAC Honorable Mention All-Conference, 100m Dash, Ramapo"
              fill
              sizes="90vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* Bio */}
        <div className="md:col-span-7 md:mt-2">
          <div className="space-y-5 text-[17px] leading-relaxed text-graphite">
            <p>
              Hi — I&apos;m Brandon. I&apos;m a junior at Ramapo College of New
              Jersey, currently a Data Analytics Intern at the MTA, where I get
              to turn the messy operational reality of running a transit system
              into dashboards and pipelines that people actually use.
            </p>
            <p>
              Before code, there was the track. I&apos;m a{" "}
              <span className="text-ink font-medium">
                former NCAA sprinter
              </span>{" "}
              at Ramapo and an{" "}
              <span className="text-ink font-medium">
                NJAC Honorable Mention All-Conference
              </span>{" "}
              athlete in the 100m dash. The same instincts the track gave me —
              repetition, race plans, splits — are the ones I bring to building
              data systems: get the inputs right, run the play, measure
              honestly, then go faster next time.
            </p>
            <p>
              Outside of work, you&apos;ll catch me running, lifting, chasing
              new PRs in the gym, or eating my way through a new cuisine. I
              love trying new restaurants, traveling, and generally being curious
              about how things — businesses, recipes, training plans, ML models
              — actually work under the hood.
            </p>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {beyond.map((b) => (
              <div
                key={b.title}
                className="rounded-2xl border border-line bg-paper p-5 shadow-soft"
              >
                <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-clay/10 text-clay">
                  <b.icon size={16} />
                </div>
                <h4 className="font-serif text-lg text-ink">{b.title}</h4>
                <p className="mt-1 text-sm text-muted">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
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
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="work"
      className="border-t border-line bg-cream/40"
    >
      <div className="mx-auto max-w-6xl px-6 py-28 md:px-10 md:py-36">
        <SectionHeading
          index="02"
          eyebrow="Selected Work"
          title="Projects that turn data into decisions."
          lede="Click any project to read the full story — the problem, my approach, the stack, and what shipped."
        />

        <div className="space-y-4">
          {PROJECTS.map((p, i) => (
            <ProjectCard
              key={p.title}
              project={p}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  isOpen,
  onToggle,
}: {
  project: Project;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={[
        "group rounded-2xl border bg-paper shadow-card transition-colors",
        isOpen ? "border-clay/40" : "border-line hover:border-clay/30",
      ].join(" ")}
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-start justify-between gap-6 px-6 py-6 text-left md:px-8 md:py-7"
      >
        <div className="flex-1">
          <div className="mb-3 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
            <span className="text-clay">{project.year}</span>
            <span className="h-px w-6 bg-rule" />
            <span>{project.role}</span>
          </div>
          <h3 className="font-serif text-2xl md:text-[32px] leading-tight text-ink">
            {project.title}
          </h3>
          <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-graphite">
            {project.summary}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-line bg-cream px-3 py-1 font-mono text-[11px] text-graphite"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <span
          className={[
            "mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-all",
            isOpen
              ? "bg-clay text-cream border-clay rotate-180"
              : "border-line text-graphite group-hover:border-clay group-hover:text-clay",
          ].join(" ")}
          aria-hidden
        >
          {isOpen ? <Minus size={16} /> : <Plus size={16} />}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-line px-6 py-7 md:px-8 md:py-8">
              <div className="grid gap-8 md:grid-cols-12">
                <div className="md:col-span-7 space-y-6">
                  <DetailBlock label="The problem" body={project.problem} />
                  <div>
                    <h4 className="mb-3 font-mono text-[11px] uppercase tracking-[0.22em] text-clay">
                      Approach
                    </h4>
                    <ul className="space-y-2">
                      {project.approach.map((step, i) => (
                        <li
                          key={i}
                          className="flex gap-3 text-[15px] leading-relaxed text-graphite"
                        >
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-clay" />
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <DetailBlock label="Outcome" body={project.outcome} />
                </div>

                <div className="md:col-span-5 space-y-6">
                  <div className="rounded-2xl border border-line bg-cream/60 p-5">
                    <h4 className="mb-3 font-mono text-[11px] uppercase tracking-[0.22em] text-clay">
                      Stack
                    </h4>
                    <ul className="flex flex-wrap gap-2">
                      {project.stack.map((s) => (
                        <li
                          key={s}
                          className="rounded-full border border-line bg-paper px-3 py-1 font-mono text-[12px] text-graphite"
                        >
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href={project.href}
                    target="_blank"
                    className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm text-cream hover:bg-clay transition-colors"
                  >
                    <Github size={16} />
                    View on GitHub
                    <ArrowUpRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DetailBlock({ label, body }: { label: string; body: string }) {
  return (
    <div>
      <h4 className="mb-3 font-mono text-[11px] uppercase tracking-[0.22em] text-clay">
        {label}
      </h4>
      <p className="text-[15px] leading-relaxed text-graphite">{body}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Experience                                                         */
/* ------------------------------------------------------------------ */

function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-6xl px-6 py-28 md:px-10 md:py-36">
      <SectionHeading
        index="03"
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
                <h3 className="mt-2 font-serif text-2xl text-ink">{e.role}</h3>
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
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Skills                                                             */
/* ------------------------------------------------------------------ */

function Skills() {
  return (
    <section
      id="skills"
      className="border-t border-line bg-cream/40"
    >
      <div className="mx-auto max-w-6xl px-6 py-28 md:px-10 md:py-36">
        <SectionHeading
          index="04"
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
            href={`mailto:${EMAIL}`}
            className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm text-cream hover:bg-clay transition-colors"
          >
            <Mail size={16} /> {EMAIL}
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
