export interface WorkEntry {
  company: string;
  role: string;
  duration: string;
  location: string;
  bullets: string[];
}

export const workExperience: WorkEntry[] = [
  {
    company: "ThoughtSpot",
    role: "Principal Product Manager",
    duration: "September 2024 – Present",
    location: "Bengaluru",
    bullets: [
      "Building Spotter — ThoughtSpot's AI analytics agent. I own the agent's reasoning loop, the MCP integration layer, and the UI model for multi-step agentic workflows. NLS and agentic analytics at enterprise scale.",
      "Agentic UI & User Experience: Design and frontend evolution of the Spotter Agent UI, focusing on a seamless interaction model for complex, multi-step agentic workflows.",
      "MCP Integration: ThoughtSpot's adoption of the Model Context Protocol, enabling Spotter to act as an MCP Host and securely pull context from external tools.",
      "Core Agent Engine: Autonomous reasoning and reliability — ensuring the AI can plan, execute, and self-correct its own analytical paths.",
      "Vibe Analytics: A 'personal analyst' mode in Spotter that guides users through multi-dimensional data exploration."
    ]
  },
  {
    company: "ThoughtSpot",
    role: "Senior Product Manager",
    duration: "December 2023 – September 2024",
    location: "Bengaluru",
    bullets: [
      "Secure authentication and integration features: SSO, APIs, and data connectors for scalable, compliant enterprise deployments.",
      "Data Augmentation: Allowing users to upload CSVs and instantly join them to existing reports for on-the-fly analysis without data engineering."
    ]
  },
  {
    company: "Hevo Data",
    role: "Senior Product Manager",
    duration: "June 2021 – November 2023",
    location: "Bengaluru",
    bullets: [
      "Managed the database/technical integrations portfolio with $5M+ annual revenue.",
      "Drove product roadmap handling top key accounts for relationship building and feedback.",
      "Built a new framework to deliver REST-based sources without developer involvement."
    ]
  },
  {
    company: "SIXT R&D",
    role: "Product Manager",
    duration: "September 2019 – June 2021",
    location: "Bengaluru",
    bullets: [
      "Delivered repair handling product for the Sixt fleet, scaling to 6 countries.",
      "Built a pandemic-response routing tool in one week, routing 100,000 reservations worth ~10M EUR to open branches during rapid European and US closures."
    ]
  },
  {
    company: "ZipGo",
    role: "Product Manager",
    duration: "October 2018 – August 2019",
    location: "Bengaluru",
    bullets: [
      "Led ZipGo's new Intercity business, managing a team of 13 across design, data, engineering, and QA.",
      "Conceptualized, built, and launched the ZipGo Intercity Platform spanning web, mobile, and native apps."
    ]
  },
  {
    company: "Via.com",
    role: "UI Developer → Product Manager",
    duration: "June 2015 – December 2017",
    location: "Bengaluru",
    bullets: [
      "Drove 200% increase in organic traffic through automated SEO products across 8 countries and 5 languages.",
      "Managed a team of 4 front-end developers, architecting a multi-language content system on Node.js, Redis, and Java."
    ]
  }
];
