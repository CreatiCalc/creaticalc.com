# Step 8: Landing Page Polish & SEO Copy

## Goal
Flesh out the landing page with proper SEO content, better design, and internal linking. This is the front door — it needs to convert organic traffic into calculator usage.

## Project context
- **Project:** `C:\Users\titom\Projects\creaticalc` — a Next.js 15 (App Router) + TypeScript + Tailwind CSS v4 site
- **Repo:** https://github.com/titomb345/creaticalc
- **Branching:** feature branch → PR to `staging` → merge to `main` (triggers Netlify deploy)
- **Formatting:** Prettier is configured (run `npm run format` after changes). ESLint via `npm run lint`.
- **Key conventions:** single quotes, 100 char line width

## Current state
The landing page (`src/app/page.tsx`) already exists with:
- Hero section with tagline "Free Calculators for Content Creators"
- 2×2 grid of calculator cards (title + description, links to each calculator)
- "Why CreatiCalc?" section with 3 stats (100%, Instant, Accurate)
- Uses `<Card>` component from `src/components/ui/Card.tsx`

The root layout (`src/app/layout.tsx`) already has:
- SEO metadata with title template, description, OpenGraph, Twitter card
- `metadataBase` set to `https://creaticalc.com`
- Header and Footer components

## File to modify: `src/app/page.tsx`

### Changes to make

1. **Enhance hero section**
   - Add a subtle gradient background or soft purple-to-white gradient behind the hero
   - Keep the existing tagline — it's good
   - Add a clear CTA button: "Try a Calculator" that smooth-scrolls to the calculator grid (or just uses an anchor link)

2. **Improve calculator card grid**
   - Add a small icon or visual indicator per calculator (can be a simple colored accent bar or emoji-free icon via CSS/SVG)
   - Add 2-3 brief bullet points per card explaining what the user will learn, e.g.:
     - YouTube Money: "Estimate daily, monthly & yearly earnings", "Compare CPM by niche", "12-month projection chart"
     - Instagram Engagement: "Calculate your engagement rate %", "See your rating vs benchmarks", "Compare across follower tiers"
     - TikTok Engagement: "Views-based engagement formula", "TikTok-specific benchmarks", "Rating with comparisons"
     - YouTube Growth: "Project growth over 6-24 months", "Linear & compound growth modes", "Milestone predictions (1K, 100K, 1M)"

3. **SEO copy section below the fold** — new section: "What is CreatiCalc?"
   - 2-3 paragraphs of natural-sounding SEO copy targeting broad keywords
   - Keywords to weave in naturally: "content creator calculators", "youtube earnings calculator", "instagram engagement rate", "tiktok engagement rate", "social media calculator", "creator tools"
   - Explain what the site offers, who it's for, and why it's free
   - Use an `<h2>` heading for SEO

4. **"How Creators Use Our Tools" section** (new)
   - 3 use cases in a grid:
     - "Negotiate brand deals" — know your worth with engagement data
     - "Track your growth" — project milestones and set goals
     - "Estimate earnings" — understand your revenue potential
   - Keep it brief — 1-2 sentences per use case

5. **Structured data** — add Organization JSON-LD schema to the landing page
   - Add `<script type="application/ld+json">` with Organization schema
   - Include: name, url, description, logo (can be placeholder URL for now)

6. **Internal linking verification**
   - Every calculator page links to all others via the `(calculators)/layout.tsx` "More Creator Tools" section — verify this still works
   - Footer links to all calculators — already in place

### Do NOT change
- The Header or Footer components (those are shared)
- The root layout metadata (already good)
- Don't add social proof numbers like "Used by X creators" — we don't have data yet

## SEO targets
- "content creator calculators"
- "free youtube calculator"
- "creator tools free"
- "social media calculator for creators"

## Verification
1. `npm run lint` passes
2. `npm run format:check` passes (run `npm run format` first)
3. `npm run build` passes
4. Run `npm run dev` and verify at http://localhost:3000:
   - Hero looks polished with gradient
   - Calculator cards have descriptive bullet points
   - SEO copy reads naturally (not keyword-stuffed)
   - All calculator links work
   - Page still feels clean and fast (no bloat)
   - View source shows Organization JSON-LD
5. Commit to a feature branch and open PR to `staging`
