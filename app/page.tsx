"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Mail,
  Github,
  Linkedin,
  Sparkles,
  ChevronDown,
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
    role: "Production system",
    summary:
      "A live operations and analytics dashboard for an active bakery — ingests Shopify orders via HMAC-verified webhooks, reconciles recipe and expense data, and turns it into the decisions that keep the bakery profitable.",
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
      {/* soft transition zone — blue dissolves into white */}
      <div
        aria-hidden
        className="relative h-32 w-full -mt-32 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.6) 55%, #ffffff 100%)",
        }}
      />
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
  const onLight = scrolled;
  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        onLight
          ? "bg-paper/85 backdrop-blur border-b border-line"
          : "bg-transparent border-b border-transparent",
      ].join(" ")}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10">
        <a href="#top" className="flex items-center gap-2 group">
          <span
            className={[
              "font-serif text-base transition-colors",
              onLight ? "text-ink group-hover:text-graphite" : "text-paper",
            ].join(" ")}
          >
            Brandon Balcacer
          </span>
        </a>
        <nav
          className={[
            "hidden md:flex items-center gap-8 text-sm transition-colors",
            onLight ? "text-graphite" : "text-paper/90",
          ].join(" ")}
        >
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="link-under">
              {n.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className={[
            "hidden md:inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-colors",
            onLight
              ? "border border-ink/15 bg-paper text-ink hover:border-ink"
              : "border border-paper/40 bg-paper/10 text-paper backdrop-blur hover:bg-paper/20",
          ].join(" ")}
        >
          Get in touch
          <ArrowUpRight size={14} />
        </a>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/*  Ocean — flowing blue silk background that reacts to the cursor     */
/* ------------------------------------------------------------------ */

function Ocean() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // target = where the cursor wants the warp center to be (0..1)
    // current = lerped value so motion is calm/dampened
    let tx = 0.5;
    let ty = 0.4;
    let cx = 0.5;
    let cy = 0.4;
    let t = 0;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX / window.innerWidth;
      ty = e.clientY / window.innerHeight;
    };

    const loop = () => {
      // soft lerp — small factor = slower, more calm
      cx += (tx - cx) * 0.035;
      cy += (ty - cy) * 0.035;
      t += 0.0035;

      // ambient orbiting blobs (so it's never still even without a cursor)
      const ax = 30 + Math.sin(t * 1.1) * 22;
      const ay = 35 + Math.cos(t * 0.8) * 20;
      const bx = 70 + Math.cos(t * 0.7) * 24;
      const by = 70 + Math.sin(t * 1.0) * 22;

      el.style.setProperty("--mx", `${cx * 100}%`);
      el.style.setProperty("--my", `${cy * 100}%`);
      el.style.setProperty("--ax", `${ax}%`);
      el.style.setProperty("--ay", `${ay}%`);
      el.style.setProperty("--bx", `${bx}%`);
      el.style.setProperty("--by", `${by}%`);

      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      {/* core silk layer — blurred orbiting radial gradients */}
      <div
        ref={ref}
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(40% 35% at var(--mx, 50%) var(--my, 40%), rgba(140,170,255,0.95) 0%, transparent 60%),
            radial-gradient(45% 45% at var(--ax, 30%) var(--ay, 35%), rgba(60,100,255,0.9) 0%, transparent 65%),
            radial-gradient(55% 50% at var(--bx, 70%) var(--by, 70%), rgba(20,50,200,0.95) 0%, transparent 70%),
            linear-gradient(135deg, #0a1ec0 0%, #1c3df0 45%, #3a5cff 100%)
          `,
          filter: "blur(70px) saturate(1.15)",
          animation: "oceanDrift 22s ease-in-out infinite",
          willChange: "transform",
        }}
      />
      {/* soft diagonal sheen pass */}
      <div
        className="pointer-events-none absolute inset-0 mix-blend-screen"
        style={{
          background:
            "linear-gradient(115deg, transparent 35%, rgba(255,255,255,0.45) 50%, transparent 65%)",
          animation: "sheen 16s ease-in-out infinite",
          willChange: "transform, opacity",
        }}
      />
      {/* very faint grain to break up banding */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "3px 3px",
        }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */

function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-screen items-center justify-center overflow-hidden text-paper"
    >
      <Ocean />

      {/* top kicker */}
      <div className="absolute top-28 left-1/2 -translate-x-1/2 px-6 text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-paper/85">
          Brandon Balcacer · Portfolio · 2026
        </p>
      </div>

      {/* centered headline */}
      <h1 className="relative z-10 px-6 text-center font-serif text-[clamp(2.75rem,8vw,7.5rem)] leading-[1.05] tracking-[-0.01em] text-paper">
        <span className="italic">Transforming</span> Data,
        <br />
        Building <span className="italic">Decisions</span>
      </h1>

      {/* bottom descriptor */}
      <p className="absolute bottom-12 left-1/2 w-full max-w-2xl -translate-x-1/2 px-6 text-center text-sm md:text-base text-paper/85">
        A New Jersey&ndash;based data analyst &amp; builder shipping ETL
        pipelines, BI dashboards, and AI-assisted automations.
      </p>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  About                                                              */
/* ------------------------------------------------------------------ */

function About() {
  return (
    <section id="about" className="relative border-b border-line bg-paper">
      <div className="mx-auto max-w-7xl px-6 py-28 md:px-10 md:py-36">
        <SectionHeading
          index="01"
          eyebrow="About"
          title="Analyst, builder, and the occasional sprinter."
          lede="I work with data, ship pragmatic tools, and try to keep a little of everything else outside the screen."
        />

        <div className="grid gap-10 md:grid-cols-12 md:gap-12">
          <Reveal delay={0.1} className="md:col-span-7 space-y-5 text-base md:text-lg leading-relaxed text-graphite">
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

          <Reveal delay={0.2} className="md:col-span-5 grid grid-cols-2 gap-4">
            <figure className="overflow-hidden rounded-2xl border border-line bg-paper">
              <div className="relative aspect-square">
                <Image
                  src="/track.jpg"
                  alt="Brandon Balcacer — NJAC Honorable Mention All-Conference, 100m Dash."
                  fill
                  sizes="(max-width: 768px) 50vw, 22vw"
                  className="object-cover"
                />
              </div>
            </figure>
            <figure className="overflow-hidden rounded-2xl border border-line bg-paper md:translate-y-8">
              <div className="relative aspect-[3/4]">
                <Image
                  src="/mta.jpg"
                  alt="Brandon at the MTA New York City Transit office during his Data Analytics Internship."
                  fill
                  sizes="(max-width: 768px) 50vw, 22vw"
                  className="object-cover"
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
/*  Section heading                                                    */
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
      initial={{ opacity: 0, y: 28, clipPath: "inset(0 0 100% 0)" }}
      whileInView={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.9,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

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
    <Reveal className="mb-14 max-w-3xl">
      <div className="mb-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
        <span className="text-ink">{index}</span>
        <span className="h-px w-10 bg-rule" />
        {eyebrow}
      </div>
      <h2 className="font-sans font-semibold text-4xl md:text-6xl leading-[1.02] tracking-[-0.02em] text-ink">
        {title}
      </h2>
      {lede && (
        <p className="mt-5 max-w-2xl text-base md:text-lg text-graphite">
          {lede}
        </p>
      )}
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/*  Work                                                               */
/* ------------------------------------------------------------------ */

function Work() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="work" className="mx-auto max-w-6xl px-6 py-28 md:px-10 md:py-36">
      <SectionHeading
        index="02"
        eyebrow="Selected Work"
        title="Projects that turn data into decisions."
        lede="A small set of recent builds — production systems, AI-assisted pipelines, and analytics surfaces."
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
  const [open, setOpen] = useState(false);
  return (
    <article
      className={[
        "group relative flex flex-col overflow-hidden rounded-2xl border bg-paper p-7 shadow-card transition-all",
        open ? "border-clay/40" : "border-line hover:-translate-y-0.5 hover:border-clay/40",
      ].join(" ")}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-clayLight/40 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
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
        <h3 className="font-serif text-2xl md:text-[28px] leading-tight text-ink">
          {project.title}
          <ChevronDown
            size={20}
            className={[
              "ml-2 inline-block -translate-y-0.5 text-clay transition-transform duration-300",
              open ? "rotate-180" : "",
            ].join(" ")}
          />
        </h3>
        <p className="mt-4 text-[15px] leading-relaxed text-graphite">
          {project.description}
        </p>
        <span className="mt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-clay">
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
                <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.25em] text-clay">
                  Problem
                </div>
                <p className="text-[15px] leading-relaxed text-graphite">
                  {project.details.problem}
                </p>
              </div>
              <div>
                <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.25em] text-clay">
                  Approach
                </div>
                <ul className="space-y-2 text-[15px] leading-relaxed text-graphite">
                  {project.details.approach.map((step, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-clay" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.25em] text-clay">
                  Impact
                </div>
                <p className="text-[15px] leading-relaxed text-graphite">
                  {project.details.impact}
                </p>
              </div>
              <Link
                href={project.href}
                target="_blank"
                className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-paper px-4 py-2 text-sm hover:border-clay hover:text-clay transition-colors"
              >
                <Github size={14} /> View on GitHub <ArrowUpRight size={14} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
            {t}
          </span>
        ))}
      </div>
    </article>
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
    <section id="skills" className="mx-auto max-w-6xl px-6 py-28 md:px-10 md:py-36">
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
            "radial-gradient(50% 50% at 50% 0%, rgba(31,61,236,0.16) 0%, rgba(31,61,236,0) 70%)",
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
            href="mailto:balcacerrule@gmail.com"
            className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm text-cream hover:bg-clay transition-colors"
          >
            <Mail size={16} /> balcacerrule@gmail.com
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
