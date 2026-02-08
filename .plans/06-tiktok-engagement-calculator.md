# Step 6: TikTok Engagement Rate Calculator

## Goal
Build the TikTok Engagement Rate Calculator with TikTok-specific metrics (views-based, includes shares).

## Project context
- **Project:** `C:\Users\titom\Projects\creaticalc` — a Next.js 15 (App Router) + TypeScript + Tailwind CSS v4 site
- **Repo:** https://github.com/titomb345/creaticalc
- **Branching:** feature branch → PR to `staging` → merge to `main` (triggers Netlify deploy)
- **Formatting:** Prettier is configured (run `npm run format` after changes). ESLint via `npm run lint`.
- **Charts:** Recharts is installed (`recharts@^3.7.0`)
- **Key conventions:** single quotes, 100 char line width, `'use client'` directive on interactive components

## Existing shared infrastructure (already built)

These components exist and should be reused:

- **`src/features/calculators/shared/CalculatorLayout.tsx`** — wraps calculator pages. Props: `title`, `description`, `children` (the calculator), `faq` (FAQItem[]), `howItWorks?` (ReactNode). Includes AdSlot placeholders above/below calculator.
- **`src/features/calculators/shared/ResultCard.tsx`** — displays a single result. Props: `label`, `value` (string), `comparison?` (string), `highlight?` (boolean).
- **`src/features/calculators/shared/FAQ.tsx`** — renders FAQ accordion with schema.org JSON-LD. Props: `items` (FAQItem[]).
- **`src/features/calculators/shared/types.ts`** — exports `CalculatorMeta` and `FAQItem` types.
- **`src/components/ui/NumberInput.tsx`** — labeled number input. Props: `label`, `value`, `min?`, `max?`, `step?`, `onChange`, `placeholder?`.
- **`src/components/ui/Card.tsx`** — simple bordered card wrapper. Props: `children`, `className?`.
- **`src/components/seo/CalculatorSchema.tsx`** — JSON-LD WebApplication schema. Props: `name`, `description`, `url`.

## Prior art
If Step 5 (Instagram Engagement Calculator) has been completed, this calculator follows the **exact same pattern** but with TikTok-specific formulas and benchmarks. Reference `src/features/calculators/instagram-engagement/` heavily — the file structure is identical.

**Key difference from Instagram:** TikTok engagement rate uses **views** as the denominator, not followers. This is the industry standard for TikTok because TikTok's algorithm serves content beyond a creator's followers.

## Feature module: `src/features/calculators/tiktok-engagement/`

### Files to create

1. **`benchmarks.ts`** — TikTok engagement benchmarks by follower tier
   - Same tier structure as Instagram: 0-1K, 1K-5K, 5K-10K, 10K-50K, 50K-100K, 100K-500K, 500K-1M, 1M+
   - TikTok engagement rates are generally **higher** than Instagram (nano ~10-15%, mid ~5-8%, mega ~3-5%)
   - Each tier: `{ tier: string, label: string, minFollowers: number, maxFollowers: number, avgRate: number, poor: number, good: number, excellent: number }`
   - Export `getBenchmarkForFollowerCount(followers: number)` helper
   - Export full `benchmarks` array

2. **`engagement.ts`** — TikTok-specific engagement formula
   - Formula: `((likes + comments + shares) / views) × 100`
   - `calculateEngagementRate(views: number, likes: number, comments: number, shares: number): number`
   - `getRating(rate: number, followers: number): { label: string, color: string }` — "Poor" / "Average" / "Good" / "Excellent"
   - Color coding: Poor = red (#ef4444), Average = amber (#f59e0b), Good = green (#10b981), Excellent = primary (#6d28d9)

3. **`EngagementChart.tsx`** — Recharts bar chart (`'use client'`)
   - Bar chart showing average engagement rate per follower tier
   - Highlight user's current tier (primary color vs muted)
   - Horizontal reference line at user's calculated rate
   - Responsive via `<ResponsiveContainer>`
   - Same visual pattern as Instagram chart

4. **`TikTokEngagementCalculator.tsx`** — Main client component (`'use client'`)
   - Inputs section (in a `<Card>`):
     - Follower count: `<NumberInput>` (min: 1, placeholder: "e.g., 50000")
     - Average views per video: `<NumberInput>` (min: 1, placeholder: "e.g., 10000")
     - Average likes per video: `<NumberInput>` (min: 0, placeholder: "e.g., 1500")
     - Average comments per video: `<NumberInput>` (min: 0, placeholder: "e.g., 50")
     - Average shares per video: `<NumberInput>` (min: 0, placeholder: "e.g., 25")
   - Results section (shown only when views > 0 and at least one interaction > 0):
     - `<ResultCard label="Engagement Rate" value="X.XX%" highlight={true} />`
     - `<ResultCard label="Rating" value="Good" comparison="Above average for your follower tier" />`
     - `<ResultCard label="Your Tier" value="10K-50K" comparison="Mid-tier creator" />`
   - Chart: `<EngagementChart>` with benchmark comparison
   - Note below chart explaining TikTok uses views (not followers) as denominator and why

5. **`index.ts`** — Public exports: `export { default as TikTokEngagementCalculator } from './TikTokEngagementCalculator'`

### Route page: `src/app/(calculators)/tiktok-engagement-rate-calculator/page.tsx`
- This page already exists as a placeholder — **replace its contents**
- SSG metadata targeting keywords:
  - Title: "TikTok Engagement Rate Calculator — Free Tool"
  - Description: "Calculate your TikTok engagement rate for free. Measure engagement using views, likes, comments, and shares with industry benchmarks."
- `<CalculatorSchema>` with name="TikTok Engagement Rate Calculator", description, url
- `<CalculatorLayout>` wrapping `<TikTokEngagementCalculator />`
- "How it works" section (2-3 paragraphs):
  - Explain the formula: (likes + comments + shares) / views × 100
  - Why TikTok uses views instead of followers (algorithm-driven discovery)
  - How engagement rate affects TikTok's algorithm and visibility
- FAQ section with 5-7 questions:
  - "What is a good TikTok engagement rate?"
  - "How is TikTok engagement rate calculated?"
  - "Why does TikTok use views instead of followers for engagement?"
  - "What is the average engagement rate on TikTok?"
  - "How can I improve my TikTok engagement rate?"
  - "Does TikTok engagement rate matter for brand deals?"
  - "What's the difference between TikTok and Instagram engagement rates?"

## SEO targets
- "tiktok engagement rate calculator"
- "tiktok engagement rate"
- "good engagement rate tiktok"
- "average tiktok engagement rate"
- "tiktok engagement calculator"

## Verification
1. `npm run lint` passes
2. `npm run format:check` passes (run `npm run format` first)
3. `npm run build` passes — page should be statically generated
4. Run `npm run dev` and verify at http://localhost:3000/tiktok-engagement-rate-calculator:
   - Entering views + likes + comments + shares shows engagement rate
   - Rating is based on TikTok benchmarks (higher thresholds than Instagram)
   - Chart renders with user's tier highlighted
   - FAQ accordion opens/closes
   - Results hidden when inputs are empty/zero
5. Commit to a feature branch and open PR to `staging`
