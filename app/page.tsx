import Link from "next/link";
import { ChevronDown, ArrowUpRight } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-mocha text-black font-mono selection:bg-black selection:text-white">
      
      {/* 1. This the navigation bar tiwn  */}
      <nav className="fixed top-0 left-0 w-full p-8 flex justify-between items-start z-50 mix-blend-difference text-black">
        <div className="flex flex-col gap-1 group cursor-pointer">
          <div className="border border-black px-3 py-1 text-sm font-bold w-fit group-hover:bg-black group-hover:text-white transition-colors">
            01
          </div>
          <span className="text-xs font-bold tracking-widest mt-1">RESUME</span>
        </div>
        <button className="text-xl hover:opacity-50 transition-opacity">
          ☾
        </button>
      </nav>

      {/* 2. this is for the numbers on the right side  */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-4 text-xs font-bold text-gray-400 mix-blend-multiply">
        <a href="#hero" className="hover:text-black transition-colors">1</a>
        <a href="#experience" className="hover:text-black transition-colors">2</a>
        <a href="#projects" className="hover:text-black transition-colors">3</a>
        <a href="#skills" className="hover:text-black transition-colors">4</a>
      </div>

      {/* 3. hero part */}
      <section id="hero" className="h-screen flex flex-col justify-center items-center text-center px-4 relative">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter uppercase mb-6 leading-none">
          Brandon<br />Balcacer
        </h1>
        <p className="text-sm md:text-lg tracking-widest uppercase text-gray-600">
          Ramapo College of New Jersey
        </p>
        <div className="absolute bottom-12 animate-bounce">
          <ChevronDown size={32} />
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 md:px-12 pb-24 space-y-32">
        
        {/* 4. this is why my experience goes twin  */}
        <section id="experience">
           <div className="border border-black px-3 py-1 text-sm font-bold w-fit mb-8 uppercase">
            02 Experience
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* MTA DATA*/}
            <div className="border border-black p-6 md:p-8 flex flex-col justify-between h-full hover:bg-white transition-colors">
              <div className="mb-8">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold uppercase max-w-[70%]">Data Analytics Intern</h3>
                  <span className="text-xs font-bold uppercase border border-black px-2 py-1">Jan 2026 — Present</span>
                </div>
                <p className="text-lg uppercase tracking-wide mb-6 text-gray-600">MTA (Metropolitan Transportation Authority)</p>
                <p className="text-sm leading-relaxed text-gray-800 uppercase">
                  Engineered Python and SQL ETL workflows to clean and standardize 1,600+ operational records,
                  and deployed Power BI dashboards tracking material usage, fulfillment rates, and project KPIs.
                  Automated manual memorandum and paper tracking processes with Power Automate, Power Apps, and SharePoint,
                  and applied generative AI to accelerate data cleaning and extract structured insights from raw operational data.
                </p>
              </div>
            </div>

            {/* TARGET DATA */}
            <div className="border border-black p-6 md:p-8 flex flex-col justify-between h-full hover:bg-white transition-colors">
               <div className="mb-8">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold uppercase">Team Member</h3>
                  <span className="text-xs font-bold uppercase border border-black px-2 py-1">2022 — Present</span>
                </div>
                <p className="text-lg uppercase tracking-wide mb-6 text-gray-600">Target</p>
                <p className="text-sm leading-relaxed text-gray-800 uppercase">
                  Covered Front-End Team Lead duties overseeing guest service, cashier management, and digital order fulfillment,
                  diagnosing issues across 12+ POS and self-checkout systems.
                  Picked and batched digital orders with 99% accuracy, trained new hires on fulfillment tech,
                  and earned the Annual Performance Bonus for team contributions.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* where my projects be at twin */}
        <section id="projects">
           <div className="border border-black px-3 py-1 text-sm font-bold w-fit mb-8 uppercase">
            03 Selected Works
          </div>

          <div className="grid gap-12">
            {/* B2B lead gen pipeline – main project */}
            <Link href="https://github.com/BrandonBalcacer" target="_blank" className="group block border-t border-black pt-8">
              <div className="flex justify-between items-start mb-4">
                 <h2 className="text-3xl md:text-5xl font-bold uppercase group-hover:opacity-60 transition-opacity flex items-center gap-4">
                  B2B Lead Generator <ArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </h2>
                <span className="text-xs font-bold border border-black px-2 py-1 uppercase">2026</span>
              </div>

              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                 <p className="max-w-lg text-gray-600 text-sm uppercase leading-relaxed">
                   5-phase automated outreach pipeline for Archive Studio Marketing —
                   sources, scores, and enriches B2B leads using Google Places, Firecrawl, and Hunter.io,
                   then uses Claude AI to generate personalized emails with smart send-time scheduling.
                   Built to turn cold prospecting into a repeatable, revenue-driving system.
                 </p>
                 <div className="flex gap-2 text-xs font-bold">
                   <span className="border border-black px-2 py-1 uppercase">Python</span>
                   <span className="border border-black px-2 py-1 uppercase">APIs</span>
                   <span className="border border-black px-2 py-1 uppercase">Claude AI</span>
                 </div>
              </div>
            </Link>

            {/* Tasteful Sweets bakery dashboard */}
            <Link href="https://github.com/BrandonBalcacer" target="_blank" className="group block border-t border-black pt-8">
              <div className="flex justify-between items-start mb-4">
                 <h2 className="text-3xl md:text-5xl font-bold uppercase group-hover:opacity-60 transition-opacity flex items-center gap-4">
                  Tasteful Sweets Dashboard <ArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </h2>
                <span className="text-xs font-bold border border-black px-2 py-1 uppercase">2026</span>
              </div>

              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                 <p className="max-w-lg text-gray-600 text-sm uppercase leading-relaxed">
                   End-to-end operations and analytics dashboard running live for an active bakery business.
                   Ingests Shopify orders via HMAC-verified webhooks, reconciles recipe and expense data in SQLite,
                   and auto-generates weekly production schedules, shopping lists, and per-product profit margin reports —
                   turning raw order data into the decisions that keep the bakery profitable.
                 </p>
                 <div className="flex gap-2 text-xs font-bold">
                   <span className="border border-black px-2 py-1 uppercase">Python</span>
                   <span className="border border-black px-2 py-1 uppercase">Flask</span>
                   <span className="border border-black px-2 py-1 uppercase">SQLite</span>
                   <span className="border border-black px-2 py-1 uppercase">pandas</span>
                 </div>
              </div>
            </Link>

          </div>
        </section>

        {/* super duper important skills fr */}
        <section id="skills">
          <div className="border border-black px-3 py-1 text-sm font-bold w-fit mb-8 uppercase">
            04 Skills
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* languages and data */}
            <div className="border border-black p-8">
              <h3 className="text-lg font-bold uppercase mb-6">Languages & Data</h3>
              <div className="flex flex-wrap gap-3">
                {["Python", "pandas", "openpyxl", "SQL", "DAX", "PowerFx", "JavaScript", "HTML/CSS"].map((skill) => (
                  <span key={skill} className="border border-black px-3 py-2 text-xs font-bold uppercase hover:bg-black hover:text-white transition-colors cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* analytics and BI */}
            <div className="border border-black p-8">
              <h3 className="text-lg font-bold uppercase mb-6">Analytics & BI</h3>
              <div className="flex flex-wrap gap-3">
                 {["Power BI", "Tableau", "Power Apps", "Power Automate", "SharePoint", "ETL Pipelines", "Statistical Analysis"].map((skill) => (
                  <span key={skill} className="border border-black px-3 py-2 text-xs font-bold uppercase hover:bg-black hover:text-white transition-colors cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </div>


            {/* backend and cloud */}
            <div className="border border-black p-8">
              <h3 className="text-lg font-bold uppercase mb-6">Backend & Cloud</h3>
              <div className="flex flex-wrap gap-3">
                {["SQLite", "Flask", "REST APIs", "Webhooks (HMAC)", "AWS S3", "CloudFront", "IAM", "Git", "Generative AI", "Prompt Engineering"].map((skill) => (
                  <span key={skill} className="border border-black px-3 py-2 text-xs font-bold uppercase hover:bg-black hover:text-white transition-colors cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </section>

      </div>
    </main>
  );
}
