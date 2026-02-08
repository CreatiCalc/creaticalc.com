# Step 5: Instagram Engagement Rate Calculator

## Goal
Build the Instagram Engagement Rate Calculator with benchmarks and comparison chart.

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
- **`src/components/ui/Slider.tsx`** — labeled range slider. Props: `label`, `value`, `min`, `max`, `step?`, `onChange`, `formatValue?`.
- **`src/components/ui/NumberInput.tsx`** — labeled number input. Props: `label`, `value`, `min?`, `max?`, `step?`, `onChange`, `placeholder?`.
- **`src/components/ui/Select.tsx`** — labeled select dropdown. Props: `label`, `value`, `options` ({label, value}[]), `onChange`.
- **`src/components/ui/Card.tsx`** — simple bordered card wrapper. Props: `children`, `className?`.
- **`src/components/seo/CalculatorSchema.tsx`** — JSON-LD WebApplication schema. Props: `name`, `description`, `url`.

## Prior art
If Step 4 (YouTube Money Calculator) has been completed, reference its patterns for structure. Look at `src/features/calculators/youtube-money/` for the established pattern of how feature modules are organized.

## Feature module: `src/features/calculators/instagram-engagement/`

### Files to create

1. **`benchmarks.ts`** — IG engagement benchmarks by follower tier
   - Tiers: 0-1K (nano), 1K-5K, 5K-10K (micro), 10K-50K, 50K-100K (mid), 100K-500K, 500K-1M, 1M+ (mega)
   - Each tier exports: `{ tier: string, label: string, minFollowers: number, maxFollowers: number, avgRate: number, poor: number, good: number, excellent: number }`
   - Realistic benchmark data (nano creators ~5-8%, mid-tier ~2-3%, mega <1.5%)
   - Export a `getBenchmarkForFollowerCount(followers: number)` helper that returns the matching tier
   - Export the full `benchmarks` array for the comparison chart

2. **`engagement.ts`** — Engagement rate formula
   - Formula: `((likes + comments) / followers) × 100`
   - `calculateEngagementRate(followers: number, likes: number, comments: number): number`
   - `getRating(rate: number, followers: number): { label: string, color: string }` — returns "Poor" / "Average" / "Good" / "Excellent" based on the user's follower tier benchmarks
   - Color coding: Poor = red (#ef4444), Average = amber (#f59e0b), Good = green (#10b981), Excellent = primary (#6d28d9)

3. **`EngagementChart.tsx`** — Recharts bar chart (`'use client'`)
   - Bar chart showing average engagement rate per follower tier
   - Highlight the user's current tier with a different color (primary #6d28d9, others use muted #94a3b8)
   - Add a horizontal reference line showing the user's calculated rate
   - Responsive via `<ResponsiveContainer>`
   - Labeled axes, tooltip
   - X-axis: tier labels (e.g., "1K-5K"), Y-axis: engagement rate %

4. **`InstagramEngagementCalculator.tsx`** — Main client component (`'use client'`)
   - Inputs section (in a `<Card>`):
     - Follower count: `<NumberInput>` (min: 1, placeholder: "e.g., 10000")
     - Average likes per post: `<NumberInput>` (min: 0, placeholder: "e.g., 500")
     - Average comments per post: `<NumberInput>` (min: 0, placeholder: "e.g., 25")
   - Results section (shown only when all inputs > 0):
     - `<ResultCard label="Engagement Rate" value="X.XX%" highlight={true} />`
     - `<ResultCard label="Rating" value="Good" comparison="Above average for your follower tier" />`
     - `<ResultCard label="Your Tier" value="10K-50K" comparison="Mid-tier creator" />`
   - Chart: `<EngagementChart>` showing benchmark comparison with user's rate highlighted
   - Tips section below: brief text explaining what a good engagement rate means and how to improve it

5. **`index.ts`** — Public exports: `export { default as InstagramEngagementCalculator } from './InstagramEngagementCalculator'`

### Route page: `src/app/(calculators)/instagram-engagement-rate-calculator/page.tsx`
- This page already exists as a placeholder — **replace its contents**
- SSG metadata targeting keywords:
  - Title: "Instagram Engagement Rate Calculator — Free Tool"
  - Description: "Calculate your Instagram engagement rate for free. Compare your engagement against benchmarks by follower tier and see if your rate is good."
- `<CalculatorSchema>` with name="Instagram Engagement Rate Calculator", description, url
- `<CalculatorLayout>` wrapping `<InstagramEngagementCalculator />`
- "How it works" section (2-3 paragraphs):
  - Explain the formula: (likes + comments) / followers × 100
  - Why engagement rate matters more than follower count
  - How brands use engagement rate to evaluate creators
- FAQ section with 5-7 questions:
  - "What is a good engagement rate on Instagram?"
  - "How is Instagram engagement rate calculated?"
  - "What is the average engagement rate on Instagram?"
  - "Does Instagram engagement rate decrease as followers grow?"
  - "How can I improve my Instagram engagement rate?"
  - "What engagement rate do brands look for?"

## SEO targets
- "instagram engagement rate calculator"
- "engagement rate calculator"
- "good engagement rate instagram"
- "average instagram engagement rate"
- "instagram engagement rate by followers"

## Verification
1. `npm run lint` passes
2. `npm run format:check` passes (run `npm run format` first)
3. `npm run build` passes — page should be statically generated
4. Run `npm run dev` and verify at http://localhost:3000/instagram-engagement-rate-calculator:
   - Entering follower count + likes + comments shows engagement rate
   - Rating changes appropriately (e.g., 5% for 100K followers = "Excellent")
   - Chart renders with user's tier highlighted
   - FAQ accordion opens/closes
   - Results hidden when inputs are empty/zero
5. Commit to a feature branch and open PR to `staging`
