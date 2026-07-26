# Luxora Estates

### _Where Extraordinary Living Begins._

A cinematic, editorial luxury real-estate experience — designed to feel less like a
property portal and more like the private house of a global luxury brand. Built as a
front-end showcase: every interaction, every transition, every pixel is tuned for the
feeling of _wealth, trust and exclusivity_.

> **Design language** — cinematic obsidian base · champagne-gold accent · pearl ivory
> type. Editorial serif (**Fraunces**) paired with a precise grotesque (**Geist**),
> glassmorphism, film grain, and restrained, expensive motion.

---

## ✨ Highlights

| | |
|---|---|
| **Cinematic hero** | Crossfading Ken-Burns backdrop, mouse-parallax, word-by-word headline reveals, live floating listing card, rotating taglines |
| **AI Property Matching** | A four-step wizard with a real, deterministic, explainable scoring engine → `"You are 94% matched with…"` |
| **Aria, the AI concierge** | Global floating chat assistant with keyword-routed, on-device intelligence (suggests homes, explains ROI, estimates mortgages) |
| **Investment dashboard** | Live luxury market index, animated SVG area/bar charts, interactive yield calculator, ranked opportunities |
| **Property detail** | Mosaic gallery + keyboard lightbox, five intelligence scores, stylized neighborhood map with POIs, mortgage simulator, sticky booking |
| **Comparison tool** | Side-by-side matrix that crowns the strongest value in every row |
| **Property Mood selector** | Reshape the collection around _Romantic · Luxury · Family · Beachside · Minimalist…_ |
| **Agent/Admin dashboard** | Pipeline CRM, revenue analytics, lead sources, top listings |
| **Full experience** | Neighborhood intelligence, concierge services, storytelling About, luxury contact flow |

Every feature works with **zero external API keys** — powered by a rich local data
layer, with clean seams where real services (Supabase, Clerk, Google Maps, an LLM) plug in.

---

## 🛠 Tech Stack

- **[Next.js 16](https://nextjs.org)** (App Router, Server Components, Turbopack)
- **React 19** · **TypeScript** (strict)
- **Tailwind CSS v4** — design tokens via `@theme`, custom `@utility` primitives
- **Framer Motion** — reveals, shared-layout, springs, magnetic hovers
- **Lenis** — buttery smooth scrolling on a single rAF loop
- **Lucide** icons · **next/font** (self-hosted Fraunces + Geist) · **next/image** optimization

Custom-built (no heavy deps): the charts, the AI match engine, the concierge, the mortgage
and yield calculators, and the stylized map.

---

## 🚀 Getting Started

```bash
npm install
npm run dev        # http://localhost:3000
```

```bash
npm run build      # production build (all routes prerender)
npm run start      # serve the production build
npm run lint
```

**Requirements:** Node.js ≥ 20.9

> Remote imagery is served from Unsplash and whitelisted in
> [`next.config.ts`](./next.config.ts) via `images.remotePatterns`.

---

## 📁 Architecture

Feature-based, colocated by domain.

```
app/                      # App Router — one folder per route
  layout.tsx              # Root: fonts, metadata, viewport, smooth-scroll, chrome
  page.tsx                # Homepage (composed of home/* sections)
  properties/             # Listing (+ filters) & [slug] detail (SSG)
  ai-match/ invest/ compare/
  neighborhoods/ concierge/ about/ contact/ dashboard/
  sitemap.ts robots.ts not-found.tsx

components/
  home/                   # Homepage sections
  property/               # Card, gallery, scores, map, mortgage, booking
  properties/ compare/ invest/ ai-match/ assistant/ contact/
  charts/                 # Hand-built animated SVG charts
  layout/                 # Navbar, footer, logo, page-header
  ui/                     # Button, Reveal, SplitWords, Magnetic, SectionHeading
  providers/ visual/      # Lenis provider, grain overlay

lib/
  data/                   # properties, site content, curated verified imagery
  match.ts                # Explainable AI matching engine
  utils.ts                # cn(), currency formatters
```

### Design system

The entire aesthetic lives in [`app/globals.css`](./app/globals.css): the palette,
typography scale, motion easings, and reusable utilities (`.glass`, `.text-gold-gradient`,
`.eyebrow`, `.rule-gold`, `.luxe-range`, grain and reveal primitives). Theme it from one place.

---

## ⚡ Performance & Accessibility

- **Server Components** by default; `"use client"` only where interaction demands it
- **Static generation** — every route (incl. all property pages) prerenders
- `next/image` (AVIF/WebP, responsive `sizes`, priority hints, lazy loading)
- Self-hosted fonts (no layout shift, no external font requests)
- `prefers-reduced-motion` fully respected · keyboard-navigable gallery & menus
- Semantic landmarks, `aria-label`s, and focus states throughout
- SEO: per-route metadata + Open Graph, `sitemap.xml`, `robots.txt`

---

## 🔌 Where real services plug in

The build is intentionally key-free. To go live:

| Concern | Seam |
|---|---|
| Auth | Swap the `Sign in` / dashboard entry for Clerk |
| Data | Replace `lib/data/*` reads with Supabase queries |
| Maps | Drop a Google Maps embed into `components/property/detail-map.tsx` |
| AI | Point `lib/match.ts` / the concierge at a Claude endpoint |
| Forms | Wire the contact & booking handlers to your backend |

---

## 📝 Note

Luxora Estates is a **portfolio concept**. Imagery is royalty-free (Unsplash);
figures and residences are illustrative and not financial advice.

Crafted with intention.
