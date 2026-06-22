import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <div className="max-w-2xl mx-auto px-6 py-16 md:py-24">

        <header className="mb-16">
          <h1 className="text-2xl font-semibold mb-3">Brandon Balcacer</h1>
          <p className="text-neutral-600 leading-relaxed">
            Information Technology Management student at Ramapo College of New Jersey.
            Currently a Cloud &amp; Security Lab Technician Intern at Samsung SDS America,
            after a data analytics internship with the MTA. I build cloud infrastructure,
            data pipelines, dashboards, and AI-driven tools.
          </p>
          <p className="text-sm text-neutral-500 mt-3">Hackensack, NJ &middot; (609) 401-8703</p>
        </header>

        <section className="mb-16">
          <h2 className="text-sm font-semibold text-neutral-500 mb-6 tracking-wide">
            Experience
          </h2>
          <ul className="space-y-8">
            <li>
              <div className="flex items-baseline justify-between gap-4 mb-1">
                <span className="font-medium">Cloud &amp; Security Lab Technician Intern</span>
                <span className="text-sm text-neutral-400 shrink-0">Jun – Aug 2026</span>
              </div>
              <p className="text-sm text-neutral-500 mb-3">
                Samsung SDS America &middot; MSP Operations &middot; Ridgefield Park, NJ
              </p>
              <ul className="text-sm text-neutral-600 leading-relaxed space-y-2 list-disc pl-5 marker:text-neutral-300">
                <li>
                  Architecting an AWS solution for an internal demo portal serving Samsung SDS
                  staff, external clients, and vendors: a React/TypeScript front end on S3 and
                  CloudFront, a FastAPI backend on ECS Fargate behind API Gateway, and a managed
                  database for demo metadata.
                </li>
                <li>
                  Designing the security model for a multi-audience portal, including TLS
                  encryption in transit, access controls separating internal, client, and vendor
                  users, and per-environment VPC isolation so each demo runs in its own sandboxed
                  environment.
                </li>
                <li>
                  Defining governance and data lifecycle strategy with CloudWatch auditing and S3
                  lifecycle policies that archive retired prototypes to Glacier.
                </li>
                <li>
                  Leading the project as sole engineer — specifying all infrastructure as
                  redeployable Terraform, authoring the project charter, requirements
                  specification, and architecture diagrams, and presenting progress to engineering
                  leadership.
                </li>
              </ul>
            </li>
            <li>
              <div className="flex items-baseline justify-between gap-4 mb-1">
                <span className="font-medium">Data Analytics Intern</span>
                <span className="text-sm text-neutral-400 shrink-0">Jan – May 2026</span>
              </div>
              <p className="text-sm text-neutral-500 mb-3">
                Metropolitan Transportation Authority &middot; Elevators &amp; Escalators &middot; Brooklyn, NY
              </p>
              <ul className="text-sm text-neutral-600 leading-relaxed space-y-2 list-disc pl-5 marker:text-neutral-300">
                <li>
                  Built a Python regex extraction pipeline that auto-classifies entrapment report
                  fields, validated against a labeled corpus and replacing a manual Excel review.
                </li>
                <li>
                  Developed a multi-page Power BI executive report on equipment availability across
                  6 zones using DAX and Power Query M, resolving a DAX fan-out bug that inflated
                  metrics roughly 20x on a 1,967-row dataset via a SUMX over DISTINCTCOUNT pattern.
                </li>
                <li>
                  Designed a 12-month demand forecasting dashboard projecting $36M+ cost across
                  380K+ units at a 91.35% fulfillment KPI.
                </li>
                <li>
                  Co-built a full-stack document signing application in Power Apps and Power
                  Automate (5 document types, GCC) with a SharePoint backend and automated PDF
                  generation.
                </li>
              </ul>
            </li>
          </ul>
        </section>

        <section className="mb-16">
          <h2 className="text-sm font-semibold text-neutral-500 mb-6 tracking-wide">
            Projects
          </h2>
          <ul className="space-y-6">
            <li>
              <div className="flex items-baseline justify-between gap-4 mb-1">
                <span className="font-medium">Watcher Workflows — Lead Intelligence Platform</span>
                <span className="text-sm text-neutral-400 shrink-0">Archive Studios</span>
              </div>
              <ul className="text-sm text-neutral-600 leading-relaxed space-y-2 list-disc pl-5 marker:text-neutral-300 mt-2">
                <li>
                  Multi-stage Python pipeline that discovers, enriches, scores, and drafts outreach
                  for local business leads, publishing results to a self-contained, sortable HTML
                  dashboard.
                </li>
                <li>
                  Secured the Postgres data layer with Supabase row-level security on every table
                  and a two-key access model that keeps the service role key server-side, rendering
                  all dashboard content with safe DOM methods to prevent injection.
                </li>
                <li>
                  Engineered cost-aware LLM orchestration with Claude models tiered by task, cached
                  system prompts, and idempotent Postgres upserts so scheduled daily runs surface
                  only new leads.
                </li>
              </ul>
              <p className="text-xs text-neutral-400 mt-2">
                Python, Claude API, Supabase, Firecrawl
              </p>
            </li>
            <li>
              <div className="flex items-baseline justify-between gap-4 mb-1">
                <span className="font-medium">Agent Rufus — Autonomous Daily Market Briefing Agent</span>
                <span className="text-sm text-neutral-400 shrink-0">2026</span>
              </div>
              <ul className="text-sm text-neutral-600 leading-relaxed space-y-2 list-disc pl-5 marker:text-neutral-300 mt-2">
                <li>
                  Autonomous AI agent on a scheduled cloud routine that performs multi-source web
                  research on markets, finance, and technology each morning and emails a synthesized
                  HTML briefing to a subscriber list.
                </li>
                <li>
                  Engineered research guardrails into the agent: a 48-hour recency gate, a
                  verify-before-asserting standard with source citation, and a fallback chain for
                  live price data.
                </li>
                <li>
                  Delivered through the Resend API over a domain secured with SPF, DKIM, and DMARC.
                </li>
              </ul>
              <p className="text-xs text-neutral-400 mt-2">
                Claude, Cloud Routine, Resend API
              </p>
            </li>
          </ul>
        </section>

        <section className="mb-16">
          <h2 className="text-sm font-semibold text-neutral-500 mb-6 tracking-wide">
            Skills
          </h2>
          <dl className="space-y-3 text-sm">
            <div className="flex gap-4">
              <dt className="text-neutral-500 shrink-0 w-32">Languages &amp; Data</dt>
              <dd className="text-neutral-700">
                Python, SQL, DAX, PowerFx, Power Query M, JavaScript, TypeScript, HTML/CSS
              </dd>
            </div>
            <div className="flex gap-4">
              <dt className="text-neutral-500 shrink-0 w-32">Analytics &amp; BI</dt>
              <dd className="text-neutral-700">
                Power BI, Tableau, Power Apps, Power Automate, SharePoint, ETL pipeline design,
                data cleaning, statistical analysis, forecasting
              </dd>
            </div>
            <div className="flex gap-4">
              <dt className="text-neutral-500 shrink-0 w-32">Cloud, Backend &amp; AI</dt>
              <dd className="text-neutral-700">
                AWS (S3, CloudFront, ECS Fargate, API Gateway, CloudWatch, IAM, Glacier), Azure,
                GCP, Terraform, infrastructure as code, FastAPI, Flask, REST APIs, Postgres &amp;
                Supabase, row-level security, Git, FinOps, Claude API, agentic workflows, prompt
                engineering
              </dd>
            </div>
          </dl>
        </section>

        <section className="mb-16">
          <h2 className="text-sm font-semibold text-neutral-500 mb-6 tracking-wide">
            Education
          </h2>
          <div>
            <div className="flex items-baseline justify-between gap-4 mb-1">
              <span className="font-medium">Ramapo College of New Jersey</span>
              <span className="text-sm text-neutral-400 shrink-0">Sept 2023 – Dec 2026</span>
            </div>
            <p className="text-sm text-neutral-600">
              B.S. Information Technology Management. Coursework in data management systems,
              data visualization, system analysis &amp; design, AI for business, networking and
              distributed processing, management statistics, and corporate finance.
            </p>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-sm font-semibold text-neutral-500 mb-6 tracking-wide">
            Honors
          </h2>
          <ul className="text-sm text-neutral-600 space-y-1">
            <li>Dean&apos;s List, Fall 2024</li>
            <li>Track &amp; Field Captain, Ramapo College</li>
            <li>2× All-NJAC Honoree &amp; USTFCCCA Metro All-Region Sprinter</li>
          </ul>
        </section>

        <footer className="pt-8 border-t border-neutral-200">
          <h2 className="text-sm font-semibold text-neutral-500 mb-4 tracking-wide">
            Connect
          </h2>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <li>
              <a
                href="https://brandonbalcacer.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-700 hover:text-accent transition-colors"
              >
                Website
              </a>
            </li>
            <li>
              <a
                href="https://github.com/BrandonBalcacer"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-700 hover:text-accent transition-colors"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/brandonbalcacer/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-700 hover:text-accent transition-colors"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="mailto:Balcacerrule@gmail.com"
                className="text-neutral-700 hover:text-accent transition-colors"
              >
                Email
              </a>
            </li>
          </ul>
        </footer>

      </div>
    </main>
  );
}
