export const profile = {
  name: "Brandon Balcacer",
  handle: "brandon",
  host: "portfolio",
  role: "Digital Data Analyst · Data Engineer · Founder, Simargi Systems",
  location: "Hackensack, NJ",
  phone: "(609) 401-8703",
  email: "Balcacerrule@gmail.com",
  status: "Digital Data Analyst Intern @ Versant Media, CNBC",
  bio: "I’m an Information Technology Management student at Ramapo College of New Jersey, a Digital Data Analyst Intern supporting CNBC at Versant Media, and the founder of Simargi Systems.\n\nI enjoy building and shipping AI-assisted systems and meaningful software that solves real problems. My expertise is working with and analyzing data, with experience in media, transportation, and website analytics.\n\nI’m an aspiring technological comprehensivist. I love learning how the whole stack fits together, from CPUs, GPUs, and hardware to software, data centers, cloud computing, AI, and machine learning. I’m also interested in finance and AI trade.",
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
    role: "Digital Data Analyst Intern",
    company: "Versant Media",
    team: "CNBC",
    location: "Remote / Englewood Cliffs",
    period: "Sep 2026 – Apr 2027",
    bullets: [
      "Automated a manual weekly Airship report with Power Automate, Outlook, and SharePoint (CSV extraction from ZIP files); validated the first unattended run end to end: 272 notification IDs, with no lost or duplicate rows.",
      "Built a Python/PySpark page-view monitoring prototype in Databricks that reconciles silver and gold layers across desktop and mobile; backtested mean and median baselines over 56 platform-days to set alert thresholds.",
      "Analyzed 75 earnings push notifications in Airship, comparing direct, indirect, and total response rates by company, audience, and send time; built filtered Excel reporting with recommendations for stakeholders.",
      "Prepared six months of Adobe Analytics audience metrics and top-100 page rankings for comScore validation.",
      "Flagged reused Airship campaign titles that mislabeled push content, preventing misclassified reporting.",
    ],
  },
  {
    role: "Founder",
    company: "Simargi Systems LLC",
    team: "Industry-specific workflow software",
    location: "New Jersey",
    period: "Jul 2026 – Present",
    bullets: [
      "Founded Simargi Systems to build workflow software for small businesses in specific industries, with a human approval step in every agent-assisted workflow; built the company site at simargisystems.com in Next.js, TypeScript, and Zod.",
      "Built Stratos, a multi-tenant property research platform for North Jersey realtors that ranks every structure on a street using parcel data, a two-model vision ensemble, and public records.",
      "Building a real estate CRM agent with a lead inbox, escalation queue, and human review controls. The team is moving to PLACE; agent replies are being evaluated in shadow mode while customer sends stay locked.",
      "Brought Bakelytics, a multi-tenant bakery analytics SaaS, under Simargi as its bakery operations product, now in pilot.",
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
      "Shipped the studio's internal CRM in Next.js, TypeScript, and Supabase: an eight-stage lead pipeline, client 360 views, token-gated proposals and invoices, Stripe payment webhooks, and two-way Google Calendar sync over a 22-migration PostgreSQL schema.",
      "Built the public site's serverless backend on Vercel: enquiry forms that create CRM leads through a fail-closed, secret-authenticated webhook, call booking onto the studio calendar, Stripe subscriptions with plan changes, and project billing that takes a deposit and charges the balance automatically.",
      "Built an agentic outbound engine that finds and scores local businesses, drafts outreach with Claude, and runs daily on GitHub Actions into a Firestore-backed team dashboard.",
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
      "Designed a 12-month demand forecast projecting $36M+ across 380K+ units at a 91.35% fulfillment KPI.",
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
    name: "Stratos",
    tagline: "Property Research Platform for Realtors",
    context: "Simargi Systems · In development",
    bullets: [
      "Turns a street and municipality into a ranked research queue: enumerates every structure from New Jersey's statewide parcel data, scores roof, siding, windows, and yard from Street View and aerial imagery with an OpenAI and Claude vision ensemble, and blends in public-record signals.",
      "Enforces the rules in code rather than prompts: model disagreement goes to human review, visibly distressed homes are never auto-discarded, scoring uses only physical and public-record facts to stay within fair-housing rules, and no raw imagery is ever stored.",
      "Runs as a FastAPI service and installable PWA on Railway (Docker, PostgreSQL, Alembic), with per-tenant configuration instead of hardcoded values, spending guards on metered APIs, and 1,000+ automated backend checks.",
    ],
    stack: ["Python", "FastAPI", "PostgreSQL", "Docker", "Railway", "Claude API", "OpenAI API"],
    links: [],
  },
  {
    name: "Real Estate CRM Agent",
    tagline: "Human-Approved Real Estate Agent Assistant",
    context: "Simargi Systems · Pilot",
    bullets: [
      "Built a dedicated workspace for lead intake, follow-ups, draft replies, and escalations. The client team is moving to PLACE; its connection and real-lead processing remain pending approval.",
      "Built the security model: OAuth with AES-256-GCM encrypted token storage and rotation, HMAC-bound approval codes with expiry and replay rejection, CSRF-protected signed sessions, STOP/DNC suppression, global and per-tenant kill switches, and an append-only audit log.",
      "TypeScript, Fastify, and PostgreSQL with database-level enforcement and auditable jobs. Replies are evaluated in shadow mode; customer sends and CRM changes remain locked under the current pilot rules.",
    ],
    stack: ["TypeScript", "Fastify", "PostgreSQL", "OAuth 2.0", "OpenAI API", "Vercel"],
    links: [],
  },
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
    context: "Simargi Systems · Pilot",
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
      "Power Query M",
      "HTML/CSS",
    ],
  },
  {
    label: "Data & Analytics",
    items: [
      "PySpark",
      "pandas",
      "NumPy",
      "Databricks",
      "Adobe Analytics",
      "Airship",
      "XGBoost",
      "TreeSHAP",
      "Anomaly Detection",
      "Signal Processing (FFT)",
      "Statistical Process Control",
      "Power BI",
      "Power Automate",
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
      "Fastify",
      "Firebase / Firestore",
      "Vercel",
      "GitHub Actions",
    ],
  },
  {
    label: "Security",
    items: [
      "OAuth 2.0",
      "AES-256-GCM Encryption",
      "HMAC Signing",
      "CSRF Protection",
      "Row-Level Security",
      "Firestore Security Rules",
      "Audit Logging",
      "Secrets Management",
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
