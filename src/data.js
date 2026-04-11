export const projects = [
  {
    title: "AI-Native CMS for Travel Bloggers",
    url: "#",
    tag: "SaaS • In Beta",
    description: "I built this for my own blog, then realised other travel bloggers have the same problem — trip notes sitting in a folder, never becoming posts. Opening it up as a product.",
    isComingSoon: true
  },
  {
    title: "WanderingBong",
    url: "https://wanderingbong.com",
    tag: "AI Pipeline • Production",
    description: "My slow travel blog. I got tired of the copy-paste workflow between notes and WordPress, so I rebuilt the whole thing — custom CMS, MCP server, an agent that drafts posts from my trip notes.",
    isComingSoon: false
  },
  {
    title: "Lyaadh",
    url: "https://lyaadh.com",
    tag: "Brand • Live",
    description: "Bengali for the art of pleasurable lethargy. A brand — not an app. ShortCuts (a Task Shrinker with a Coma Mode), Dokan (curated gear for doing nothing), Escapes. Tagline: The Art of Productive Laziness.",
    isComingSoon: false
  },
  {
    title: "Eidetic",
    url: null,
    tag: "Knowledge Graph • MCP",
    description: "I kept losing things I'd read. Built a Chrome extension + mobile app to capture anything, a FastAPI + pgvector backend to search it, and an MCP server so Claude can query my memory mid-conversation.",
    isComingSoon: false
  },
  {
    title: "Worldview",
    url: null,
    tag: "Data Viz • 3D Globe",
    description: "Started as a question: can you show where every tracked satellite actually is, right now? CelesTrak orbital data, satellite.js propagation, Mapbox GL v3 globe. You can scrub through time.",
    isComingSoon: false
  },
  {
    title: "Pather",
    url: null,
    tag: "Privacy • Local-first",
    description: "Frustrated with Google Maps Timeline — too much of my life living in someone else's infra. Built my own GPS logger. Classifies movement, detects stops, builds a day timeline. All on-device.",
    isComingSoon: false
  },
  {
    title: "BIRD → Snowflake",
    url: "https://github.com/aaghran/bird-snowflake-loader",
    tag: "NLS • Benchmarking",
    description: "Nobody had built a Snowflake loader for the BIRD NL-to-SQL benchmark. I needed one for evaluating Spotter, so I built it and open-sourced it. 500 questions, 22 databases, 158+ tables.",
    isComingSoon: false
  }
];

export const writings = [
  {
    title: "I Am No Longer a Solo Developer: Lessons from Managing a Team of Agents",
    url: "https://aaghran.substack.com/p/i-am-no-longer-a-solo-developer-lessons",
    meta: "Substack • Jan 2026",
    image: "https://substackcdn.com/image/fetch/$s_!5m3f!,w_1200,h_675,c_fill,f_jpg,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff9084c0e-9d7a-477f-b233-bc131b345ae2_1024x559.png"
  },
  {
    title: "Giving My AI Interns \"Hands\": How I Use MCP to Connect LLMs to Production",
    url: "https://aaghran.substack.com/p/giving-my-ai-interns-hands-how-i",
    meta: "Substack • Jan 2026",
    image: "https://substackcdn.com/image/fetch/$s_!koKU!,w_1200,h_675,c_fill,f_jpg,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6892c464-b322-4705-b72c-e40445bb6812_2600x1418.png"
  },
  {
    title: "Why I Over-Engineered My Personal Blog",
    url: "https://aaghran.substack.com/p/why-i-over-engineered-my-personal",
    meta: "Substack • Jan 2026",
    image: "https://substackcdn.com/image/fetch/$s_!GIvr!,w_1200,h_675,c_fill,f_jpg,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F51b0aa94-735d-428c-9d41-0f59558a5439_2816x1536.png"
  },
  {
    title: "Going back 900 years at Hoysaleswara Temple Halebidu",
    url: "https://medium.com/@aaghran",
    meta: "Medium • Travel",
    image: "assets/halebidu_temple.png"
  },
  {
    title: "Floating through the Mangroves of Sundarbans",
    url: "https://medium.com/@aaghran",
    meta: "Medium • Travel",
    image: "assets/sundarbans_mangrove.png"
  },
  {
    title: "Coffee Culture in Vietnam: Strong and Slow drip",
    url: "https://medium.com/@aaghran",
    meta: "Medium • Travel",
    image: "assets/vietnam_coffee.png"
  },
  {
    title: "Impressive Forts in and around Bangalore",
    url: "https://medium.com/@aaghran",
    meta: "Medium • Travel",
    image: "assets/bangalore_fort.png"
  },
  {
    title: "Why we Went Back to Thailand",
    url: "https://medium.com/@aaghran",
    meta: "Medium • Travel",
    image: "assets/thailand_beach.png"
  }
];

export const workExperience = [
  {
    company: "ThoughtSpot",
    role: "Principal Product Manager",
    duration: "September 2024 - Present",
    location: "Bengaluru",
    bullets: [
      "I'm part of the team building Spotter, our AI-powered analytics assistant that helps business users move beyond 'what happened' to uncover the 'why' behind their data shifts.",
      "Agentic UI & User Experience: Currently working on the design and frontend evolution of the Spotter Agent UI, focusing on creating a seamless interaction model for complex, multi-step agentic workflows.",
      "MCP Integration & Ecosystem: Worked on ThoughtSpot's adoption of the Model Context Protocol (MCP), enabling Spotter to act as an MCP Host. This allows the agent to securely pull context from external tools.",
      "Core Agent Engine: Transitioned to driving the Core Agent development, focusing on autonomous reasoning and reliability—ensuring the AI can plan, execute, and self-correct its own analytical paths.",
      "Vibe Analytics (Deep Analysis): Spearheading a new 'personal analyst' mode in Spotter that guides users through multi-dimensional data exploration."
    ]
  },
  {
    company: "ThoughtSpot",
    role: "Senior Product Manager",
    duration: "December 2023 - September 2024",
    location: "Bengaluru",
    bullets: [
      "Collaborated with enterprise customers to build secure authentication and integration features like SSO, APIs, and data connectors that enable scalable, compliant deployments.",
      "Contributed to Data Augmentation capabilities—allowing users to upload their own CSVs and instantly join them to existing reports for on-the-fly analysis without complex data engineering."
    ]
  },
  {
    company: "Hevo Data",
    role: "Senior Product Manager",
    duration: "June 2021 - November 2023",
    location: "Bengaluru",
    bullets: [
      "Manage the database/technical integrations portfolio with $5M+ annual revenue.",
      "Driven product roadmap handling top key accounts for relations building and feedback gathering.",
      "Envisioned a new framework to deliver REST-based sources without a developer's involvement, significantly reducing developer bandwidth and accelerating deployment time."
    ]
  },
  {
    company: "SIXT Research & Development",
    role: "Product Manager",
    duration: "September 2019 - June 2021",
    location: "Bengaluru",
    bullets: [
      "Conceptualized and delivered a new product for Repair handling for the Sixt fleet, scaling operations to 6 countries.",
      "Built a pandemic-response routing tool in one week, routing 100,000 reservations worth ~10M EUR to branches that were still open amidst rapid European and US closures."
    ]
  },
  {
    company: "ZipGo",
    role: "Product Manager",
    duration: "October 2018 - August 2019",
    location: "Bengaluru",
    bullets: [
      "Managed product for Zipgo's new Intercity business leading a team of 13 across design, data, engineering, and QA.",
      "Conceptualized, built, and launched the Zipgo Intercity Platform spanning web, mobile, and native apps to control bus operations."
    ]
  },
  {
    company: "MyBataz",
    role: "Product Manager",
    duration: "January 2018 - July 2018",
    location: "Bengaluru",
    bullets: [
      "Responsible for end-to-end product lifecycle for a performance-based fashion and lifestyle platform.",
      "Led the Android app to over 400,000 installs within 3 months of launch.",
      "Hired and managed an engineering team of 6 developers."
    ]
  },
  {
    company: "Via.com",
    role: "Product Manager",
    duration: "March 2017 - December 2017",
    location: "Bengaluru",
    bullets: [
      "Drove a 200% increase in organic traffic through automated SEO products focusing on 8 countries and 5 languages.",
      "Generated actionable insights from customer feedback loops and Google Analytics."
    ]
  },
  {
    company: "Via.com",
    role: "UI Developer",
    duration: "June 2015 - March 2017",
    location: "Bengaluru",
    bullets: [
      "Managed a team of 4 front-end developers, architecting a multi-language content system based on Node.js, Redis, and Java.",
      "Developed UIs handling scaling traffic for 9 live countries."
    ]
  },
  {
    company: "Campus Diaries",
    role: "Web Developer",
    duration: "June 2014 - May 2015",
    location: "Bengaluru",
    bullets: [
      "Operated as a backend and Drupal CMS developer working via Agile/SCRUM."
    ]
  }
];
