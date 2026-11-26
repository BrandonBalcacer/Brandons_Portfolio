import { projects } from "@/lib/data";

export type ProjectStory = {
  slug: string;
  summary: string;
  audience: string;
  problem: string;
  approach: string;
  role: string;
  steps: { title: string; description: string }[];
  takeaway: string;
  repository: { href: string; private: boolean };
  website: { href: string; label: string; note?: string; display?: string };
  images: { src: string; alt: string; caption: string; portrait?: boolean }[];
  challenge: string;
};

const stories: Record<string, ProjectStory> = {
  Stratos: {
    slug: "stratos", summary: "Built after a realtor friend told me how much time he spent driving around looking for properties.",
    images: [
      { src: "/images/projects/stratos-globe.png", alt: "Stratos territory discovery screen with a teal wireframe globe", caption: "The globe is the starting point for exploring a territory." },
      { src: "/images/projects/stratos-territory.png", alt: "Stratos map of North Jersey and New York with territory and address filters", caption: "From a territory to a street, then to individual properties." },
    ],
    repository: { href: "https://github.com/BrandonBalcacer/Stratos-Simargi", private: true },
    website: { href: "https://real-estate-atlas-production.up.railway.app", label: "Open Stratos", note: "Development app" },
    audience: "North Jersey real estate agents",
    problem: "A friend in real estate told me how much time he and other agents spent driving around to find distressed properties that matched their criteria. I wanted to give him a way to research an area before deciding where to spend that time, whether he was at his desktop or on his phone.",
    approach: "I built Stratos around territory discovery: explore the globe, narrow down an area, and investigate the properties inside it. Parcel records, public-record signals, and exterior imagery come together in a research queue. OpenAI and Claude help review the available evidence, with filtering and a human review path for uncertainty.",
    challenge: "The hardest part has been getting accurate, recent visual data and matching it to the right parcel at the scale we want. A model can interpret the evidence it receives; it cannot make old imagery current or fix a mismatched record. Data freshness and coverage are still active development challenges.",
    role: "Property research workflow, backend, and platform development",
    steps: [
      { title: "Find the structures", description: "A street and municipality identify the research area. New Jersey parcel data enumerates structures so research starts with a consistent inventory." },
      { title: "Combine the signals", description: "An OpenAI and Claude vision ensemble evaluates exterior features. Public-record signals are combined with observations; model disagreement goes to human review." },
      { title: "Review the queue", description: "The agent reviews the ranked research queue. The workflow includes tenant-specific configuration, metered-API spending guards, and human decisions." },
    ],
    takeaway: "I started with a friend's very practical frustration. The work keeps coming back to the same question: can an agent trust the evidence enough to decide which property deserves a closer look?",
  },
  "Relay Agent": {
    slug: "crm-agent", summary: "An assistant that asks before it acts.",
    images: [
      { src: "/images/projects/crm-inbox-dark.webp", alt: "Dark lead workspace with sample leads, contact permissions, and attention queue", caption: "The lead inbox, shown with sample records and masked contact details." },
      { src: "/images/projects/crm-inbox-light.webp", alt: "Light version of the lead inbox with sample leads", caption: "The same workspace in light mode." },
      { src: "/images/projects/crm-shadow.webp", alt: "Shadow workspace for reviewing and scoring a proposed agent response", caption: "Shadow review lets the realtor evaluate replies while sends remain locked." },
    ],
    repository: { href: "https://github.com/BrandonBalcacer/lofty-human-approved-crm-agent", private: true },
    website: { href: "https://lofty-human-approved-crm-agent.vercel.app", label: "Open pilot workspace", note: "Controlled pilot · Sign-in required", display: "Real estate agent workspace" },
    audience: "A New Jersey real estate team",
    problem: "I am building this with a real estate team that needs one place to track incoming leads, follow-ups, and the conversations that need a realtor's attention. The goal is faster follow-through without losing visibility into what the assistant is doing.",
    approach: "The agent has its own lead workspace, draft replies, attention queue, and escalation workflow. The planned CRM connection is PLACE. That connection is still being worked out; replies are currently evaluated in shadow mode, with customer sends and CRM changes locked under the pilot rules.",
    challenge: "The challenge is deciding where useful automation should stop and a realtor should step in. Current work focuses on evaluating reply quality, keeping approved business knowledge current, and defining escalation rules before expanding the live pilot.",
    role: "Approval workflow, backend, and security model",
    steps: [
      { title: "Organize the leads", description: "A dedicated inbox brings lead sources, contact permissions, follow-up status, and attention items into one workspace." },
      { title: "Review in shadow", description: "Controlled test records produce proposed replies that the realtor can review and score. Real-lead processing is outside the current authorized shadow trial." },
      { title: "Escalate with context", description: "Escalation and approval tools let the realtor handle decisions the assistant should not make alone. Sends remain locked while the rules and integrations are confirmed." },
    ],
    takeaway: "Approval is a system boundary. A prompt alone cannot enforce who is allowed to act.",
  },
  Roam: {
    slug: "roam", summary: "Travel discovery, with a reason behind every recommendation.",
    images: [
      { src: "/images/projects/roam-discovery.png", alt: "Roam discovery feed showing a sunset sky coaster experience in Japan", caption: "A swipeable feed turns travel inspiration into places to explore.", portrait: true },
      { src: "/images/projects/roam-saved.png", alt: "Roam saved experiences with an option to build an itinerary", caption: "Saved experiences become the starting point for a day-by-day plan.", portrait: true },
    ],
    challenge: "The hackathon constraint was time: I built the backend in one day. Keeping each recommendation score and its explanation in the same SQL logic helped keep the system understandable as we moved quickly.",
    repository: { href: "https://github.com/BrandonBalcacer/roam", private: false },
    website: { href: "https://roam-psi-one.vercel.app", label: "Try Roam" },
    audience: "Travelers discovering places and planning a day",
    problem: "A list of recommendations still leaves the traveler to work out why a place fits and how to turn separate destinations into a practical itinerary.",
    approach: "Roam keeps recommendation scores and their explanations together in SQL, then uses geography to organize each day by neighborhood. The backend was built in one day for the Checkout NYC hackathon.",
    role: "Hackathon backend and database development",
    steps: [
      { title: "Discover places", description: "The browser calls PostgreSQL functions through PostgREST. Row-level security protects the data across 16 tables." },
      { title: "Explain the match", description: "A shared SQL expression produces both the card's score and its user-facing reason so recommendations and explanations stay aligned." },
      { title: "Plan the day", description: "The PostGIS planner groups destinations by neighborhood. Eight itinerary actions are exposed to a Claude agent." },
    ],
    takeaway: "Roam won first place at the Checkout NYC hackathon. Its core design keeps the recommendation and the explanation grounded in the same logic.",
  },
  Bakelytics: {
    slug: "bakelytics", summary: "A favor for my cousin's bakery that became a passion project.",
    images: [
      { src: "/images/projects/bakelytics-overview-demo.png", alt: "Bakelytics bakery overview with anonymous sample figures", caption: "The daily overview. Identifying details have been removed and figures replaced with sample data." },
      { src: "/images/projects/bakelytics-money-demo.png", alt: "Bakelytics revenue and expense dashboard with anonymous sample figures", caption: "A closer look at money coming in and going out, using sample data." },
    ],
    repository: { href: "https://github.com/BrandonBalcacer/bakery-dashboard", private: true },
    website: { href: "https://bakelytics.com", label: "Visit Bakelytics.com" },
    audience: "Bakery owners and operators",
    problem: "My cousin runs a bakery and was tired of keeping track of everything in spreadsheets. She knew I worked with technology and asked if I could build something simpler. It started as a small tracker to make her day easier, and I kept adding to it as we used it.",
    approach: "I focused on making ingredients, recipes, and revenue easy to enter and understand. My cousin gave me constructive feedback about anything that felt confusing or took too much effort, and I used that to improve the interface. That back-and-forth turned a favor into a passion project, and eventually into a product we saw potential to offer other bakeries.",
    challenge: "The design challenge was to make her daily work easier without recreating the spreadsheet she wanted to leave behind. Real feedback shaped the UI, and we plan to keep that same feedback loop through the Black Friday pilot and sale.",
    role: "Product development, user experience, and backend engineering",
    steps: [
      { title: "Make input easy", description: "Ingredients, recipes, and revenue belong in a workflow a bakery owner can use throughout the day, with language and screens shaped by my cousin's feedback." },
      { title: "Bring it together", description: "Shopify order synchronization connects to a Flask and PostgreSQL backend, bringing orders alongside recipes, ingredient prices, and cost reporting." },
      { title: "Build from feedback", description: "We kept improving the parts that were difficult to use. The next step is applying that same feedback loop as more bakers try the product." },
    ],
    takeaway: "This started because someone close to me needed help. Building alongside the person using it has shaped the product more than any feature list could.",
  },
};

export const detailedProjects = projects.map((project) => ({ ...project, ...stories[project.name] }));
export function getProject(slug: string) { return detailedProjects.find((project) => project.slug === slug); }
