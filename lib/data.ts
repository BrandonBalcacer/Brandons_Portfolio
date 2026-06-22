export const profile = {
  name: "Brandon Balcacer",
  handle: "brandon",
  host: "portfolio",
  role: "Cloud, Data & AI",
  location: "Hackensack, NJ",
  phone: "(609) 401-8703",
  email: "Balcacerrule@gmail.com",
  status: "MSP Lab Technician @ Samsung SDS America",
  bio: "Information Technology Management student at Ramapo College of New Jersey. Currently an MSP Lab Technician, Cloud & Security Intern at Samsung SDS America, after a data analytics internship with the MTA. I build cloud infrastructure, data pipelines, dashboards, and AI-driven tools.",
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
    role: "MSP Lab Technician, Cloud & Security Intern",
    company: "Samsung SDS America",
    team: "MSP Operations",
    location: "Ridgefield Park, NJ",
    period: "Jun – Aug 2026",
    bullets: [
      "Architecting an AWS solution for an internal demo portal serving Samsung SDS staff, external clients, and vendors: a React/TypeScript front end on S3 and CloudFront, a FastAPI backend on ECS Fargate behind API Gateway, and a managed database for demo metadata.",
      "Designing the security model for a multi-audience portal, including TLS encryption in transit, access controls separating internal, client, and vendor users, and per-environment VPC isolation so each demo runs in its own sandboxed environment.",
      "Defining governance and data lifecycle strategy with CloudWatch auditing and S3 lifecycle policies that archive retired prototypes to Glacier.",
      "Leading the project as sole engineer — specifying all infrastructure as redeployable Terraform, authoring the project charter, requirements specification, and architecture diagrams, and presenting progress to engineering leadership.",
    ],
  },
  {
    role: "Data Analytics Intern",
    company: "Metropolitan Transportation Authority",
    team: "Elevators & Escalators",
    location: "Brooklyn, NY",
    period: "Jan – May 2026",
    bullets: [
      "Built a Python regex extraction pipeline that auto-classifies entrapment report fields, validated against a labeled corpus and replacing a manual Excel review.",
      "Developed a multi-page Power BI executive report on equipment availability across 6 zones using DAX and Power Query M, resolving a DAX fan-out bug that inflated metrics roughly 20x on a 1,967-row dataset via a SUMX over DISTINCTCOUNT pattern.",
      "Designed a 12-month demand forecasting dashboard projecting $36M+ cost across 380K+ units at a 91.35% fulfillment KPI.",
      "Co-built a full-stack document signing application in Power Apps and Power Automate (5 document types, GCC) with a SharePoint backend and automated PDF generation.",
    ],
  },
];

export type Project = {
  name: string;
  tagline: string;
  context: string;
  bullets: string[];
  stack: string[];
};

export const projects: Project[] = [
  {
    name: "Watcher Workflows",
    tagline: "Lead Intelligence Platform",
    context: "Archive Studios",
    bullets: [
      "Multi-stage Python pipeline that discovers, enriches, scores, and drafts outreach for local business leads, publishing results to a self-contained, sortable HTML dashboard.",
      "Secured the Postgres data layer with Supabase row-level security on every table and a two-key access model that keeps the service role key server-side, rendering all dashboard content with safe DOM methods to prevent injection.",
      "Engineered cost-aware LLM orchestration with Claude models tiered by task, cached system prompts, and idempotent Postgres upserts so scheduled daily runs surface only new leads.",
    ],
    stack: ["Python", "Claude API", "Supabase", "Firecrawl"],
  },
  {
    name: "Agent Rufus",
    tagline: "Autonomous Daily Market Briefing Agent",
    context: "2026",
    bullets: [
      "Autonomous AI agent on a scheduled cloud routine that performs multi-source web research on markets, finance, and technology each morning and emails a synthesized HTML briefing to a subscriber list.",
      "Engineered research guardrails into the agent: a 48-hour recency gate, a verify-before-asserting standard with source citation, and a fallback chain for live price data.",
      "Delivered through the Resend API over a domain secured with SPF, DKIM, and DMARC.",
    ],
    stack: ["Claude", "Cloud Routine", "Resend API"],
  },
];

export type SkillGroup = {
  label: string;
  items: string[];
};

export const skills: SkillGroup[] = [
  {
    label: "Languages & Data",
    items: [
      "Python",
      "SQL",
      "DAX",
      "PowerFx",
      "Power Query M",
      "JavaScript",
      "TypeScript",
      "HTML/CSS",
    ],
  },
  {
    label: "Analytics & BI",
    items: [
      "Power BI",
      "Tableau",
      "Power Apps",
      "Power Automate",
      "SharePoint",
      "ETL Pipeline Design",
      "Data Cleaning",
      "Statistical Analysis",
      "Forecasting",
    ],
  },
  {
    label: "Cloud, Backend & AI",
    items: [
      "AWS (S3, CloudFront, ECS Fargate, API Gateway, CloudWatch, IAM, Glacier)",
      "Azure",
      "GCP",
      "Terraform",
      "Infrastructure as Code",
      "FastAPI",
      "Flask",
      "REST APIs",
      "Postgres & Supabase",
      "Row-Level Security",
      "Git",
      "FinOps",
      "Claude API",
      "Agentic Workflows",
      "Prompt Engineering",
    ],
  },
];

export const education = {
  school: "Ramapo College of New Jersey",
  period: "Sept 2023 – Dec 2026",
  degree: "B.S. Information Technology Management",
  coursework:
    "Coursework in data management systems, data visualization, system analysis & design, AI for business, networking and distributed processing, management statistics, and corporate finance.",
};

export const honors = [
  "Dean's List, Fall 2024",
  "Track & Field Captain, Ramapo College",
  "2× All-NJAC Honoree & USTFCCCA Metro All-Region Sprinter",
];

export const socials = [
  { label: "Website", href: "https://brandonbalcacer.dev" },
  { label: "GitHub", href: "https://github.com/BrandonBalcacer" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/brandonbalcacer/" },
  { label: "Email", href: "mailto:Balcacerrule@gmail.com" },
];
