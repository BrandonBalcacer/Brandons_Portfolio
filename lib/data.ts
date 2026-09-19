export const profile = {
  name: "Brandon Balcacer",
  handle: "brandon",
  host: "portfolio",
  role: "Digital Data Analyst · Data Engineer",
  location: "Hackensack, NJ",
  phone: "(609) 401-8703",
  email: "Balcacerrule@gmail.com",
  status: "Digital Data Analyst @ Versant Media, CNBC",
  bio: "Information Technology Management student at Ramapo College of New Jersey and Digital Data Analyst supporting CNBC at Versant Media. I build analytics systems, data pipelines, decision tools, and AI-assisted products, with experience spanning media, rail operations, and client software.",
};

export type Experience = {
  role: string;
  company: string;
  team: string;
  location: string;
  period: string;
  bullets: string[];
};

export const experience: Experience[] = [
  {
    role: "Digital Data Analyst",
    company: "Versant Media",
    team: "CNBC",
    location: "Remote / Englewood Cliffs",
    period: "Sep 2026 – Apr 2027",
    bullets: [
      "Building and maintaining KPI dashboards and recurring reporting in Adobe Analytics and Domo, including QA support for the migration to Omni.",
      "Validating tracking implementation and event data accuracy across CNBC.com, CNBC Pro, and Investing Club.",
      "Supporting experimentation measurement and audience and funnel analysis.",
      "Ramping into SQL and Databricks for data-layer and pipeline work.",
    ],
  },
  {
    role: "MSP Lab Technician, Data Engineer",
    company: "Samsung SDS America",
    team: "MSP Lab",
    location: "Ridgefield Park, NJ",
    period: "Jun – Aug 2026",
    bullets: [
      "Built a predictive maintenance system with two interns, unifying sensor data, maintenance history, alerts, and work orders across five rail subsystems to replace per-system tracking.",
      "Engineered the Docker Compose platform: Python ETL landed 1.15M feature windows through a MinIO and PostgreSQL 16 medallion pipeline from three vetted datasets; four of seven candidate datasets were rejected.",
      "Built the detection layer with FFT and 2σ/3σ process-control gating XGBoost at 0.999 PR AUC and 0.99 recall with TreeSHAP; caught all nine seeded faults and flagged an air leak 14 hours early.",
      "Owned the design specification and operator dashboard, including six role-filtered views, alert playbooks, work-order ticketing, and deterministic reports over an LLM layer; presented the system to leadership.",
    ],
  },
  {
    role: "Data Analytics Intern",
    company: "Metropolitan Transportation Authority",
    team: "Elevators & Escalators",
    location: "Brooklyn, NY",
    period: "Jan – May 2026",
    bullets: [
      "Built a Python regex pipeline that auto-classifies entrapment report fields, validated against a labeled corpus, replacing manual Excel review.",
      "Developed a Power BI executive report on equipment availability across six zones in DAX and Power Query M; fixed a fan-out bug inflating metrics 20x with a SUMX over DISTINCTCOUNT pattern.",
      "Designed a 12-month demand forecast projecting $36M+ across 380K+ units at a 91.35% fulfillment KPI; co-built a document-signing app in Power Apps and Power Automate on SharePoint.",
    ],
  },
  {
    role: "Founding Engineer",
    company: "Archive Studios",
    team: "Product & Client Engineering",
    location: "Hackensack, NJ",
    period: "2025 – Present",
    bullets: [
      "Lead engineering for client sites on Railway and Vercel, implement technical SEO and schema markup, and build custom front-end components inside client Squarespace sites.",
      "Shipped an internal CRM in Next.js, TypeScript, and Supabase with an eight-stage lead pipeline, client 360 views, token-gated proposals and invoices, and a 14-migration PostgreSQL schema.",
    ],
  },
];

export type Project = {
  name: string;
  tagline: string;
  context: string;
  bullets: string[];
  stack: string[];
  links: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    name: "Roam",
    tagline: "Travel Discovery Engine",
    context: "1st Place · Checkout NYC Hackathon",
    bullets: [
      "Won New York City's first travel and hospitality hackathon by building the backend in one day: 36 PostgreSQL functions called from the browser through PostgREST, with no application server and row-level security across 16 tables.",
      "Used one SQL expression for each card's score and user-facing reason so the two cannot drift; a PostGIS planner groups each day by neighborhood and exposes eight itinerary actions to a Claude agent.",
    ],
    stack: ["PostgreSQL", "Supabase", "PostGIS", "Claude API"],
    links: [
      { label: "Live", href: "https://roam-psi-one.vercel.app" },
      { label: "GitHub", href: "https://github.com/BrandonBalcacer/roam" },
    ],
  },
  {
    name: "Bakelytics",
    tagline: "Multi-tenant Bakery Analytics SaaS",
    context: "Production SaaS",
    bullets: [
      "Productized a single-tenant bakery dashboard into multi-tenant SaaS: one deployment serves every bakery, isolated by tenant ID, with self-serve onboarding through single-use invite links.",
      "Built the Flask and PostgreSQL backend across 13 migrations, including Shopify order sync, recipe scaling on live prices, cost and margin reporting, bcrypt authentication, and encrypted tenant secrets.",
    ],
    stack: ["Flask", "PostgreSQL", "Shopify API", "Railway"],
    links: [{ label: "Live", href: "https://bakelytics.com" }],
  },
];

export type SkillGroup = {
  label: string;
  items: string[];
};

export const skills: SkillGroup[] = [
  {
    label: "Languages",
    items: [
      "Python",
      "SQL",
      "JavaScript",
      "TypeScript",
      "DAX",
      "PowerFx",
      "Power Query M",
      "HTML/CSS",
    ],
  },
  {
    label: "Data & ML",
    items: [
      "pandas",
      "NumPy",
      "XGBoost",
      "TreeSHAP",
      "Anomaly Detection",
      "Signal Processing (FFT)",
      "Statistical Process Control",
      "Power BI",
      "Excel",
      "ETL Pipeline Design",
    ],
  },
  {
    label: "Cloud & Backend",
    items: [
      "Docker",
      "MinIO",
      "PostgreSQL / Supabase",
      "PostGIS",
      "Flask",
      "FastAPI",
      "Streamlit",
      "AWS (S3, ECS Fargate)",
      "Railway",
      "REST APIs",
      "Git",
      "Claude API",
      "Agentic Workflows",
    ],
  },
];

export const education = {
  school: "Ramapo College of New Jersey",
  period: "Sept 2023 – Dec 2026",
  degree: "B.S. Information Technology Management",
  coursework:
    "Relevant coursework in data management systems, system analysis and design, AI for business, and corporate finance.",
};

export const honors = [
  "Dean's List, Fall 2024",
  "Track & Field Captain, Ramapo College",
  "2× All-NJAC Honoree & USTFCCCA Metro All-Region Sprinter",
];

export const socials = [
  { label: "Website", href: "https://brandonbalcacer.dev" },
  { label: "GitHub", href: "https://github.com/BrandonBalcacer" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/balcacer/" },
  { label: "Email", href: "mailto:Balcacerrule@gmail.com" },
];
