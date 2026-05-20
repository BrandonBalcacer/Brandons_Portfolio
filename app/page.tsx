import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <div className="max-w-2xl mx-auto px-6 py-16 md:py-24">

        <header className="mb-16">
          <h1 className="text-2xl font-semibold mb-3">Brandon Balcacer</h1>
          <p className="text-neutral-600 leading-relaxed">
            Information Technology Management student at Ramapo College of New Jersey.
            Recently a data analytics intern at the MTA — joining Samsung SDS America
            this summer for cloud and security. I build data pipelines, dashboards, and
            small full-stack tools.
          </p>
          <p className="text-sm text-neutral-500 mt-3">Hackensack, NJ</p>
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
              <p className="text-sm text-neutral-500 mb-2">
                Samsung SDS America &middot; MSP Operations
              </p>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Incoming. Selected for the MSP Lab team to build sandbox environments for
                cloud and security accelerators across four MSP offerings. Hands-on with
                cloud-native infrastructure, security frameworks, infrastructure as code,
                monitoring, and FinOps cost optimization.
              </p>
            </li>
            <li>
              <div className="flex items-baseline justify-between gap-4 mb-1">
                <span className="font-medium">Data Analytics Intern</span>
                <span className="text-sm text-neutral-400 shrink-0">Jan – May 2026</span>
              </div>
              <p className="text-sm text-neutral-500 mb-2">
                Metropolitan Transportation Authority &middot; Elevators &amp; Escalators
              </p>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Built a Python rule-based pipeline using regex grammars and domain heuristics
                to auto-classify thousands of unstructured monthly entrapment incident
                reports, validated against a labeled corpus with a custom accuracy harness.
                Shipped a multi-page Power BI executive report tracking elevator and
                escalator availability across six MTA zones, authoring Power Query M to
                unpivot source data going back to 2016. Designed a 12-month SKU-level parts
                demand forecasting dashboard projecting $35.92M annual cost using Croston,
                SBA, and exponential smoothing, presented to division stakeholders.
                Co-developed a full-stack multi-document signing platform in Power Apps
                with SharePoint and Power Automate backing five document types.
              </p>
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
                <span className="font-medium">Tasteful Sweets — Bakery Operations Dashboard</span>
                <span className="text-sm text-neutral-400 shrink-0">In production</span>
              </div>
              <p className="text-sm text-neutral-600 leading-relaxed">
                End-to-end Python/Flask data pipeline ingesting Shopify orders via webhooks
                and Admin API backfills. SQLite schema joining orders, recipes, and expenses
                to generate weekly production schedules, shopping lists, and per-product
                profit margin reports. Currently running for an active bakery business.
              </p>
              <p className="text-xs text-neutral-400 mt-1">
                Python, Flask, SQLite, pandas
              </p>
            </li>
            <li>
              <div className="flex items-baseline justify-between gap-4 mb-1">
                <span className="font-medium">Archive Studio — B2B Lead Generation Pipeline</span>
                <span className="text-sm text-neutral-400 shrink-0">2026</span>
              </div>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Five-phase Python pipeline integrating Google Places, Firecrawl, Hunter.io,
                and Claude AI to source, score, enrich, and contact leads. Includes a
                prompt system with smart send-time scheduling for personalized outreach.
              </p>
              <p className="text-xs text-neutral-400 mt-1">
                Python, APIs, Claude AI
              </p>
            </li>
            <li>
              <Link
                href="https://github.com/BrandonBalcacer/IT_Ticketing_System"
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="flex items-baseline justify-between gap-4 mb-1">
                  <span className="font-medium group-hover:text-accent transition-colors">
                    IT Help Desk Ticketing System
                  </span>
                  <span className="text-sm text-neutral-400 shrink-0">Oct 2025</span>
                </div>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Full-stack ticketing platform with role-based access control and
                  automated activity logging.
                </p>
                <p className="text-xs text-neutral-400 mt-1">
                  Python, Flask, SQL
                </p>
              </Link>
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
                Python, SQL, DAX, PowerFx, Power Query M, JavaScript, HTML/CSS
              </dd>
            </div>
            <div className="flex gap-4">
              <dt className="text-neutral-500 shrink-0 w-32">Analytics &amp; BI</dt>
              <dd className="text-neutral-700">
                Power BI, Tableau, Power Apps, Power Automate, SharePoint, ETL design,
                time-series forecasting
              </dd>
            </div>
            <div className="flex gap-4">
              <dt className="text-neutral-500 shrink-0 w-32">Backend &amp; Cloud</dt>
              <dd className="text-neutral-700">
                AWS (S3, CloudFront, IAM), SQLite, Flask, REST APIs, webhooks, Git,
                prompt engineering
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
              B.S. Information Technology Management. Coursework in data management,
              data visualization, statistics, system analysis &amp; design, AI for business,
              and networking.
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
                href="mailto:balcacerrule@gmail.com"
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
