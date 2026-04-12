export const projects = [
  {
    id: "ai-cms",
    title: "AI-Native CMS for Travel Bloggers",
    url: null,
    tag: "SaaS • In Beta",
    description: "I built this for my own blog, then realised other travel bloggers have the same problem — trip notes sitting in a folder, never becoming posts. Opening it up as a product.",
    isComingSoon: true,
    lede: "I built this for my own travel blog and it changed my workflow entirely. Now I'm opening it up.",
    story: `After three months in Thailand, I had about forty pages of notes — restaurants, temples, day trips, a motorcycle ride I want to remember properly — and exactly zero published posts. It wasn't that I didn't want to write. It was the gap between having the notes and having a post that killed it every time. Copy from Apple Notes, paste into ChatGPT, edit the output, paste into WordPress, format, add images, SEO. By the time I'd done all that for one post, I'd lost the will to do it for the next nine.

So I rebuilt the workflow from scratch. The CMS is built around a Journals entity — raw trip notes, not drafts. An MCP server gives the AI agent full visibility into what I've published, what's sitting in journals, what topics I've covered and haven't. A Google ADK agent reads the journals and drafts posts in my voice, informed by everything I've already written.

The first time I ran the full pipeline, five Thailand posts came out in an afternoon. They sounded like me — not because I prompted it carefully, but because the agent had read two years of my writing first.

The core workflow works. What I'm rebuilding now is the editorial UI — I built it for myself, which means it makes assumptions about how I work that won't hold for everyone. The review step still needs to feel like reviewing, not like wrangling a system. Once that's right, I'm opening it up to other travel bloggers who are stuck in the same copy-paste loop. If that's you — join the waitlist.`,
    stack: ["Google ADK", "MCP", "FastAPI", "PostgreSQL", "React", "EC2"],
    screenshots: []
  },
  {
    id: "wanderingbong",
    title: "WanderingBong",
    url: "https://wanderingbong.com",
    tag: "AI Pipeline • Production",
    description: "My slow travel blog. I got tired of the copy-paste workflow between notes and WordPress, so I rebuilt the whole thing — custom CMS, MCP server, an agent that drafts posts from my trip notes.",
    isComingSoon: false,
    lede: "My slow travel blog. I got tired of my own publishing workflow and rebuilt the whole thing from scratch.",
    story: `I've been travel writing for a while. The blog existed before the CMS, before the agent, before any of this — it was just a WordPress site with Elementor and a Notion folder full of notes I kept meaning to turn into posts. The problem was always the same: too many steps between having the trip and having the post.

I rebuilt the whole thing. Custom CMS backend on Node.js and PostgreSQL, running on EC2. An MCP server that gives Claude full context about my content — what's published, what destinations I've written about, what's sitting in the journal backlog untouched. A Google ADK agent that reads raw trip notes and drafts posts in my voice. I review, edit lightly, publish.

The migration was the hard part. Rebuilding a live blog while trying to keep publishing is a bad idea. I did it anyway. It took about three months and there were weeks where I was simultaneously shipping a new CMS feature and trying to write about a temple I'd visited in Chiang Mai. Not ideal.

But it works. The voice is right — the agent has read everything I've published and writes from that context, not from a generic "travel blog" prompt. The MCP integration means I can be editing a post in Claude and ask what else I've written about the same region, and it just knows.

I write slowly and only from places I've actually been. Thailand keeps pulling me back. Karnataka is underrated. I'm starting to think the blog itself is the best argument for the CMS — if you want to see what the pipeline produces, just read it.`,
    stack: ["Google ADK", "MCP", "Node.js", "PostgreSQL", "EC2", "PM2", "WordPress"],
    screenshots: []
  },
  {
    id: "lyaadh",
    title: "Lyaadh",
    url: "https://lyaadh.com",
    tag: "Brand • Live",
    description: "Bengali for the art of pleasurable lethargy. A brand — not an app. ShortCuts (a Task Shrinker with a Coma Mode), Dokan (curated gear for doing nothing), Escapes. Tagline: The Art of Productive Laziness.",
    isComingSoon: false,
    lede: "Bengali for the art of pleasurable lethargy. I wanted to build something slower.",
    story: `Lyaadh is a Bengali word with no clean English translation. It's the feeling of lying around on a Sunday afternoon not because you're tired, but because you've consciously decided the world can wait. My family uses it. It carries something that "rest" or "laziness" doesn't — it's not an apology for doing nothing, it's a chosen state.

I couldn't find a brand for this. Everything in the productivity and wellness space either hustles you or makes you feel guilty for not hustling. I wanted something that took the slower pace seriously — not as recovery, just as a way of being.

The brand has four pillars. The Dokan is a curated shop — things worth owning because they make slowness better, not more efficient. ShortCuts is the tool: a task shrinker that finds the minimum viable version of whatever you're trying to do, including a Coma Mode for when even that is too much. Escapes is slow travel. And The Letter is a weekly newsletter written by my wife — short essays, no lists, no tips, just a voice that gives you permission to exhale.

The partnership is the best part of it. She writes, I build. Her editorial instinct and my product instinct are genuinely different, and the brand is better for it.

The site is live but the implementation is behind the brand — it was built in a more ironic, self-deprecating register that was fine for a prototype but doesn't match where we're taking it. We're working through that now: new visual identity, proper fonts, light mode, The Letter launching when Issue #0 is ready. The bones are right.`,
    stack: ["Next.js", "Supabase", "Tailwind", "Ollama", "Vercel"],
    screenshots: []
  },
  {
    id: "eidetic",
    title: "Eidetic",
    url: null,
    tag: "Knowledge Graph • MCP",
    description: "I kept losing things I'd read. Built a Chrome extension + mobile app to capture anything, a FastAPI + pgvector backend to search it, and an MCP server so Claude can query my memory mid-conversation.",
    isComingSoon: false,
    lede: "I kept losing things I'd read. Not forgetting — losing. So I built my own memory system.",
    story: `The problem isn't forgetting. It's that the things I read live in twelve different places — some in Notion, some in Pocket, some in a browser tab I never closed, some just genuinely gone. When I want to find something, I know I read it, I can picture roughly when, but I can't locate it. Keyword search doesn't help because I don't remember the exact words. Notion search doesn't help because half the things I read never made it to Notion.

I wanted a system I could ask a question and get back the thing I was actually thinking of — not a list of keyword matches.

The architecture is: a Chrome extension that captures anything from the browser with one click, a React Native mobile app for on-the-go capture, a FastAPI backend that embeds everything with OpenAI's embedding model and stores it in pgvector, and an MCP server that exposes a search tool to Claude.

The MCP part is what I didn't expect to matter as much as it does. The first time I was in a Claude conversation — talking about something completely unrelated — and it pulled a note I'd saved six months earlier without me asking, I had to stop and read it again. It found a connection I'd forgotten I'd made. That's the version of memory I was trying to build.

The honest problem is capture habituation. The system only works if you consistently put things into it, and that habit is harder to build than the software was to write. I still reach for Notion by reflex. I'm better than I was, but it's not automatic yet. Which is a product problem more than a technical one, and I haven't solved it.`,
    stack: ["Python", "FastAPI", "pgvector", "PostgreSQL", "React Native", "Expo", "MCP", "Chrome Extension (MV3)"],
    screenshots: []
  },
  {
    id: "worldview",
    title: "Worldview",
    url: null,
    tag: "Data Viz • 3D Globe",
    description: "Started as a question: can you show where every tracked satellite actually is, right now? CelesTrak orbital data, satellite.js propagation, Mapbox GL v3 globe. You can scrub through time.",
    isComingSoon: false,
    lede: "Started with a simple question: where is every tracked satellite right now?",
    story: `CelesTrak publishes TLE data — Two-Line Element sets — for every tracked object in orbit. GPS satellites, the ISS, weather birds, Starlink, debris, all of it. The data is public. The math to turn those two lines into a real-world position exists. I wanted to see all of it on a globe at once.

I assumed someone had already built this well. I was wrong. There are some academic tools, some outdated Java applets, nothing that felt like it took the visualisation seriously. So I built it.

satellite.js handles the orbital mechanics — it implements SGP4, the same propagation algorithm used by the US Space Surveillance Network. You give it a TLE and a timestamp and it tells you exactly where that object is. Mapbox GL v3 renders the 3D globe. For each satellite at each frame, I'm converting orbital elements to ECEF coordinates to latitude, longitude, and altitude.

The moment that made it worth it: the first time I loaded the MEO belt — GPS and navigation satellites sitting at around 20,000 kilometres — and watched them populate into their slots around the globe. They're spread almost perfectly evenly. You can see why the GPS constellation is shaped the way it is. It stops being abstract.

The time scrubber is what I'm most happy with. You can pick any time — past or future — and watch the orbits run. The ISS at 90-minute increments, the Molniya orbits doing their highly elliptical thing, Starlink in their low-altitude planes.

The wall I keep hitting is performance. Five thousand satellites with trail calculations at 60fps is a lot. I've tried WebGL instancing and worker threads — still not there. The Mapbox layer approach has a ceiling that Three.js custom rendering might not. That's probably the next version.`,
    stack: ["Mapbox GL v3", "satellite.js", "Three.js", "CelesTrak", "Vite", "JavaScript"],
    screenshots: []
  },
  {
    id: "pather",
    title: "Pather",
    url: null,
    tag: "Privacy • Local-first",
    description: "Frustrated with Google Maps Timeline — too much of my life living in someone else's infra. Built my own GPS logger. Classifies movement, detects stops, builds a day timeline. All on-device.",
    isComingSoon: false,
    lede: "I wanted my location history back from Google. So I built my own.",
    story: `At some point I looked at Google Maps Timeline and realised I'd been handing them a detailed log of my life for years. Every place I'd been, every route I'd taken, timestamped and stored in their infrastructure. Not queryable by me. Not exportable in any useful format. Gone if I ever delete my account.

I wanted that data — but mine, not theirs. And I wanted it in a shape I could actually do something with.

Pather runs as a background task, even when the app is closed. Every position gets written to WatermelonDB — a SQLite-backed local database built for React Native — and it never leaves the device. No server, no pings home, nothing to leak.

The stop detection is the part I spent the most time on. Raw GPS logs are just a stream of coordinates. The useful question is: where did you actually go? The algorithm runs a sliding window over the position stream — if you stay within a radius for more than a few minutes, that's a stop. It reconstructs your day as a timeline of places and the movement between them.

It works better than I expected. It correctly identifies a lunch stop, knows when I got off the Metro, distinguishes between being at home and being stuck in traffic outside it. The first time I looked at a full day's timeline and it had everything right — arrived at the coffee shop at 10:15, left at 11:40, walked to the office — it felt accurate in a slightly unsettling way.

Battery usage on iOS is the honest problem. Apple's power management makes background GPS expensive, and I haven't found a configuration that gets accuracy without meaningful drain. It's not unusable, but it's not something I'd give to a non-technical user yet.`,
    stack: ["React Native", "Expo", "WatermelonDB", "SQLite", "Background Location API"],
    screenshots: []
  },
  {
    id: "bird-loader",
    title: "BIRD → Snowflake",
    url: "https://github.com/aaghran/bird-snowflake-loader",
    tag: "NLS • Benchmarking",
    description: "Nobody had built a Snowflake loader for the BIRD NL-to-SQL benchmark. I needed one for evaluating Spotter, so I built it and open-sourced it. 500 questions, 22 databases, 158+ tables.",
    isComingSoon: false,
    lede: "Nobody had built this. I needed it. So I built it and open-sourced it.",
    story: `BIRD is the standard NL-to-SQL benchmark. If you're building or evaluating a system that lets users query databases in plain English, BIRD is what you benchmark against — 500 questions, 22 databases, realistic enterprise complexity. Every serious paper uses it.

The problem is it ships with SQLite. If you're evaluating against Snowflake — which is where most enterprise analytics actually runs — you have to get the data there yourself. I looked for a loader. Nothing existed.

So I built one. The pipeline reads BIRD's SQLite schemas and data dumps, maps them to Snowflake types (more divergence than you'd expect — SQLite stores booleans as integers, dates as text, and has fairly loose type enforcement across rows), creates the databases and schemas, and runs parallel inserts with chunking for the larger tables. Error handling and resumability because nobody wants to restart a multi-gigabyte insert from scratch after a network drop.

Full load runs in under ten minutes. I open-sourced it because the gap was obviously going to bite other people too, and it did — a few teams picked it up for their own evaluations fairly quickly. That's probably the cleanest signal a utility tool can get: someone else had the same problem and your solution was close enough to just work for them.

The type inference got it wrong in a few edge cases that I documented rather than tried to auto-fix. When you're moving benchmark data around, it's better to be explicit about what didn't translate cleanly than to silently coerce something and get subtly wrong evaluation results.`,
    stack: ["Python", "Snowflake Connector", "pandas", "SQLite", "multiprocessing"],
    screenshots: []
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
    url: "https://aaghran.medium.com/going-back-900-years-at-hoysaleswara-temple-halebidu-trips-from-bangalore-wandering-bong-c7ca35f3c6ae",
    meta: "Medium • Travel",
    image: "assets/halebidu_temple.png"
  },
  {
    title: "Floating through the Mangroves of Sundarbans",
    url: "https://medium.com/wandering-bong-travel-blog/floating-through-the-mangroves-of-sundarbans-a-day-trip-from-kolkata-sundarban-national-park-9110f9a0dae3",
    meta: "Medium • Travel",
    image: "assets/sundarbans_mangrove.png"
  },
  {
    title: "Coffee Culture in Vietnam: Strong and Slow drip",
    url: "https://medium.com/wandering-bong-travel-blog/coffee-culture-in-vietnam-strong-and-slow-drip-wandering-bong-cd5435cf1a98",
    meta: "Medium • Travel",
    image: "assets/vietnam_coffee.png"
  },
  {
    title: "Impressive Forts in and around Bangalore",
    url: "https://medium.com/wandering-bong-travel-blog/impressive-forts-in-and-around-bangalore-day-trips-from-bangalore-wandering-bong-9249a93ffb34",
    meta: "Medium • Travel",
    image: "assets/bangalore_fort.png"
  },
  {
    title: "Why we Went Back to Thailand",
    url: "https://aaghran.medium.com/why-we-went-back-to-thailand-wandering-bong-ef1f8a0b105a",
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
