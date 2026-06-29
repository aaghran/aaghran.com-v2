# aaghran.com Full Redesign — Design Spec

**Date:** 2026-06-29  
**Status:** Approved  

---

## Goal

Rebuild aaghran.com from scratch as a personal brand site for Aaghran Ghosh — AI Builder and AI PM. Replace the current React SPA (dark, tab-based) with a clean, editorial Astro site (light mode + dark mode toggle) inspired by benshih.design. Attract startups, recruiters, and freelance AI product engagement clients. Built to scale as projects and articles are added over time.

---

## Positioning

- **Primary identity:** AI Builder — ships AI products end to end (product thinking + code)
- **Secondary identity:** AI PM — Principal PM at ThoughtSpot, building Spotter (enterprise AI analytics agent)
- **ThoughtSpot is context, not the lead.** Shipped work leads. Enterprise experience adds credibility.
- **Tone:** Builder, not consultant. Maker, not advisor. Honest and specific.
- **Target audiences:** Startups, recruiters, freelance AI product engagement clients

---

## Tech Stack

| Decision | Choice |
|---|---|
| Framework | Astro 4 |
| Styling | Tailwind CSS (dark mode via `class` strategy) |
| Dark mode | CSS class toggle + `localStorage` |
| Interactive islands | Vanilla JS only (no React) |
| Content | Astro Content Collections (typed JSON) |
| Routing | File-based (Astro default) |
| Deploy | Existing host (build step swap only) |

**Why Astro over current React+Vite:** Static HTML at build time = real SEO. Content collections = add a project by dropping a file, no code changes. Zero JS by default = fast. The brand is growing (more articles, more projects) — Astro scales this better than a SPA.

---

## Site Structure

| Route | Content |
|---|---|
| `/` | Long scroll home: hero → currently strip → selected work → engagements block → writing preview → footer |
| `/projects` | Full grid of all projects |
| `/projects/[id]` | Individual project detail (story, stack, optional pipeline diagram) |
| `/work` | Full work experience timeline |
| `/writing` | All articles with subscribe CTA |

**No hash routing. No tabs. Real URLs throughout.**

---

## Color System

Two complete themes, toggled via `dark` class on `<html>`:

| Token | Light | Dark |
|---|---|---|
| `--bg` | `#fafaf9` | `#111110` |
| `--bg-card` | `#ffffff` | `#1c1c1a` |
| `--text` | `#111111` | `#f5f5f4` |
| `--text-muted` | `#6b7280` | `#a8a29e` |
| `--accent` | `#16a34a` | `#4ade80` |
| `--accent-bg` | `#f0fdf4` | `#052e16` |
| `--accent-border` | `#86efac` | `#166534` |
| `--border` | `#e5e7eb` | `#292524` |

Dark mode warm blacks (`#111110`, `#1c1c1a`) preserve editorial warmth. Avoid cold GitHub navy.

**Dark mode behavior:** On first load, read `prefers-color-scheme`. User toggle saves to `localStorage` and persists across visits. Script inlined in `<head>` to prevent flash.

---

## Navigation

```
aaghran.com   |   Projects   Work   Writing   [☀/🌙]   Let's talk →
```

- Wordmark links to `/`
- `Let's talk →` is a styled pill linking to `mailto:aaghran@gmail.com`
- Dark mode toggle: sun icon (light mode) / moon icon (dark mode)
- Sticky on scroll, subtle border-bottom

---

## Home Page — Section by Section

### Hero
- Large bold headline: **"I scope and build the AI layer."** (42px, weight 900, letter-spacing -2px)
- Subheading: label-style in accent green — `AI Builder · AI PM · Bangalore`
- Body: one short paragraph, max 420px wide
- CTAs: `See what I've built ↓` (dark pill) + `or email aaghran@gmail.com` (inline link)
- Decorative: faint large "AI" text in background (opacity ~0.05) — personality touch

### Currently Strip
- Full-width green-tinted bar below hero
- Content: `Currently · Principal PM @ ThoughtSpot — building Spotter, an AI analytics agent used by enterprises`
- Right badge: `● Active` in green

### Selected Work
Two featured projects, in order:

**01 — WanderingBong**
- Left: title, numbered label, description, tech tags, "Read the full story →"
- Right: inline PipelineDiagram (Trip Notes → cms-mcp → Claude API → CMS → Post)

**02 — Spotter @ ThoughtSpot**
- Full-width row: title, description, `● Live · Enterprise` badge
- No diagram (enterprise product, no public pipeline to show)

Below: `View all projects — Eidetic, Lyaadh, Worldview, BIRD→Snowflake →`

### Engagements Block
Green-tinted callout card (`--accent-bg` background, `--accent-border` border):
- Label: `Selective Engagements`
- Headline: `Fixed scope. Fixed price. AI product layer, shipped.`
- Who it's for: B2B SaaS adding AI to analytics/search · Startups with engineers but no AI PM · Enterprise teams building internal AI tooling
- What I do: MCP integrations · Agentic pipelines · AI product specs · Evaluation frameworks
- CTA: `aaghran@gmail.com →`

### Writing Preview
- Section label: `Writing`
- 3-column article card grid (truncated titles, meta, `Read →` links)
- Below: `All writing on Substack →`

### Footer
- Left: `Bangalore, India · aaghran@gmail.com · Available for selective AI product engagements`
- Right: LinkedIn · GitHub · WanderingBong · Substack icon links

---

## Components

| File | Responsibility |
|---|---|
| `src/layouts/Layout.astro` | `<head>`, nav, footer, dark mode inline script |
| `src/components/ProjectCard.astro` | Project card — used on `/projects` and home |
| `src/components/ArticleCard.astro` | Article card — used on `/writing` and home |
| `src/components/WorkCard.astro` | Work experience row — used on `/work` |
| `src/components/PipelineDiagram.astro` | SVG pipeline — used on home + `/projects/wanderingbong` |
| `src/components/EngagementsBlock.astro` | Green callout — used on home |
| `src/pages/index.astro` | Home page |
| `src/pages/projects/index.astro` | All projects grid |
| `src/pages/projects/[id].astro` | Dynamic project detail |
| `src/pages/work.astro` | Work experience |
| `src/pages/writing.astro` | All articles |

---

## Content Collections

```
src/content/
  projects/
    wanderingbong.json
    eidetic.json
    lyaadh.json
    worldview.json
    bird-loader.json
  writing/
    solo-developer.json
    ai-interns-hands.json
    over-engineered-blog.json
    halebidu-temple.json
    sundarbans.json
    vietnam-coffee.json
    bangalore-forts.json
    thailand-return.json
```

**Project schema:**
```ts
{
  id: string,
  title: string,
  tag: string,           // e.g. "AI Pipeline · Production"
  description: string,   // short card description
  lede: string,          // one-liner for detail page
  story: string,         // full narrative (markdown)
  stack: string[],
  url: string | null,
  showPipelineDiagram: boolean
}
```

**Writing schema:**
```ts
{
  title: string,
  url: string,
  meta: string,          // e.g. "Substack · Jan 2026"
  image: string | null
}
```

---

## PipelineDiagram

SVG component showing the WanderingBong publishing pipeline:

```
[✈ Trip Notes] ···→ [⚙ cms-mcp] ···→ [◈ Claude API] ···→ [⬡ CMS] ···→ [✦ Post]
```

- Uses CSS variables for colors (works in both light and dark mode)
- `viewBox` based, scales to container width
- Rendered on: home page WanderingBong row + `/projects/wanderingbong` detail page
- Claude API node highlighted (amber fill) to show it's the AI step

---

## Migration Notes

- All content from `src/data.js` moves into content collection JSON files verbatim
- `ai-cms` project: **do not migrate** (removed)
- `Pather` project: **do not migrate** (parked)
- Current dark CSS variables map to the new dark mode tokens
- GA4 tracking: keep same tag `G-XWSY3N0FL5`, update page_view to use Astro's native routing (no manual hashchange hooks needed)
- `.gitignore`: add `.superpowers/` and `dist/`

---

## Out of Scope

- Roami, ClipMind, SeatView — parked, not included
- Blog CMS / writing editor
- Contact form (email link is sufficient)
- Any backend or API routes
