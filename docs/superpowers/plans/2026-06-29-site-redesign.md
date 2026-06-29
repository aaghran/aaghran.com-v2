# aaghran.com Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reposition aaghran.com from "Principal PM portfolio" to "AI product builder available for selective engagements" — unified identity threading both ThoughtSpot work and personal projects, with pipeline diagrams and a clear engagement CTA.

**Architecture:** Keep React + Vite SPA. No tech stack change — the dark amber aesthetic and card layout are intentional and good. Add a `src/components/` directory for new reusable diagram/section components. All copy changes flow from the context dump: builder identity, not consultant; ThoughtSpot and WanderingBong as two expressions of the same skills.

**Tech Stack:** React 18, Vite, vanilla CSS (CSS variables), Font Awesome icons, Playfair Display + Inter fonts, VanillaTilt on project cards.

## Global Constraints

- Max content width: 680px (`.container` class — don't widen)
- Dark theme: `--bg-color: #12100e`, `--accent: #f59e0b`, `--text-muted: #a1a1aa`
- Headings: Playfair Display serif. Body: Inter sans-serif.
- No new npm dependencies
- No "hire me" / "fractional PM" / "consultant" language anywhere
- Don't mention: Roami, Pather, ClipMind, SeatView (all parked — remove Pather from data.js if present)
- Photography removed from nav (already done)
- ai-cms project: remove from data entirely
- WanderingBong must lead all project lists
- Diagrams: SVG inline in React components (no external libraries)

---

### Task 1: Data cleanup — projects, writings, work

**Files:**
- Modify: `src/data.js`

**Interfaces:**
- Produces: `projects` array (ai-cms removed, Pather removed, WanderingBong expanded with full pipeline story and updated stack), `writings` array (unchanged — real Substack dates, can't fabricate), `workExperience` array (ThoughtSpot bullet 0 rewritten to be punchier, less listicle)

- [ ] **Step 1: Remove ai-cms and Pather from projects array, expand WanderingBong**

Replace the entire `projects` array in `src/data.js` with:

```js
export const projects = [
  {
    id: "wanderingbong",
    title: "WanderingBong",
    url: "https://wanderingbong.com",
    tag: "AI Pipeline • Production",
    description: "My slow travel blog, rebuilt from scratch around a custom AI pipeline. Trip notes go in, published posts come out. Custom CMS, MCP server, Claude API, and a Telegram capture bot — all running in production.",
    isComingSoon: false,
    lede: "My slow travel blog. I got tired of my own publishing workflow and rebuilt the whole thing from scratch.",
    story: `I've been travel writing for a while. The blog existed before the CMS, before the agent, before any of this — it was just a WordPress site with a Notion folder full of notes I kept meaning to turn into posts. The problem was always the same: too many steps between having the trip and having the post.

I rebuilt the whole thing. The current stack: a Node.js/Express CMS backend on EC2, PostgreSQL via Supabase, and a Next.js frontend. But the interesting part is the AI layer on top of it.

The capture pipeline starts on Telegram. When I'm traveling and want to capture something — a restaurant, a moment, a temple — I send it to a bot. The bot routes it through Railway to the CMS, where it lands as a raw journal entry. No friction at the point of capture.

The publishing pipeline is where the AI lives. I built cms-mcp — a custom MCP server that gives Claude full context about my content: what's published, what destinations I've written about, what's sitting in the journal backlog untouched. A Google ADK agent reads the raw journal entries and drafts posts in my voice, informed by everything I've already written. I review, edit lightly, publish.

The first time I ran the full pipeline, five Thailand posts came out in an afternoon. They sounded like me — not because I prompted it carefully, but because the agent had read two years of my writing first.

The MCP integration is what I didn't expect to matter as much as it does. I can be editing a post in Claude and ask what else I've written about the same region, and it just knows. That kind of ambient context is hard to build without a purpose-built MCP server.

I write slowly and only from places I've actually been. Thailand keeps pulling me back. Karnataka is underrated. The blog is the best argument for the pipeline — if you want to see what it produces, just read it.`,
    stack: ["Google ADK", "MCP (cms-mcp)", "Node.js", "Express", "PostgreSQL", "Supabase", "Next.js", "EC2", "Railway", "Telegram Bot API", "Claude API"],
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
```

- [ ] **Step 2: Rewrite ThoughtSpot bullet[0] in workExperience**

In the `workExperience` array, replace the first bullet of the ThoughtSpot `Principal Product Manager` entry:

```js
// Replace:
"I'm part of the team building Spotter, our AI-powered analytics assistant that helps business users move beyond 'what happened' to uncover the 'why' behind their data shifts.",
// With:
"Building Spotter — ThoughtSpot's AI analytics agent. I own the agent's reasoning loop, the MCP integration layer, and the UI model for multi-step agentic workflows. This is NLS and agentic analytics at enterprise scale.",
```

- [ ] **Step 3: Verify the site still loads and projects page shows correct cards**

Open `http://localhost:5173/#projects` and confirm: ai-cms gone, Pather gone, WanderingBong is first card, 5 cards total.

- [ ] **Step 4: Commit**

```bash
git add src/data.js
git commit -m "content: overhaul projects data — remove ai-cms/Pather, expand WanderingBong pipeline story"
```

---

### Task 2: WanderingBong pipeline diagram component

**Files:**
- Create: `src/components/PipelineDiagram.jsx`

**Interfaces:**
- Produces: `<PipelineDiagram />` — a self-contained SVG diagram showing the WanderingBong AI pipeline: Capture (Telegram) → cms-mcp MCP Server → Claude API → CMS Backend → Published Post. Uses CSS variables for colors, responsive via viewBox.
- Consumed by: `src/pages/ProjectDetails.jsx` (on the WanderingBong detail page) and `src/pages/AboutMe.jsx` (as a visual anchor in the Featured Projects or Engagements section)

- [ ] **Step 1: Create the component**

Create `src/components/PipelineDiagram.jsx`:

```jsx
export default function PipelineDiagram() {
  const nodes = [
    { x: 40,  label: "Trip Notes", sub: "Telegram Bot", icon: "✈" },
    { x: 200, label: "cms-mcp",    sub: "MCP Server",   icon: "⚙" },
    { x: 360, label: "Claude API", sub: "ADK Agent",    icon: "◈" },
    { x: 520, label: "CMS",        sub: "Node/Supabase",icon: "⬡" },
    { x: 680, label: "Post",       sub: "Published",    icon: "✦" },
  ]

  const W = 760
  const H = 160
  const nodeW = 100
  const nodeH = 64
  const nodeY = (H - nodeH) / 2

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', maxWidth: '680px', display: 'block', margin: '1.5rem 0' }}
      aria-label="WanderingBong AI Pipeline: Trip notes captured via Telegram, routed through cms-mcp MCP Server, drafted by Claude API ADK Agent, stored in CMS, published as posts"
    >
      {/* Connector lines */}
      {nodes.slice(0, -1).map((n, i) => (
        <line
          key={i}
          x1={n.x + nodeW}
          y1={H / 2}
          x2={nodes[i + 1].x}
          y2={H / 2}
          stroke="rgba(245,158,11,0.35)"
          strokeWidth="1.5"
          strokeDasharray="4 3"
        />
      ))}

      {/* Arrowheads */}
      {nodes.slice(0, -1).map((n, i) => {
        const ax = nodes[i + 1].x - 2
        return (
          <polygon
            key={i}
            points={`${ax},${H/2 - 4} ${ax + 7},${H/2} ${ax},${H/2 + 4}`}
            fill="rgba(245,158,11,0.5)"
          />
        )
      })}

      {/* Node boxes */}
      {nodes.map((n, i) => (
        <g key={i}>
          <rect
            x={n.x}
            y={nodeY}
            width={nodeW}
            height={nodeH}
            rx="6"
            fill="rgba(25,25,25,0.85)"
            stroke={i === 2 ? "rgba(245,158,11,0.6)" : "rgba(255,255,255,0.1)"}
            strokeWidth={i === 2 ? "1.5" : "1"}
          />
          <text
            x={n.x + nodeW / 2}
            y={nodeY + 18}
            textAnchor="middle"
            fill="#f59e0b"
            fontSize="16"
            fontFamily="serif"
          >
            {n.icon}
          </text>
          <text
            x={n.x + nodeW / 2}
            y={nodeY + 36}
            textAnchor="middle"
            fill="#ffffff"
            fontSize="9.5"
            fontWeight="600"
            fontFamily="Inter, sans-serif"
            letterSpacing="0.2"
          >
            {n.label}
          </text>
          <text
            x={n.x + nodeW / 2}
            y={nodeY + 50}
            textAnchor="middle"
            fill="#a1a1aa"
            fontSize="8"
            fontFamily="Inter, sans-serif"
          >
            {n.sub}
          </text>
        </g>
      ))}
    </svg>
  )
}
```

- [ ] **Step 2: Smoke test — import into AboutMe temporarily and verify it renders**

Add `import PipelineDiagram from '../components/PipelineDiagram'` at the top of `src/pages/AboutMe.jsx` and drop `<PipelineDiagram />` anywhere in the JSX. Open `http://localhost:5173/` and confirm the SVG renders with 5 nodes, amber dashed connectors, and no console errors. Then leave the import in place (it'll be used in Task 3).

- [ ] **Step 3: Commit**

```bash
git add src/components/PipelineDiagram.jsx
git commit -m "feat: add WanderingBong AI pipeline SVG diagram component"
```

---

### Task 3: Full AboutMe.jsx rewrite

**Files:**
- Modify: `src/pages/AboutMe.jsx`

**Interfaces:**
- Consumes: `projects` from `../data` (WanderingBong is now index 0, Eidetic is index 1), `writings` from `../data`, `workExperience` from `../data`, `<PipelineDiagram />` from `../components/PipelineDiagram`
- Produces: Home page with sections in this order:
  1. Hero (keep existing)
  2. Core Identity (3-paragraph unified identity — ThoughtSpot + personal, same skills)
  3. Selective Engagements (new — who it's for, what it covers, email CTA)
  4. Featured Projects (WanderingBong first with pipeline diagram, Eidetic second)
  5. Current Work (ThoughtSpot — context, not anchor)
  6. Writing (renamed from "Recent Writing", add Substack subscribe note)

- [ ] **Step 1: Replace the full file**

```jsx
import { useEffect, useState } from 'react';
import { projects, writings, workExperience } from '../data';
import PipelineDiagram from '../components/PipelineDiagram';

export default function AboutMe({ setActiveTab }) {
  const currentJob = workExperience[0];
  const wanderingbong = projects.find(p => p.id === 'wanderingbong');
  const eidetic = projects.find(p => p.id === 'eidetic');
  const featuredWriting = writings.slice(0, 3);

  return (
    <div className="fade-in">

      {/* Hero */}
      <header className="section hero reveal">
        <div className="hero-content-wrapper">
          <div className="hero-text">
            <h1>Aaghran Ghosh</h1>
            <p className="subtitle" style={{ whiteSpace: 'pre-line' }}>
              I scope and build the AI layer.<br/>
              MCP integrations, agentic pipelines, agent frameworks — and the product thinking around them.
            </p>
            <nav className="social-nav">
              <a href="https://linkedin.com/in/aaghran" target="_blank" rel="noreferrer"><i className="fa-brands fa-linkedin icon-sm"></i></a>
              <a href="https://github.com/aaghran" target="_blank" rel="noreferrer"><i className="fa-brands fa-github icon-sm"></i></a>
              <a href="https://wanderingbong.com" target="_blank" rel="noreferrer"><i className="fa-solid fa-compass icon-sm"></i></a>
              <a href="https://aaghran.substack.com" target="_blank" rel="noreferrer"><i className="fa-solid fa-pen-nib icon-sm"></i></a>
              <a href="https://medium.com/@aaghran" target="_blank" rel="noreferrer"><i className="fa-brands fa-medium icon-sm"></i></a>
            </nav>
          </div>
          <div className="hero-visual">
            <img src="assets/profile.jpg" alt="Aaghran Ghosh" className="hero-img" />
          </div>
        </div>
      </header>

      <hr className="divider reveal" />

      {/* Core Identity */}
      <section className="section about reveal">
        <h2>The Core Identity</h2>
        <p>My work lives at the intersection of AI product thinking and AI engineering — agentic systems, MCP integrations, and the reasoning layers that make AI actually useful in production. I define what the feature should do and I ship the code that makes it real. Not one or the other.</p>
        <p>At ThoughtSpot, I'm a Principal PM building Spotter — an AI analytics agent that helps enterprise users move from "what happened" to "why it happened." I own the agent's reasoning loop, the MCP integration layer, and the interaction model for multi-step agentic workflows. That's serious scale: real product constraints, enterprise customers, production reliability.</p>
        <p>Outside that, I build on my own terms. <a href="https://wanderingbong.com" target="_blank" rel="noreferrer" style={{color: 'var(--accent)', textDecoration: 'none'}}>WanderingBong</a> is a slow-travel blog running on a custom MCP pipeline and Google ADK agent I designed and deployed end-to-end. Eidetic is a personal memory system with a pgvector backend and an MCP server that surfaces saved context mid-conversation. Same skills, different constraints — and full-stack ownership I don't get inside a large product org.</p>
      </section>

      <hr className="divider reveal" />

      {/* Selective Engagements */}
      <section className="section reveal">
        <h2><i className="fa-solid fa-handshake text-accent icon-md"></i> Selective Engagements</h2>
        <p style={{marginBottom: '1.25rem'}}>I take on a small number of fixed-scope AI product engagements each year. Not PM consulting. Not open-ended advisory. Specifically: helping teams define and ship their AI product layer.</p>

        <div className="project-card" style={{marginBottom: '1rem'}}>
          <p style={{fontWeight: 600, marginBottom: '0.75rem', color: 'var(--text-lighter)'}}>Who it's for</p>
          <ul style={{paddingLeft: '1.25rem', color: 'var(--text-main)', lineHeight: 2}}>
            <li>B2B SaaS teams adding AI to analytics or search</li>
            <li>Startups with strong engineers but no one who's shipped an AI feature before</li>
            <li>Enterprise teams building internal AI tooling who need product thinking at scale</li>
          </ul>
        </div>

        <div className="project-card" style={{marginBottom: '1rem'}}>
          <p style={{fontWeight: 600, marginBottom: '0.75rem', color: 'var(--text-lighter)'}}>What I can do</p>
          <ul style={{paddingLeft: '1.25rem', color: 'var(--text-main)', lineHeight: 2}}>
            <li>Define the AI product spec — what to build, in what order, and why</li>
            <li>Build the v1 agentic pipeline end-to-end</li>
            <li>Design and implement MCP server integrations</li>
            <li>Evaluation frameworks for AI reliability in production</li>
          </ul>
        </div>

        <p style={{color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '1rem'}}>
          Fixed scope. Fixed price. If this sounds like your situation — <a href="mailto:aaghran@gmail.com" style={{color: 'var(--accent)', textDecoration: 'none'}}>aaghran@gmail.com</a>.
        </p>
      </section>

      <hr className="divider reveal" />

      {/* Featured Projects */}
      <section className="section reveal">
        <h2><i className="fa-solid fa-hammer text-accent icon-md"></i> What I've Built</h2>

        {/* WanderingBong card with pipeline diagram */}
        <div style={{marginTop: '1.5rem'}}>
          <a href={`#project/${wanderingbong.id}`} className="project-card" style={{display: 'block', textDecoration: 'none', marginBottom: '1rem'}}>
            <div className="card-header">
              <h3>{wanderingbong.title} <i className="fa-solid fa-arrow-up-right-from-square icon-xs"></i></h3>
              <span className="tag">{wanderingbong.tag}</span>
            </div>
            <p className="card-desc">{wanderingbong.description}</p>
          </a>
          <div style={{padding: '0 0.25rem'}}>
            <p style={{fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem', letterSpacing: '0.05em', textTransform: 'uppercase'}}>Publishing pipeline</p>
            <PipelineDiagram />
          </div>
        </div>

        {/* Eidetic card */}
        <div style={{marginTop: '0.5rem'}}>
          <a href={`#project/${eidetic.id}`} className="project-card" style={{display: 'block', textDecoration: 'none'}}>
            <div className="card-header">
              <h3>{eidetic.title}</h3>
              <span className="tag">{eidetic.tag}</span>
            </div>
            <p className="card-desc">{eidetic.description}</p>
          </a>
        </div>

        <div style={{marginTop: '1.5rem'}}>
          <button onClick={() => setActiveTab('projects')} className="tab-btn" style={{color: 'var(--accent)', padding: 0}}>
            View all projects <i className="fa-solid fa-arrow-right icon-sm"></i>
          </button>
        </div>
      </section>

      <hr className="divider reveal" />

      {/* Current Work */}
      <section className="section reveal">
        <h2><i className="fa-solid fa-briefcase text-accent icon-md"></i> Current Work</h2>
        <div className="work-timeline" style={{marginTop: '1.5rem'}}>
          <div className="work-card project-card">
            <div className="card-header" style={{alignItems: 'flex-start', flexWrap: 'wrap'}}>
              <div style={{flex: 1}}>
                <h3 style={{fontSize: '1.25rem', marginBottom: '0.25rem'}}>{currentJob.role}</h3>
                <span className="company-name" style={{color: 'var(--text-main)', fontWeight: 500}}>{currentJob.company}</span>
              </div>
              <div style={{textAlign: 'right'}}>
                <span className="tag" style={{display: 'inline-block'}}>{currentJob.duration}</span>
                <div style={{color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.25rem'}}>
                  <i className="fa-solid fa-location-dot icon-xs"></i> {currentJob.location}
                </div>
              </div>
            </div>
            <p className="card-desc" style={{marginTop: '1rem'}}>{currentJob.bullets[0]}</p>
          </div>
        </div>
        <div style={{marginTop: '1.5rem'}}>
          <button onClick={() => setActiveTab('work')} className="tab-btn" style={{color: 'var(--accent)', padding: 0}}>
            View full history <i className="fa-solid fa-arrow-right icon-sm"></i>
          </button>
        </div>
      </section>

      <hr className="divider reveal" />

      {/* Writing */}
      <section className="section reveal">
        <h2><i className="fa-solid fa-feather text-accent icon-md"></i> Writing</h2>
        <div className="article-grid">
          {featuredWriting.map((w, i) => (
            <a href={w.url} className="article-card project-card" key={i} target="_blank" rel="noreferrer">
              {w.image && (
                <div className="article-card-inner">
                  <div className="article-image" style={{ backgroundImage: `url(${w.image})` }}></div>
                </div>
              )}
              <div className="article-content">
                <h3 className="writing-title">{w.title}</h3>
                <span className="writing-meta" style={{marginTop: '0.75rem', display: 'block'}}>{w.meta}</span>
              </div>
            </a>
          ))}
        </div>
        <div style={{marginTop: '1.5rem', display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap'}}>
          <button onClick={() => setActiveTab('writing')} className="tab-btn" style={{color: 'var(--accent)', padding: 0}}>
            All articles <i className="fa-solid fa-arrow-right icon-sm"></i>
          </button>
          <a href="https://aaghran.substack.com" target="_blank" rel="noreferrer" style={{color: 'var(--text-muted)', fontSize: '0.875rem', textDecoration: 'none'}}>
            Subscribe on Substack <i className="fa-solid fa-arrow-up-right-from-square icon-xs"></i>
          </a>
        </div>
      </section>

    </div>
  )
}
```

- [ ] **Step 2: Verify at `http://localhost:5173/`**

Check in order:
- Hero still shows name + subtitle + profile photo
- Core Identity: 3 paragraphs, no "credibility anchor" language
- Selective Engagements: 2 cards (who it's for / what I can do), email link at bottom
- What I've Built: WanderingBong card with pipeline diagram below it, Eidetic card, "View all projects" link
- Current Work: ThoughtSpot card with updated bullet
- Writing: 3 article cards, two CTAs at bottom

- [ ] **Step 3: Commit**

```bash
git add src/pages/AboutMe.jsx src/components/PipelineDiagram.jsx
git commit -m "feat: rewrite home page — unified identity, engagements section, pipeline diagram"
```

---

### Task 4: Footer update + Projects page description

**Files:**
- Modify: `src/App.jsx` (footer)
- Modify: `src/pages/Projects.jsx` (description copy)

**Interfaces:**
- Produces: Footer with engagement signal alongside the existing contact info. Projects page description that matches new positioning.

- [ ] **Step 1: Update footer in App.jsx**

Find the footer in `src/App.jsx` and replace:
```jsx
<footer className="footer reveal active">
   <p><i className="fa-solid fa-location-dot icon-sm"></i> Bangalore, India &nbsp;&middot;&nbsp; <i className="fa-solid fa-envelope icon-sm"></i> aaghran@gmail.com</p>
   <div className="footer-links">
     <a href="https://linkedin.com/in/aaghran" target="_blank" rel="noreferrer"><i className="fa-brands fa-linkedin icon-sm"></i></a>
     <a href="https://github.com/aaghran" target="_blank" rel="noreferrer"><i className="fa-brands fa-github icon-sm"></i></a>
     <a href="https://wanderingbong.com" target="_blank" rel="noreferrer"><i className="fa-solid fa-compass icon-sm"></i></a>
     <a href="https://aaghran.substack.com" target="_blank" rel="noreferrer"><i className="fa-solid fa-pen-nib icon-sm"></i></a>
   </div>
</footer>
```

With:
```jsx
<footer className="footer reveal active">
  <p style={{marginBottom: '0.5rem'}}>
    <i className="fa-solid fa-location-dot icon-sm"></i> Bangalore &nbsp;&middot;&nbsp;
    <a href="mailto:aaghran@gmail.com" style={{color: 'var(--text-muted)', textDecoration: 'none'}}>aaghran@gmail.com</a>
    &nbsp;&middot;&nbsp;
    <span style={{color: 'var(--text-muted)', fontSize: '0.85rem'}}>Available for selective AI product engagements</span>
  </p>
  <div className="footer-links">
    <a href="https://linkedin.com/in/aaghran" target="_blank" rel="noreferrer"><i className="fa-brands fa-linkedin icon-sm"></i></a>
    <a href="https://github.com/aaghran" target="_blank" rel="noreferrer"><i className="fa-brands fa-github icon-sm"></i></a>
    <a href="https://wanderingbong.com" target="_blank" rel="noreferrer"><i className="fa-solid fa-compass icon-sm"></i></a>
    <a href="https://aaghran.substack.com" target="_blank" rel="noreferrer"><i className="fa-solid fa-pen-nib icon-sm"></i></a>
  </div>
</footer>
```

- [ ] **Step 2: Update Projects.jsx page description**

In `src/pages/Projects.jsx`, replace:
```jsx
<p className="page-desc">The products, experiments, and sandboxes I'm currently working on.</p>
```
With:
```jsx
<p className="page-desc">What I've shipped — production systems, tools I built for myself, and experiments worth sharing. WanderingBong is the primary live system. The rest are proofs of work.</p>
```

- [ ] **Step 3: Verify**

Open `http://localhost:5173/` — scroll to footer, check engagement line shows. Navigate to `#projects` — check description.

- [ ] **Step 4: Commit**

```bash
git add src/App.jsx src/pages/Projects.jsx
git commit -m "ui: footer engagement signal, updated projects page description"
```

---

### Task 5: Add pipeline diagram to WanderingBong project detail

**Files:**
- Modify: `src/pages/ProjectDetails.jsx`

This task requires reading the current ProjectDetails page first to understand the layout, then inserting `<PipelineDiagram />` after the project description and before the stack tags — but only when `project.id === 'wanderingbong'`.

- [ ] **Step 1: Read the current file**

```bash
cat -n src/pages/ProjectDetails.jsx
```

- [ ] **Step 2: Add conditional diagram**

Import PipelineDiagram at the top:
```jsx
import PipelineDiagram from '../components/PipelineDiagram'
```

Find where the story text is rendered (likely inside a `<p>` or whitespace-preserving block) and after it, before the stack tags, add:
```jsx
{project.id === 'wanderingbong' && (
  <div style={{marginTop: '2rem'}}>
    <p style={{fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem', letterSpacing: '0.05em', textTransform: 'uppercase'}}>Publishing pipeline</p>
    <PipelineDiagram />
  </div>
)}
```

- [ ] **Step 3: Verify**

Navigate to `http://localhost:5173/#project/wanderingbong` and confirm the diagram appears between the story and the stack tags. Navigate to another project (`#project/eidetic`) and confirm no diagram appears there.

- [ ] **Step 4: Commit**

```bash
git add src/pages/ProjectDetails.jsx
git commit -m "feat: add pipeline diagram to WanderingBong project detail page"
```

---

## Self-Review

**Spec coverage:**
- ✅ Credibility flip — Core Identity rewrites ThoughtSpot as context, shipped work leads
- ✅ ai-cms removed from data and all project lists
- ✅ WanderingBong expanded with full pipeline details (Telegram, cms-mcp, Claude API, Supabase, Railway)
- ✅ Pather removed from data
- ✅ Engagements section — who it's for (3 profiles), what I cover (4 items), email CTA
- ✅ Photography removed from nav (done before this plan)
- ✅ Pipeline diagram — WanderingBong on home page + project detail page
- ✅ Footer has engagement signal
- ✅ Writing section: "Recent Writing" → "Writing", Substack subscribe CTA added
- ✅ ThoughtSpot bullet rewritten to be punchier
- ✅ "Don't mention: Roami, ClipMind, SeatView, Pather" — enforced in data.js
- ✅ No "hire me" / "consultant" / "fractional PM" language anywhere

**Placeholder scan:** No TBD or TODO in any task. All code blocks complete.

**Type consistency:** `wanderingbong.id`, `eidetic.id` — both match the `id` fields defined in Task 1's projects array. `PipelineDiagram` component name consistent across all imports.

**One gap flagged:** Task 5 Step 1 says to `cat` the file before editing — this is intentional since ProjectDetails.jsx hasn't been read in this session and the insert point depends on its actual structure.
