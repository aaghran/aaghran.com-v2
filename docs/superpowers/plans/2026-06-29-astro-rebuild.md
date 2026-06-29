# aaghran.com Astro Rebuild — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild aaghran.com from scratch as an Astro 4 static site — light/dark mode, forest green accent, long-scroll home page, real URL routing, Astro Content Collections for projects and writing.

**Architecture:** Replace the existing React+Vite SPA with an Astro project in the same repo. Content lives in typed JSON files under `src/content/`. All pages are static HTML at build time. Dark mode is toggled via a `dark` class on `<html>` with `localStorage` persistence and no flash on load.

**Tech Stack:** Astro 4, Tailwind CSS 3 (darkMode: 'class'), vanilla JS for interactivity, Astro Content Collections (JSON), Inter font (Google Fonts), Font Awesome 6 (CDN).

## Global Constraints

- Astro version: 4.x (`@astrojs/tailwind` integration)
- Tailwind version: 3.x
- No React, no Vue, no other framework — vanilla JS only for interactive islands
- Dark mode: `class` strategy, `dark` class on `<html>`, `localStorage` key `'theme'`
- Accent light: `#16a34a` / Accent dark: `#4ade80`
- Background light: `#fafaf9` / Background dark: `#111110`
- Font: Inter (Google Fonts)
- GA4 tag: `G-XWSY3N0FL5`
- Do NOT include: ai-cms project, Pather project, Roami, ClipMind, SeatView
- All copy tone: builder, not consultant. No "hire me", no "fractional PM"
- `public/assets/` images: copy from current project's `public/assets/`

---

## File Map

**Created:**
```
astro.config.mjs
tailwind.config.mjs
tsconfig.json
src/styles/global.css
src/layouts/Layout.astro
src/components/ProjectCard.astro
src/components/ArticleCard.astro
src/components/WorkCard.astro
src/components/PipelineDiagram.astro
src/components/EngagementsBlock.astro
src/content/config.ts
src/content/projects/wanderingbong.json
src/content/projects/eidetic.json
src/content/projects/lyaadh.json
src/content/projects/worldview.json
src/content/projects/bird-loader.json
src/content/writing/solo-developer.json
src/content/writing/ai-interns-hands.json
src/content/writing/over-engineered-blog.json
src/content/writing/halebidu-temple.json
src/content/writing/sundarbans.json
src/content/writing/vietnam-coffee.json
src/content/writing/bangalore-forts.json
src/content/writing/thailand-return.json
src/data/work.ts
src/pages/index.astro
src/pages/projects/index.astro
src/pages/projects/[id].astro
src/pages/work.astro
src/pages/writing.astro
```

**Deleted** (old React+Vite project):
```
src/App.jsx
src/main.jsx
src/data.js
src/pages/AboutMe.jsx
src/pages/Projects.jsx
src/pages/Work.jsx
src/pages/Writing.jsx
src/pages/ProjectDetails.jsx
src/components/PipelineDiagram.jsx  (replaced by .astro version)
vite.config.js
eslint.config.js
```

**Modified:**
```
package.json       (swap vite/react deps for astro/tailwind)
index.html         (deleted — Astro generates this)
.gitignore         (add .superpowers/, dist/)
```

---

### Task 1: Scaffold Astro project + Tailwind + global styles

**Files:**
- Create: `astro.config.mjs`
- Create: `tailwind.config.mjs`
- Create: `tsconfig.json`
- Create: `src/styles/global.css`
- Modify: `package.json`
- Modify: `.gitignore`
- Delete: `vite.config.js`, `eslint.config.js`, `index.html`, `src/App.jsx`, `src/main.jsx`, `src/data.js`, all files under `src/pages/` (old JSX), `src/components/PipelineDiagram.jsx`

**Interfaces:**
- Produces: working Astro dev server at `http://localhost:4321`, Tailwind available, CSS variables for all color tokens defined in global.css

- [ ] **Step 1: Install Astro and Tailwind, remove old deps**

```bash
npm install astro @astrojs/tailwind tailwind
npm remove react react-dom @vitejs/plugin-react vite vanilla-tilt
```

Expected: `node_modules` updated, no errors.

- [ ] **Step 2: Create `astro.config.mjs`**

```js
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()],
  site: 'https://aaghran.com',
});
```

- [ ] **Step 3: Create `tailwind.config.mjs`**

```js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{astro,html,js,ts}'],
  theme: {
    extend: {
      colors: {
        canvas:         'var(--color-bg)',
        surface:        'var(--color-bg-card)',
        accent:         'var(--color-accent)',
        'accent-subtle':'var(--color-accent-bg)',
        'accent-ring':  'var(--color-accent-border)',
        line:           'var(--color-border)',
        ink:            'var(--color-text)',
        'ink-muted':    'var(--color-text-muted)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.05em',
      },
    },
  },
};
```

- [ ] **Step 4: Create `src/styles/global.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --color-bg:           #fafaf9;
    --color-bg-card:      #ffffff;
    --color-text:         #111111;
    --color-text-muted:   #6b7280;
    --color-accent:       #16a34a;
    --color-accent-bg:    #f0fdf4;
    --color-accent-border:#86efac;
    --color-border:       #e5e7eb;
  }

  .dark {
    --color-bg:           #111110;
    --color-bg-card:      #1c1c1a;
    --color-text:         #f5f5f4;
    --color-text-muted:   #a8a29e;
    --color-accent:       #4ade80;
    --color-accent-bg:    #052e16;
    --color-accent-border:#166534;
    --color-border:       #292524;
  }

  html {
    background-color: var(--color-bg);
    color: var(--color-text);
    font-family: 'Inter', system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  ::selection {
    background: var(--color-accent);
    color: #000;
  }
}
```

- [ ] **Step 5: Create `tsconfig.json`**

```json
{
  "extends": "astro/tsconfigs/strictest",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@components/*": ["src/components/*"],
      "@layouts/*":    ["src/layouts/*"],
      "@data/*":       ["src/data/*"]
    }
  }
}
```

- [ ] **Step 6: Update `.gitignore`**

Add these lines to the existing `.gitignore`:
```
dist/
.superpowers/
.astro/
```

- [ ] **Step 7: Delete old React files**

```bash
rm -f vite.config.js eslint.config.js index.html
rm -f src/App.jsx src/main.jsx src/data.js src/index.css
rm -rf src/pages src/assets
rm -f src/components/PipelineDiagram.jsx
```

- [ ] **Step 8: Create minimal `src/pages/index.astro` to verify Astro boots**

```astro
---
---
<html lang="en">
  <head><meta charset="UTF-8" /><title>Aaghran Ghosh</title></head>
  <body><h1>Coming soon</h1></body>
</html>
```

- [ ] **Step 9: Update `package.json` scripts**

Replace the `scripts` section with:
```json
"scripts": {
  "dev":   "astro dev",
  "build": "astro build",
  "preview": "astro preview"
}
```

- [ ] **Step 10: Verify Astro boots**

```bash
npm run dev
```

Expected output includes: `astro v4.x.x started` and `Local: http://localhost:4321/`. Open `http://localhost:4321` — should show "Coming soon" heading.

- [ ] **Step 11: Commit**

```bash
git add -A
git commit -m "feat: scaffold Astro 4 + Tailwind, replace React+Vite"
```

---

### Task 2: Content collections + data migration

**Files:**
- Create: `src/content/config.ts`
- Create: `src/content/projects/wanderingbong.json`
- Create: `src/content/projects/eidetic.json`
- Create: `src/content/projects/lyaadh.json`
- Create: `src/content/projects/worldview.json`
- Create: `src/content/projects/bird-loader.json`
- Create: `src/content/writing/solo-developer.json`
- Create: `src/content/writing/ai-interns-hands.json`
- Create: `src/content/writing/over-engineered-blog.json`
- Create: `src/content/writing/halebidu-temple.json`
- Create: `src/content/writing/sundarbans.json`
- Create: `src/content/writing/vietnam-coffee.json`
- Create: `src/content/writing/bangalore-forts.json`
- Create: `src/content/writing/thailand-return.json`
- Create: `src/data/work.ts`

**Interfaces:**
- Produces:
  - `getCollection('projects')` → array of entries with `id: string` and `data: ProjectData`
  - `getCollection('writing')` → array of entries with `id: string` and `data: WritingData`
  - `import { workExperience } from '@data/work'` → `WorkEntry[]`

- [ ] **Step 1: Create `src/content/config.ts`**

```ts
import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    tag: z.string(),
    description: z.string(),
    lede: z.string(),
    story: z.string(),
    stack: z.array(z.string()),
    url: z.string().nullable(),
    showPipelineDiagram: z.boolean().default(false),
  }),
});

const writing = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    url: z.string(),
    meta: z.string(),
    image: z.string().nullable(),
  }),
});

export const collections = { projects, writing };
```

- [ ] **Step 2: Create `src/content/projects/wanderingbong.json`**

```json
{
  "title": "WanderingBong",
  "tag": "AI Pipeline · Production",
  "description": "My slow travel blog, rebuilt around a custom AI pipeline. Trip notes go in, published posts come out. Custom CMS, MCP server, Claude API, and a Telegram capture bot — all running in production.",
  "lede": "My slow travel blog. I got tired of my own publishing workflow and rebuilt the whole thing from scratch.",
  "story": "I've been travel writing for a while. The blog existed before the CMS, before the agent, before any of this — it was just a WordPress site with a Notion folder full of notes I kept meaning to turn into posts. The problem was always the same: too many steps between having the trip and having the post.\n\nI rebuilt the whole thing. The current stack: a Node.js/Express CMS backend on EC2, PostgreSQL via Supabase, and a Next.js frontend. But the interesting part is the AI layer on top of it.\n\nThe capture pipeline starts on Telegram. When I'm traveling and want to capture something — a restaurant, a moment, a temple — I send it to a bot. The bot routes it through Railway to the CMS, where it lands as a raw journal entry. No friction at the point of capture.\n\nThe publishing pipeline is where the AI lives. I built cms-mcp — a custom MCP server that gives Claude full context about my content: what's published, what destinations I've written about, what's sitting in the journal backlog untouched. A Google ADK agent reads the raw journal entries and drafts posts in my voice, informed by everything I've already written. I review, edit lightly, publish.\n\nThe first time I ran the full pipeline, five Thailand posts came out in an afternoon. They sounded like me — not because I prompted it carefully, but because the agent had read two years of my writing first.\n\nThe MCP integration is what I didn't expect to matter as much as it does. I can be editing a post in Claude and ask what else I've written about the same region, and it just knows.\n\nI write slowly and only from places I've actually been. Thailand keeps pulling me back. Karnataka is underrated. The blog is the best argument for the pipeline — if you want to see what it produces, just read it.",
  "stack": ["Google ADK", "MCP (cms-mcp)", "Node.js", "Express", "PostgreSQL", "Supabase", "Next.js", "EC2", "Railway", "Telegram Bot API", "Claude API"],
  "url": "https://wanderingbong.com",
  "showPipelineDiagram": true
}
```

- [ ] **Step 3: Create `src/content/projects/eidetic.json`**

```json
{
  "title": "Eidetic",
  "tag": "Knowledge Graph · MCP",
  "description": "I kept losing things I'd read. Built a Chrome extension + mobile app to capture anything, a FastAPI + pgvector backend to search it, and an MCP server so Claude can query my memory mid-conversation.",
  "lede": "I kept losing things I'd read. Not forgetting — losing. So I built my own memory system.",
  "story": "The problem isn't forgetting. It's that the things I read live in twelve different places — some in Notion, some in Pocket, some in a browser tab I never closed, some just genuinely gone. When I want to find something, I know I read it, I can picture roughly when, but I can't locate it. Keyword search doesn't help because I don't remember the exact words.\n\nI wanted a system I could ask a question and get back the thing I was actually thinking of — not a list of keyword matches.\n\nThe architecture is: a Chrome extension that captures anything from the browser with one click, a React Native mobile app for on-the-go capture, a FastAPI backend that embeds everything with OpenAI's embedding model and stores it in pgvector, and an MCP server that exposes a search tool to Claude.\n\nThe MCP part is what I didn't expect to matter as much as it does. The first time I was in a Claude conversation — talking about something completely unrelated — and it pulled a note I'd saved six months earlier without me asking, I had to stop and read it again. It found a connection I'd forgotten I'd made. That's the version of memory I was trying to build.\n\nThe honest problem is capture habituation. The system only works if you consistently put things into it, and that habit is harder to build than the software was to write. Which is a product problem more than a technical one, and I haven't solved it.",
  "stack": ["Python", "FastAPI", "pgvector", "PostgreSQL", "React Native", "Expo", "MCP", "Chrome Extension (MV3)"],
  "url": null,
  "showPipelineDiagram": false
}
```

- [ ] **Step 4: Create `src/content/projects/lyaadh.json`**

```json
{
  "title": "Lyaadh",
  "tag": "Brand · Live",
  "description": "Bengali for the art of pleasurable lethargy. A brand — not an app. ShortCuts (a Task Shrinker with a Coma Mode), Dokan (curated gear for doing nothing), Escapes. Tagline: The Art of Productive Laziness.",
  "lede": "Bengali for the art of pleasurable lethargy. I wanted to build something slower.",
  "story": "Lyaadh is a Bengali word with no clean English translation. It's the feeling of lying around on a Sunday afternoon not because you're tired, but because you've consciously decided the world can wait. My family uses it. It carries something that \"rest\" or \"laziness\" doesn't — it's not an apology for doing nothing, it's a chosen state.\n\nI couldn't find a brand for this. Everything in the productivity and wellness space either hustles you or makes you feel guilty for not hustling. I wanted something that took the slower pace seriously — not as recovery, just as a way of being.\n\nThe brand has four pillars. The Dokan is a curated shop — things worth owning because they make slowness better, not more efficient. ShortCuts is the tool: a task shrinker that finds the minimum viable version of whatever you're trying to do, including a Coma Mode for when even that is too much. Escapes is slow travel. And The Letter is a weekly newsletter written by my wife — short essays, no lists, no tips, just a voice that gives you permission to exhale.\n\nThe partnership is the best part of it. She writes, I build. Her editorial instinct and my product instinct are genuinely different, and the brand is better for it.",
  "stack": ["Next.js", "Supabase", "Tailwind", "Ollama", "Vercel"],
  "url": "https://lyaadh.com",
  "showPipelineDiagram": false
}
```

- [ ] **Step 5: Create `src/content/projects/worldview.json`**

```json
{
  "title": "Worldview",
  "tag": "Data Viz · 3D Globe",
  "description": "Started as a question: can you show where every tracked satellite actually is, right now? CelesTrak orbital data, satellite.js propagation, Mapbox GL v3 globe. You can scrub through time.",
  "lede": "Started with a simple question: where is every tracked satellite right now?",
  "story": "CelesTrak publishes TLE data — Two-Line Element sets — for every tracked object in orbit. GPS satellites, the ISS, weather birds, Starlink, debris, all of it. The data is public. The math to turn those two lines into a real-world position exists. I wanted to see all of it on a globe at once.\n\nI assumed someone had already built this well. I was wrong. There are some academic tools, some outdated Java applets, nothing that felt like it took the visualisation seriously. So I built it.\n\nsatellite.js handles the orbital mechanics — it implements SGP4, the same propagation algorithm used by the US Space Surveillance Network. You give it a TLE and a timestamp and it tells you exactly where that object is. Mapbox GL v3 renders the 3D globe.\n\nThe moment that made it worth it: the first time I loaded the MEO belt — GPS and navigation satellites sitting at around 20,000 kilometres — and watched them populate into their slots around the globe. They're spread almost perfectly evenly. You can see why the GPS constellation is shaped the way it is. It stops being abstract.\n\nThe time scrubber is what I'm most happy with. You can pick any time — past or future — and watch the orbits run.\n\nThe wall I keep hitting is performance. Five thousand satellites with trail calculations at 60fps is a lot. That's probably the next version.",
  "stack": ["Mapbox GL v3", "satellite.js", "Three.js", "CelesTrak", "Vite", "JavaScript"],
  "url": null,
  "showPipelineDiagram": false
}
```

- [ ] **Step 6: Create `src/content/projects/bird-loader.json`**

```json
{
  "title": "BIRD → Snowflake",
  "tag": "NLS · Benchmarking",
  "description": "Nobody had built a Snowflake loader for the BIRD NL-to-SQL benchmark. I needed one for evaluating Spotter, so I built it and open-sourced it. 500 questions, 22 databases, 158+ tables.",
  "lede": "Nobody had built this. I needed it. So I built it and open-sourced it.",
  "story": "BIRD is the standard NL-to-SQL benchmark. If you're building or evaluating a system that lets users query databases in plain English, BIRD is what you benchmark against — 500 questions, 22 databases, realistic enterprise complexity. Every serious paper uses it.\n\nThe problem is it ships with SQLite. If you're evaluating against Snowflake — which is where most enterprise analytics actually runs — you have to get the data there yourself. I looked for a loader. Nothing existed.\n\nSo I built one. The pipeline reads BIRD's SQLite schemas and data dumps, maps them to Snowflake types (more divergence than you'd expect — SQLite stores booleans as integers, dates as text, and has fairly loose type enforcement across rows), creates the databases and schemas, and runs parallel inserts with chunking for the larger tables.\n\nFull load runs in under ten minutes. I open-sourced it because the gap was obviously going to bite other people too, and it did — a few teams picked it up for their own evaluations fairly quickly. That's probably the cleanest signal a utility tool can get: someone else had the same problem and your solution was close enough to just work for them.",
  "stack": ["Python", "Snowflake Connector", "pandas", "SQLite", "multiprocessing"],
  "url": "https://github.com/aaghran/bird-snowflake-loader",
  "showPipelineDiagram": false
}
```

- [ ] **Step 7: Create the 8 writing JSON files**

`src/content/writing/solo-developer.json`:
```json
{
  "title": "I Am No Longer a Solo Developer: Lessons from Managing a Team of Agents",
  "url": "https://aaghran.substack.com/p/i-am-no-longer-a-solo-developer-lessons",
  "meta": "Substack · Jan 2026",
  "image": "https://substackcdn.com/image/fetch/$s_!5m3f!,w_1200,h_675,c_fill,f_jpg,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff9084c0e-9d7a-477f-b233-bc131b345ae2_1024x559.png"
}
```

`src/content/writing/ai-interns-hands.json`:
```json
{
  "title": "Giving My AI Interns \"Hands\": How I Use MCP to Connect LLMs to Production",
  "url": "https://aaghran.substack.com/p/giving-my-ai-interns-hands-how-i",
  "meta": "Substack · Jan 2026",
  "image": "https://substackcdn.com/image/fetch/$s_!koKU!,w_1200,h_675,c_fill,f_jpg,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6892c464-b322-4705-b72c-e40445bb6812_2600x1418.png"
}
```

`src/content/writing/over-engineered-blog.json`:
```json
{
  "title": "Why I Over-Engineered My Personal Blog",
  "url": "https://aaghran.substack.com/p/why-i-over-engineered-my-personal",
  "meta": "Substack · Jan 2026",
  "image": "https://substackcdn.com/image/fetch/$s_!GIvr!,w_1200,h_675,c_fill,f_jpg,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F51b0aa94-735d-428c-9d41-0f59558a5439_2816x1536.png"
}
```

`src/content/writing/halebidu-temple.json`:
```json
{
  "title": "Going back 900 years at Hoysaleswara Temple Halebidu",
  "url": "https://aaghran.medium.com/going-back-900-years-at-hoysaleswara-temple-halebidu-trips-from-bangalore-wandering-bong-c7ca35f3c6ae",
  "meta": "Medium · Travel",
  "image": "/assets/halebidu_temple.png"
}
```

`src/content/writing/sundarbans.json`:
```json
{
  "title": "Floating through the Mangroves of Sundarbans",
  "url": "https://medium.com/wandering-bong-travel-blog/floating-through-the-mangroves-of-sundarbans-a-day-trip-from-kolkata-sundarban-national-park-9110f9a0dae3",
  "meta": "Medium · Travel",
  "image": "/assets/sundarbans_mangrove.png"
}
```

`src/content/writing/vietnam-coffee.json`:
```json
{
  "title": "Coffee Culture in Vietnam: Strong and Slow drip",
  "url": "https://medium.com/wandering-bong-travel-blog/coffee-culture-in-vietnam-strong-and-slow-drip-wandering-bong-cd5435cf1a98",
  "meta": "Medium · Travel",
  "image": "/assets/vietnam_coffee.png"
}
```

`src/content/writing/bangalore-forts.json`:
```json
{
  "title": "Impressive Forts in and around Bangalore",
  "url": "https://medium.com/wandering-bong-travel-blog/impressive-forts-in-and-around-bangalore-day-trips-from-bangalore-wandering-bong-9249a93ffb34",
  "meta": "Medium · Travel",
  "image": "/assets/bangalore_fort.png"
}
```

`src/content/writing/thailand-return.json`:
```json
{
  "title": "Why we Went Back to Thailand",
  "url": "https://aaghran.medium.com/why-we-went-back-to-thailand-wandering-bong-ef1f8a0b105a",
  "meta": "Medium · Travel",
  "image": "/assets/thailand_beach.png"
}
```

- [ ] **Step 8: Create `src/data/work.ts`**

```ts
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
    role: "Product Manager → UI Developer",
    duration: "June 2015 – December 2017",
    location: "Bengaluru",
    bullets: [
      "Drove 200% increase in organic traffic through automated SEO products across 8 countries and 5 languages.",
      "Managed a team of 4 front-end developers, architecting a multi-language content system on Node.js, Redis, and Java."
    ]
  }
];
```

- [ ] **Step 9: Verify content collections load**

Update `src/pages/index.astro` temporarily:
```astro
---
import { getCollection } from 'astro:content';
const projects = await getCollection('projects');
const writing = await getCollection('writing');
---
<html><body>
  <p>Projects: {projects.length}</p>
  <p>Writing: {writing.length}</p>
</body></html>
```

Run `npm run dev`. Open `http://localhost:4321`. Expected: `Projects: 5` and `Writing: 8`. If Astro throws a type error, check that `src/content/config.ts` is correctly named and the JSON files match the schema.

- [ ] **Step 10: Commit**

```bash
git add src/content src/data astro.config.mjs tailwind.config.mjs tsconfig.json src/styles/global.css .gitignore
git commit -m "feat: content collections, data migration, global styles"
```

---

### Task 3: Layout.astro — nav, footer, dark mode

**Files:**
- Create: `src/layouts/Layout.astro`

**Interfaces:**
- Consumes: `title?: string`, `description?: string` props
- Produces: `<Layout title="...">` wrapper component used by every page. Includes sticky nav with dark mode toggle, footer with social links, GA4 script, Inter font.

- [ ] **Step 1: Create `src/layouts/Layout.astro`**

```astro
---
interface Props {
  title?: string;
  description?: string;
}
const {
  title = 'Aaghran Ghosh — AI Builder',
  description = 'I scope and build the AI layer. MCP integrations, agentic pipelines, and the product thinking around them.',
} = Astro.props;
---
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />

    <!-- Dark mode: inline to prevent FOUC -->
    <script is:inline>
      const theme = localStorage.getItem('theme') ??
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', theme === 'dark');
    </script>

    <!-- GA4 -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-XWSY3N0FL5" is:inline></script>
    <script is:inline>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-XWSY3N0FL5');
    </script>
  </head>
  <body class="bg-canvas text-ink">

    <!-- Nav -->
    <nav class="sticky top-0 z-50 bg-canvas border-b border-line">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
        <a href="/" class="text-sm font-extrabold tracking-tight text-ink hover:text-accent transition-colors">
          aaghran.com
        </a>
        <div class="flex items-center gap-5">
          <a href="/projects" class="text-xs text-ink-muted hover:text-ink transition-colors">Projects</a>
          <a href="/work"     class="text-xs text-ink-muted hover:text-ink transition-colors">Work</a>
          <a href="/writing"  class="text-xs text-ink-muted hover:text-ink transition-colors">Writing</a>

          <!-- Dark mode toggle -->
          <button id="theme-toggle" aria-label="Toggle dark mode"
            class="text-ink-muted hover:text-ink transition-colors w-5 h-5 flex items-center justify-center">
            <!-- Sun (shown in dark mode) -->
            <svg id="icon-sun" xmlns="http://www.w3.org/2000/svg" class="hidden dark:block w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
              <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
            <!-- Moon (shown in light mode) -->
            <svg id="icon-moon" xmlns="http://www.w3.org/2000/svg" class="block dark:hidden w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          </button>

          <a href="mailto:aaghran@gmail.com"
            class="text-xs bg-ink text-canvas px-3 py-1.5 rounded-full hover:opacity-80 transition-opacity whitespace-nowrap">
            Let's talk →
          </a>
        </div>
      </div>
    </nav>

    <!-- Page content -->
    <main>
      <slot />
    </main>

    <!-- Footer -->
    <footer class="border-t border-line mt-20">
      <div class="max-w-4xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p class="text-xs text-ink-muted leading-relaxed">
          Bangalore, India ·
          <a href="mailto:aaghran@gmail.com" class="text-accent hover:underline">aaghran@gmail.com</a>
          · Available for selective AI product engagements
        </p>
        <div class="flex items-center gap-4">
          <a href="https://linkedin.com/in/aaghran" target="_blank" rel="noreferrer" class="text-ink-muted hover:text-ink transition-colors text-sm"><i class="fa-brands fa-linkedin"></i></a>
          <a href="https://github.com/aaghran"       target="_blank" rel="noreferrer" class="text-ink-muted hover:text-ink transition-colors text-sm"><i class="fa-brands fa-github"></i></a>
          <a href="https://wanderingbong.com"         target="_blank" rel="noreferrer" class="text-ink-muted hover:text-ink transition-colors text-sm"><i class="fa-solid fa-compass"></i></a>
          <a href="https://aaghran.substack.com"      target="_blank" rel="noreferrer" class="text-ink-muted hover:text-ink transition-colors text-sm"><i class="fa-solid fa-pen-nib"></i></a>
        </div>
      </div>
    </footer>

    <!-- Dark mode toggle script -->
    <script>
      document.getElementById('theme-toggle')?.addEventListener('click', () => {
        const isDark = document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
      });
    </script>
  </body>
</html>
```

- [ ] **Step 2: Update `src/pages/index.astro` to use Layout**

```astro
---
import Layout from '../layouts/Layout.astro';
---
<Layout>
  <div class="max-w-4xl mx-auto px-6 py-20">
    <h1 class="text-4xl font-black">Hello Astro</h1>
  </div>
</Layout>
```

- [ ] **Step 3: Verify**

Run `npm run dev`. Check:
- Nav appears with `aaghran.com`, Projects, Work, Writing, moon icon, `Let's talk →` pill
- Moon icon click toggles dark mode — background changes between `#fafaf9` and `#111110`
- Reload in dark mode — no white flash before dark background applies
- Footer shows email and social icons

- [ ] **Step 4: Commit**

```bash
git add src/layouts/Layout.astro src/pages/index.astro
git commit -m "feat: Layout.astro with nav, footer, dark mode toggle"
```

---

### Task 4: Shared components

**Files:**
- Create: `src/components/ProjectCard.astro`
- Create: `src/components/ArticleCard.astro`
- Create: `src/components/WorkCard.astro`
- Create: `src/components/PipelineDiagram.astro`
- Create: `src/components/EngagementsBlock.astro`

**Interfaces:**
- `ProjectCard`: props `title: string, tag: string, description: string, url: string | null, href: string`
- `ArticleCard`: props `title: string, meta: string, url: string, image: string | null`
- `WorkCard`: props `company: string, role: string, duration: string, location: string, bullets: string[], expanded?: boolean`
- `PipelineDiagram`: no props — self-contained SVG
- `EngagementsBlock`: no props — self-contained section

- [ ] **Step 1: Create `src/components/ProjectCard.astro`**

```astro
---
interface Props {
  title: string;
  tag: string;
  description: string;
  url: string | null;
  href: string;
}
const { title, tag, description, url, href } = Astro.props;
---
<a href={href}
  class="block bg-surface border border-line rounded-xl p-5 hover:border-accent-ring transition-colors group no-underline">
  <div class="flex items-start justify-between gap-3 mb-3">
    <h3 class="text-sm font-bold text-ink leading-snug group-hover:text-accent transition-colors">
      {title}
      {url && <i class="fa-solid fa-arrow-up-right-from-square text-[10px] ml-1 opacity-50"></i>}
    </h3>
    <span class="text-[10px] text-ink-muted bg-canvas border border-line rounded-full px-2 py-0.5 whitespace-nowrap shrink-0">
      {tag}
    </span>
  </div>
  <p class="text-xs text-ink-muted leading-relaxed">{description}</p>
</a>
```

- [ ] **Step 2: Create `src/components/ArticleCard.astro`**

```astro
---
interface Props {
  title: string;
  meta: string;
  url: string;
  image: string | null;
}
const { title, meta, url, image } = Astro.props;
---
<a href={url} target="_blank" rel="noreferrer"
  class="block bg-surface border border-line rounded-xl overflow-hidden hover:border-accent-ring transition-colors group no-underline">
  {image && (
    <div class="h-32 bg-cover bg-center bg-no-repeat"
      style={`background-image: url(${image})`}></div>
  )}
  <div class="p-4">
    <p class="text-[10px] text-ink-muted mb-2">{meta}</p>
    <h3 class="text-xs font-bold text-ink leading-snug mb-3 group-hover:text-accent transition-colors line-clamp-3">
      {title}
    </h3>
    <span class="text-[10px] text-accent font-semibold">Read →</span>
  </div>
</a>
```

- [ ] **Step 3: Create `src/components/WorkCard.astro`**

```astro
---
interface Props {
  company: string;
  role: string;
  duration: string;
  location: string;
  bullets: string[];
  expanded?: boolean;
}
const { company, role, duration, location, bullets, expanded = false } = Astro.props;
---
<div class="bg-surface border border-line rounded-xl p-5">
  <div class="flex items-start justify-between gap-4 flex-wrap mb-4">
    <div>
      <h3 class="text-sm font-bold text-ink">{role}</h3>
      <p class="text-xs text-ink-muted mt-0.5">{company} · {location}</p>
    </div>
    <span class="text-[10px] text-ink-muted border border-line rounded-full px-2 py-0.5 whitespace-nowrap">
      {duration}
    </span>
  </div>
  <ul class="space-y-2">
    {(expanded ? bullets : bullets.slice(0, 1)).map(b => (
      <li class="text-xs text-ink-muted leading-relaxed flex gap-2">
        <span class="text-accent mt-0.5 shrink-0">·</span>
        <span>{b}</span>
      </li>
    ))}
  </ul>
</div>
```

- [ ] **Step 4: Create `src/components/PipelineDiagram.astro`**

```astro
---
const nodes = [
  { label: 'Trip Notes', sub: 'Telegram Bot', icon: '✈' },
  { label: 'cms-mcp',    sub: 'MCP Server',   icon: '⚙' },
  { label: 'Claude API', sub: 'ADK Agent',    icon: '◈', highlight: true },
  { label: 'CMS',        sub: 'Supabase',     icon: '⬡' },
  { label: 'Post',       sub: 'Published',    icon: '✦' },
];
---
<div class="w-full overflow-x-auto py-2">
  <svg viewBox="0 0 660 120" xmlns="http://www.w3.org/2000/svg"
    class="w-full max-w-[660px]" aria-label="WanderingBong publishing pipeline">

    {nodes.map((n, i) => {
      const x = 10 + i * 130;
      const cx = x + 50;
      return (
        <>
          {/* Connector line */}
          {i < nodes.length - 1 && (
            <line
              x1={x + 100} y1="60"
              x2={x + 130} y2="60"
              stroke="var(--color-accent-border)"
              stroke-width="1.5"
              stroke-dasharray="4 3"
            />
          )}
          {/* Arrow */}
          {i < nodes.length - 1 && (
            <polygon
              points={`${x+128},56 ${x+135},60 ${x+128},64`}
              style="fill: var(--color-accent-border)"
            />
          )}
          {/* Card background */}
          <rect
            x={x} y="28" width="100" height="64" rx="8"
            style={n.highlight
              ? 'fill: #fef9c3; stroke: #fcd34d; stroke-width: 1.5'
              : 'fill: var(--color-bg-card); stroke: var(--color-border); stroke-width: 1'}
          />
          {/* Icon */}
          <text x={cx} y="52" text-anchor="middle"
            style="fill: var(--color-accent); font-size: 14px;">
            {n.icon}
          </text>
          {/* Label */}
          <text x={cx} y="68" text-anchor="middle"
            style="fill: var(--color-text); font-size: 9px; font-weight: 700; font-family: Inter, sans-serif;">
            {n.label}
          </text>
          {/* Sub */}
          <text x={cx} y="82" text-anchor="middle"
            style="fill: var(--color-text-muted); font-size: 7.5px; font-family: Inter, sans-serif;">
            {n.sub}
          </text>
        </>
      );
    })}
  </svg>
</div>
```

- [ ] **Step 5: Create `src/components/EngagementsBlock.astro`**

```astro
---
---
<div class="bg-accent-subtle border border-accent-ring rounded-2xl p-8">
  <p class="text-[10px] text-accent font-bold tracking-[0.15em] uppercase mb-4">
    Selective Engagements
  </p>
  <h2 class="text-2xl font-black text-ink tracking-tightest leading-tight mb-4">
    Fixed scope. Fixed price.<br/>AI product layer, shipped.
  </h2>
  <p class="text-sm text-ink-muted leading-relaxed mb-6 max-w-lg">
    B2B SaaS teams adding AI to analytics or search. Startups with strong engineers
    but no one who's shipped an AI feature before. Enterprise teams building internal
    AI tooling who need product thinking at scale.
  </p>
  <div class="flex flex-wrap gap-x-6 gap-y-2 mb-6 text-xs text-ink-muted">
    <span><span class="text-accent mr-1">✓</span> MCP integrations</span>
    <span><span class="text-accent mr-1">✓</span> Agentic pipelines</span>
    <span><span class="text-accent mr-1">✓</span> AI product specs</span>
    <span><span class="text-accent mr-1">✓</span> Evaluation frameworks</span>
  </div>
  <div class="pt-5 border-t border-accent-ring">
    <a href="mailto:aaghran@gmail.com"
      class="text-sm text-accent font-bold hover:underline">
      aaghran@gmail.com →
    </a>
  </div>
</div>
```

- [ ] **Step 6: Smoke test all components on index.astro**

Update `src/pages/index.astro` to import and render each component once:
```astro
---
import Layout from '../layouts/Layout.astro';
import ProjectCard from '../components/ProjectCard.astro';
import ArticleCard from '../components/ArticleCard.astro';
import WorkCard from '../components/WorkCard.astro';
import PipelineDiagram from '../components/PipelineDiagram.astro';
import EngagementsBlock from '../components/EngagementsBlock.astro';
---
<Layout>
  <div class="max-w-4xl mx-auto px-6 py-12 space-y-8">
    <ProjectCard title="Test Project" tag="Tag" description="Desc" url="https://example.com" href="/projects/test" />
    <ArticleCard title="Test Article" meta="Substack · Jan 2026" url="https://example.com" image={null} />
    <WorkCard company="ThoughtSpot" role="Principal PM" duration="2024–Present" location="Bengaluru" bullets={["Built Spotter"]} />
    <PipelineDiagram />
    <EngagementsBlock />
  </div>
</Layout>
```

Run `npm run dev`. Verify all 5 components render with correct colors in light AND dark mode (toggle with the nav button).

- [ ] **Step 7: Commit**

```bash
git add src/components
git commit -m "feat: shared components — ProjectCard, ArticleCard, WorkCard, PipelineDiagram, EngagementsBlock"
```

---

### Task 5: Home page

**Files:**
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: `getCollection('projects')`, `getCollection('writing')`, all 5 shared components, `Layout.astro`
- Produces: `/` — full long-scroll home page matching the spec

- [ ] **Step 1: Replace `src/pages/index.astro` with the full home page**

```astro
---
import Layout from '../layouts/Layout.astro';
import PipelineDiagram from '../components/PipelineDiagram.astro';
import EngagementsBlock from '../components/EngagementsBlock.astro';
import ArticleCard from '../components/ArticleCard.astro';
import { getCollection } from 'astro:content';

const writing = await getCollection('writing');
const featuredWriting = writing.slice(0, 3);
---
<Layout>

  <!-- Hero -->
  <section class="max-w-4xl mx-auto px-6 pt-20 pb-16 border-b border-line relative overflow-hidden">
    <div class="pointer-events-none select-none absolute right-8 top-8 text-[120px] font-black leading-none opacity-[0.04] text-ink">AI</div>
    <p class="text-[10px] text-accent font-bold tracking-[0.2em] uppercase mb-5">
      AI Builder · AI PM · Bangalore
    </p>
    <h1 class="text-5xl font-black text-ink tracking-tightest leading-[1.02] mb-6 max-w-xl">
      I scope and<br/>build the AI layer.
    </h1>
    <p class="text-sm text-ink-muted leading-relaxed max-w-[420px] mb-8">
      MCP integrations, agentic pipelines, agent frameworks — and the product thinking around them.
      Principal PM at ThoughtSpot by day. Building on my own terms the rest of the time.
    </p>
    <div class="flex items-center gap-4 flex-wrap">
      <a href="#work" class="text-xs bg-ink text-canvas px-4 py-2 rounded-lg hover:opacity-80 transition-opacity">
        See what I've built ↓
      </a>
      <span class="text-xs text-ink-muted">
        or email <a href="mailto:aaghran@gmail.com" class="text-accent font-semibold hover:underline">aaghran@gmail.com</a>
      </span>
    </div>
  </section>

  <!-- Currently strip -->
  <div class="bg-accent-subtle border-b border-accent-ring">
    <div class="max-w-4xl mx-auto px-6 py-3 flex items-center gap-4 flex-wrap">
      <span class="text-[10px] text-accent font-bold tracking-[0.15em] uppercase shrink-0">Currently</span>
      <div class="w-px h-4 bg-accent-ring shrink-0"></div>
      <p class="text-xs text-ink">
        Principal PM @ <strong>ThoughtSpot</strong> — building Spotter, an AI analytics agent used by enterprises
      </p>
      <span class="ml-auto text-[10px] bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2.5 py-1 rounded-full font-semibold whitespace-nowrap">
        ● Active
      </span>
    </div>
  </div>

  <!-- Selected Work -->
  <section id="work" class="max-w-4xl mx-auto px-6 py-16">
    <p class="text-[10px] text-ink-muted tracking-[0.25em] uppercase mb-10">Selected Work</p>

    <!-- 01 WanderingBong -->
    <div class="grid md:grid-cols-2 gap-8 pb-12 border-b border-line mb-12 items-start">
      <div>
        <p class="text-[10px] text-ink-muted mb-3 tracking-wide">01 — AI Pipeline · Production</p>
        <h2 class="text-2xl font-black text-ink tracking-tightest mb-4">WanderingBong</h2>
        <p class="text-sm text-ink-muted leading-relaxed mb-5">
          A slow travel blog rebuilt around a custom AI pipeline.
          Telegram capture → MCP server → Claude API agent → Supabase CMS → published post.
          Trip notes in. Posts out.
        </p>
        <div class="flex flex-wrap gap-2 mb-5">
          {['MCP', 'Claude API', 'Node.js', 'Supabase'].map(t => (
            <span class="text-[10px] bg-accent-subtle border border-accent-ring text-accent px-2 py-0.5 rounded-full">{t}</span>
          ))}
        </div>
        <a href="/projects/wanderingbong" class="text-sm text-accent font-bold hover:underline">
          Read the full story →
        </a>
      </div>
      <div class="bg-surface border border-line rounded-xl p-5">
        <p class="text-[9px] text-ink-muted tracking-[0.15em] uppercase mb-3">Publishing pipeline</p>
        <PipelineDiagram />
      </div>
    </div>

    <!-- 02 Spotter -->
    <div class="flex items-start justify-between gap-6 flex-wrap pb-12 border-b border-line mb-8">
      <div class="flex-1 min-w-0">
        <p class="text-[10px] text-ink-muted mb-3 tracking-wide">02 — Enterprise AI · Principal PM</p>
        <h2 class="text-2xl font-black text-ink tracking-tightest mb-4">Spotter @ ThoughtSpot</h2>
        <p class="text-sm text-ink-muted leading-relaxed max-w-lg">
          AI analytics agent that moves enterprise users from "what happened" to "why it happened."
          I own the reasoning loop, MCP integration layer, and the UI model for multi-step agentic workflows.
        </p>
      </div>
      <span class="text-[10px] bg-ink text-canvas px-3 py-1.5 rounded-full font-semibold whitespace-nowrap self-start mt-1">
        ● Live · Enterprise
      </span>
    </div>

    <!-- More projects link -->
    <a href="/projects" class="text-sm text-accent font-bold hover:underline">
      View all projects — Eidetic, Lyaadh, Worldview, BIRD→Snowflake →
    </a>
  </section>

  <!-- Engagements -->
  <section class="max-w-4xl mx-auto px-6 pb-16">
    <EngagementsBlock />
  </section>

  <!-- Writing preview -->
  <section class="max-w-4xl mx-auto px-6 pb-20 border-t border-line pt-16">
    <p class="text-[10px] text-ink-muted tracking-[0.25em] uppercase mb-8">Writing</p>
    <div class="grid sm:grid-cols-3 gap-4 mb-6">
      {featuredWriting.map(w => (
        <ArticleCard
          title={w.data.title}
          meta={w.data.meta}
          url={w.data.url}
          image={w.data.image}
        />
      ))}
    </div>
    <a href="https://aaghran.substack.com" target="_blank" rel="noreferrer"
      class="text-sm text-accent font-bold hover:underline">
      All writing on Substack →
    </a>
  </section>

</Layout>
```

- [ ] **Step 2: Verify**

Run `npm run dev`. Check `http://localhost:4321`:
- Hero: large headline, green label, "AI" watermark faintly visible
- Currently strip: green tint, ThoughtSpot mention, ● Active badge
- WanderingBong: left text + right pipeline diagram in 2 cols
- Spotter: full-width row with ● Live · Enterprise badge
- "View all projects →" link present
- Engagements block: green background, correct copy, email link
- Writing: 3 article cards (first 3 from collection)
- Toggle dark mode — all sections look correct in both modes

- [ ] **Step 3: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: home page — hero, currently strip, selected work, engagements, writing preview"
```

---

### Task 6: Projects pages

**Files:**
- Create: `src/pages/projects/index.astro`
- Create: `src/pages/projects/[id].astro`

**Interfaces:**
- Consumes: `getCollection('projects')`, `ProjectCard.astro`, `PipelineDiagram.astro`, `Layout.astro`
- Produces:
  - `/projects` — grid of all 5 project cards, each linking to `/projects/[id]`
  - `/projects/[id]` — full detail page: lede, story (paragraph-split on `\n\n`), stack tags, optional pipeline diagram, link to external URL if present

- [ ] **Step 1: Create `src/pages/projects/index.astro`**

```astro
---
import Layout from '../../layouts/Layout.astro';
import ProjectCard from '../../components/ProjectCard.astro';
import { getCollection } from 'astro:content';

const projects = await getCollection('projects');
---
<Layout title="Projects — Aaghran Ghosh">
  <div class="max-w-4xl mx-auto px-6 py-16">
    <p class="text-[10px] text-ink-muted tracking-[0.25em] uppercase mb-3">Building</p>
    <h1 class="text-4xl font-black text-ink tracking-tightest mb-3">Projects</h1>
    <p class="text-sm text-ink-muted mb-12 max-w-lg">
      Production systems, tools I built for myself, and experiments worth sharing.
      WanderingBong is the primary live system. The rest are proofs of work.
    </p>
    <div class="grid sm:grid-cols-2 gap-4">
      {projects.map(p => (
        <ProjectCard
          title={p.data.title}
          tag={p.data.tag}
          description={p.data.description}
          url={p.data.url}
          href={`/projects/${p.id}`}
        />
      ))}
    </div>
  </div>
</Layout>
```

- [ ] **Step 2: Create `src/pages/projects/[id].astro`**

```astro
---
import Layout from '../../layouts/Layout.astro';
import PipelineDiagram from '../../components/PipelineDiagram.astro';
import { getCollection } from 'astro:content';

export async function getStaticPaths() {
  const projects = await getCollection('projects');
  return projects.map(p => ({ params: { id: p.id }, props: { project: p } }));
}

const { project } = Astro.props;
const { title, tag, lede, story, stack, url, showPipelineDiagram } = project.data;
const paragraphs = story.split('\n\n').filter(Boolean);
---
<Layout title={`${title} — Aaghran Ghosh`} description={lede}>
  <div class="max-w-2xl mx-auto px-6 py-16">

    <!-- Back -->
    <a href="/projects" class="text-xs text-ink-muted hover:text-accent transition-colors mb-10 block">
      ← All projects
    </a>

    <!-- Header -->
    <div class="flex items-start justify-between gap-4 flex-wrap mb-6">
      <div>
        <h1 class="text-4xl font-black text-ink tracking-tightest leading-tight">{title}</h1>
        {url && (
          <a href={url} target="_blank" rel="noreferrer"
            class="text-xs text-accent hover:underline mt-2 inline-block">
            {url} <i class="fa-solid fa-arrow-up-right-from-square text-[9px]"></i>
          </a>
        )}
      </div>
      <span class="text-[10px] text-ink-muted border border-line rounded-full px-3 py-1 whitespace-nowrap mt-1">
        {tag}
      </span>
    </div>

    <!-- Lede -->
    <p class="text-lg text-ink-muted leading-relaxed mb-10 font-medium">{lede}</p>

    <!-- Pipeline diagram (WanderingBong only) -->
    {showPipelineDiagram && (
      <div class="bg-surface border border-line rounded-xl p-5 mb-10">
        <p class="text-[9px] text-ink-muted tracking-[0.15em] uppercase mb-3">Publishing pipeline</p>
        <PipelineDiagram />
      </div>
    )}

    <!-- Story -->
    <div class="space-y-5 mb-12">
      {paragraphs.map(p => (
        <p class="text-sm text-ink leading-[1.85]">{p}</p>
      ))}
    </div>

    <!-- Stack -->
    <div class="pt-8 border-t border-line">
      <p class="text-[10px] text-ink-muted tracking-[0.15em] uppercase mb-3">Stack</p>
      <div class="flex flex-wrap gap-2">
        {stack.map(s => (
          <span class="text-[10px] bg-surface border border-line text-ink-muted px-2.5 py-1 rounded-full">{s}</span>
        ))}
      </div>
    </div>

  </div>
</Layout>
```

- [ ] **Step 3: Verify**

- Open `http://localhost:4321/projects` — 5 cards in grid, all link correctly
- Click WanderingBong → `/projects/wanderingbong` — pipeline diagram appears between lede and story
- Click Eidetic → `/projects/eidetic` — no diagram, story renders as paragraphs
- Stack tags appear at bottom of each detail page

- [ ] **Step 4: Commit**

```bash
git add src/pages/projects
git commit -m "feat: projects grid and detail pages with static paths"
```

---

### Task 7: Work page

**Files:**
- Create: `src/pages/work.astro`

**Interfaces:**
- Consumes: `workExperience` from `@data/work`, `WorkCard.astro`, `Layout.astro`
- Produces: `/work` — full timeline of all work entries, each expanded to show all bullets

- [ ] **Step 1: Create `src/pages/work.astro`**

```astro
---
import Layout from '../layouts/Layout.astro';
import WorkCard from '../components/WorkCard.astro';
import { workExperience } from '../data/work';
---
<Layout title="Work — Aaghran Ghosh">
  <div class="max-w-2xl mx-auto px-6 py-16">
    <p class="text-[10px] text-ink-muted tracking-[0.25em] uppercase mb-3">Experience</p>
    <h1 class="text-4xl font-black text-ink tracking-tightest mb-3">Work</h1>
    <p class="text-sm text-ink-muted mb-12 max-w-lg">
      Nine years across PM and engineering roles. Currently building AI at enterprise scale.
    </p>
    <div class="space-y-4">
      {workExperience.map(job => (
        <WorkCard
          company={job.company}
          role={job.role}
          duration={job.duration}
          location={job.location}
          bullets={job.bullets}
          expanded={true}
        />
      ))}
    </div>
  </div>
</Layout>
```

- [ ] **Step 2: Verify**

Open `http://localhost:4321/work`. All 6 work entries render. ThoughtSpot is first, bullets show fully. Dark mode works.

- [ ] **Step 3: Commit**

```bash
git add src/pages/work.astro
git commit -m "feat: work history page"
```

---

### Task 8: Writing page

**Files:**
- Create: `src/pages/writing.astro`

**Interfaces:**
- Consumes: `getCollection('writing')`, `ArticleCard.astro`, `Layout.astro`
- Produces: `/writing` — all 8 articles in grid, Substack subscribe CTA

- [ ] **Step 1: Create `src/pages/writing.astro`**

```astro
---
import Layout from '../layouts/Layout.astro';
import ArticleCard from '../components/ArticleCard.astro';
import { getCollection } from 'astro:content';

const writing = await getCollection('writing');
const technical = writing.filter(w => w.data.meta.includes('Substack'));
const travel    = writing.filter(w => w.data.meta.includes('Medium'));
---
<Layout title="Writing — Aaghran Ghosh">
  <div class="max-w-4xl mx-auto px-6 py-16">
    <p class="text-[10px] text-ink-muted tracking-[0.25em] uppercase mb-3">Writing</p>
    <h1 class="text-4xl font-black text-ink tracking-tightest mb-3">Articles</h1>
    <p class="text-sm text-ink-muted mb-12 max-w-lg">
      Thoughts on AI agents, MCP, and product building — plus slow travel stories from places I've actually been.
    </p>

    <!-- Technical writing -->
    <div class="mb-12">
      <p class="text-[10px] text-ink-muted tracking-[0.2em] uppercase mb-5">AI & Product</p>
      <div class="grid sm:grid-cols-3 gap-4 mb-5">
        {technical.map(w => (
          <ArticleCard title={w.data.title} meta={w.data.meta} url={w.data.url} image={w.data.image} />
        ))}
      </div>
      <a href="https://aaghran.substack.com" target="_blank" rel="noreferrer"
        class="text-sm text-accent font-bold hover:underline">
        Subscribe on Substack →
      </a>
    </div>

    <!-- Travel writing -->
    <div>
      <p class="text-[10px] text-ink-muted tracking-[0.2em] uppercase mb-5">Travel</p>
      <div class="grid sm:grid-cols-3 gap-4">
        {travel.map(w => (
          <ArticleCard title={w.data.title} meta={w.data.meta} url={w.data.url} image={w.data.image} />
        ))}
      </div>
    </div>
  </div>
</Layout>
```

- [ ] **Step 2: Verify**

Open `http://localhost:4321/writing`. Three Substack articles in "AI & Product" section. Five Medium travel articles in "Travel" section. Subscribe link present. Dark mode works.

- [ ] **Step 3: Commit**

```bash
git add src/pages/writing.astro
git commit -m "feat: writing page — technical and travel sections"
```

---

### Task 9: Final build check + copy public assets

**Files:**
- Modify: nothing — verification and asset copy only

- [ ] **Step 1: Copy public assets from old project**

The existing `public/assets/` folder has profile photo and travel images referenced by the writing collection. Verify they exist:

```bash
ls public/assets/
```

Expected files: `profile.jpg`, `halebidu_temple.png`, `sundarbans_mangrove.png`, `vietnam_coffee.png`, `bangalore_fort.png`, `thailand_beach.png`.

If any are missing, they need to be added to `public/assets/` for the ArticleCard images to load.

- [ ] **Step 2: Run production build**

```bash
npm run build
```

Expected: `dist/` directory created, no TypeScript errors, no missing content collection entries. Output should include `dist/index.html`, `dist/projects/index.html`, `dist/projects/wanderingbong/index.html`, `dist/work/index.html`, `dist/writing/index.html`.

- [ ] **Step 3: Preview production build**

```bash
npm run preview
```

Open `http://localhost:4321`. Check:
- All 5 routes load: `/`, `/projects`, `/projects/wanderingbong`, `/work`, `/writing`
- Dark mode toggle works and persists on refresh
- No 404s on image assets
- Nav links all resolve correctly (no hash routing anywhere)
- PipelineDiagram SVG renders on home page and `/projects/wanderingbong`

- [ ] **Step 4: Update `.gitignore` to exclude dist**

Verify `.gitignore` contains `dist/`. If not:
```bash
echo "dist/" >> .gitignore
```

- [ ] **Step 5: Final commit**

```bash
git add .
git commit -m "feat: complete Astro rebuild — all pages, components, content collections"
```

---

## Self-Review

**Spec coverage:**
- ✅ Astro 4 + Tailwind — Task 1
- ✅ Dark mode, CSS variables, no flash — Task 3 (inline script in `<head>`)
- ✅ Forest green accent, warm dark blacks — Task 1 (`global.css`)
- ✅ Content collections with typed schemas — Task 2
- ✅ Layout with sticky nav, dark toggle, footer, GA4 — Task 3
- ✅ ProjectCard, ArticleCard, WorkCard, PipelineDiagram, EngagementsBlock — Task 4
- ✅ Home: hero, currently strip, WanderingBong + Spotter, engagements, writing preview — Task 5
- ✅ `/projects` grid + `/projects/[id]` detail with pipeline diagram — Task 6
- ✅ `/work` full timeline — Task 7
- ✅ `/writing` two sections + Substack CTA — Task 8
- ✅ ai-cms and Pather NOT included in any JSON file — enforced in Task 2
- ✅ GA4 tag `G-XWSY3N0FL5` in Layout — Task 3
- ✅ `.gitignore` updated — Task 1 + Task 9
- ✅ Public assets verified — Task 9

**Placeholder scan:** No TBD or TODO in any task. All code blocks complete.

**Type consistency:**
- `project.data.showPipelineDiagram` defined in `config.ts` schema and consumed in `[id].astro` ✅
- `workExperience` imported as `WorkEntry[]` from `@data/work` — path alias `@data/*` defined in `tsconfig.json` ✅
- `getCollection('projects')` returns `{id: string, data: ProjectData}[]` — consumed consistently across Tasks 5, 6 ✅
- `ArticleCard` `image` prop typed `string | null` — JSON files use `null` for missing images ✅
