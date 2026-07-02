# Projects Page Redesign

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Redesign `/projects` from a flat card dump into a narrative journey page that shows Aaghran's arc as a builder and signals what he can do.

**Architecture:** Single Astro page (`src/pages/projects/index.astro`) with hardcoded section structure and data pulled from existing content collections and `src/data/work.ts`. No new collections needed.

**Tech Stack:** Astro 7, Tailwind CSS 3, existing content collections (`projects`), Font Awesome icons already loaded.

---

## Global Constraints

- Visual style must match home page selected work section: large bold type, two-column grid (copy + visual), accent-green tags, `border-line` dividers
- No new dependencies
- Dark mode must work — use CSS variable tokens only (`text-ink`, `bg-surface`, etc.), no hardcoded colors
- Keep existing `/projects/[id].astro` detail pages untouched
- `work.ts`: fix Via.com role to read "UI Developer → Product Manager" (currently reversed)
- Privacy: no mention of spouse/family, no confidential ThoughtSpot metrics, no financial details

---

## Page Structure

### Narrative Intro

Short block at the top — 3–4 lines of prose, no heading, large-ish text. Sets the journey before the work appears.

> Started tinkering with PC builds and web projects in college. Moved into AWS, DevOps, and full-stack development at Via.com. Crossed into product at ZipGo, SIXT, Hevo, and ThoughtSpot. Now building AI products at enterprise scale — and shipping my own on the side.

Label above: `JOURNEY` (same 10px uppercase tracking style as rest of site).

---

### Section 1 — Day Job

**Label:** `Day job`
**Description line:** "What I do full-time."

One entry: **Spotter @ ThoughtSpot**
- Two-column layout: copy left, Spotter promo video right (same video as home page: `https://media.thoughtspot.com/35707/1769749943-spotter_3-promo.mp4`)
- `● Live · Enterprise` badge
- Link: `https://www.thoughtspot.com/product/agents/spotter`

---

### Section 2 — Side Builds

**Label:** `Side builds`
**Description line:** "Things I built and run myself."

Three projects, each as a two-column card (copy + image/visual):
1. **WanderingBong** — featured image from gallery, "Live blog →" + "Full story →" links
2. **Roami** — dark editorial card, "roami.xyz →" link
3. **Lyaadh** — card with link to lyaadh.com

Each card: title, one-line description, stack tags (max 4), links.

---

### Section 3 — Experiments

**Label:** `Experiments`
**Description line:** "Built to learn. Some still running."

Smaller cards in a 3-column grid (not two-column):
- **Eidetic** — spaced repetition / learning tool
- **Bird Loader** — lightweight utility
- **Worldview** — exploration/mapping project

Each card: title, one-sentence description, stack tags, link if live. Lighter visual weight than Section 2 — no images, just text cards with `bg-surface` background.

---

### Section 4 — Earlier Work

**Label:** `Earlier`
**Description line:** "Where it started."

Not project cards — a single text block:

> Before product, I was a developer. Built SEO systems and frontend tooling at Via.com, managed a Node.js + Redis content platform across 8 countries and 5 languages. Before that, AWS, DevOps, and a lot of PC builds I shouldn't have spent money on.

No cards. Just prose. Links to `/work` page at the end: "Full work history →"

---

## Data Changes

- `src/data/work.ts` — fix Via.com `role` field: `"UI Developer → Product Manager"` (currently reversed)
- No new JSON files needed — pull from existing content collections for Side Builds
- Experiments section: hardcode in the page (no collection needed, these are small)

---

## Visual Rhythm

- Each section separated by `border-t border-line` with `pt-16 mt-16`
- Section label: `text-[10px] text-ink-muted tracking-[0.25em] uppercase mb-1`
- Section description: `text-xs text-ink-muted mb-10`
- Narrative intro: `text-lg text-ink-muted leading-relaxed max-w-2xl`
- Experiments grid: `grid sm:grid-cols-3 gap-4`
- Day Job + Side Builds: `grid md:grid-cols-2 gap-8 items-start`
