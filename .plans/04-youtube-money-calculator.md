# Step 4: YouTube Money Calculator (Flagship)

## Goal
Build the fully functional YouTube Money Calculator — the highest-traffic page and SEO flagship.

## Project context
- **Project:** `C:\Users\titom\Projects\creaticalc` — a Next.js 15 (App Router) + TypeScript + Tailwind CSS v4 site
- **Repo:** https://github.com/titomb345/creaticalc
- **Branching:** feature branch → PR to `staging` → merge to `main` (triggers Netlify deploy)
- **Formatting:** Prettier is configured (run `npm run format` after changes). ESLint via `npm run lint`.
- **Charts:** Recharts is installed (`recharts@^3.7.0`)
- **Key conventions:** single quotes, 100 char line width, `"use client"` directive on interactive components

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

## Feature module: `src/features/calculators/youtube-money/`

### Files to create

1. **`cpm-data.ts`** — Niche CPM constants/ranges
   - Niches: Gaming, Tech, Finance, Beauty, Food, Travel, Education, Entertainment, Health, Lifestyle
   - Each niche has: low CPM, mid CPM, high CPM (in USD)
   - Source: industry averages (e.g., Finance $12-30, Gaming $2-5, Tech $6-12)
   - Export a `niches` array and a `getNicheCPM(nicheId: string)` helper

2. **`earnings.ts`** — Earnings calculation logic
   - Inputs: daily views, CPM low/mid/high
   - Formula: `(views / 1000) * CPM`
   - Output: daily, monthly (×30), yearly (×365) earnings as low/mid/high range
   - Also returns 12-month projection data array for chart: `{ month: string, low: number, mid: number, high: number }[]`

3. **`EarningsChart.tsx`** — Recharts bar chart (`"use client"`)
   - 12-month earnings projection
   - Low/mid/high bars per month (grouped bar chart)
   - Responsive via `<ResponsiveContainer>`
   - Labeled axes, tooltip, legend
   - Use project color palette: primary (#6d28d9), secondary (#06b6d4), accent (#f59e0b)

4. **`YouTubeMoneyCalculator.tsx`** — Main client component (`"use client"`)
   - Daily views: `<Slider>` (1,000 → 1,000,000, step 1000) + `<NumberInput>` synced together
   - Niche selector: `<Select>` dropdown that auto-sets CPM range from `cpm-data.ts`
   - Results section: 3 `<ResultCard>` components showing daily/monthly/yearly earnings as "$X — $Y" ranges. Monthly card should use `highlight={true}`.
   - Chart: `<EarningsChart>` showing 12-month projection
   - Niche CPM reference table below (HTML table showing all niches and their CPM ranges)
   - All wrapped in a `<Card>` component

5. **`index.ts`** — Public exports: `export { default as YouTubeMoneyCalculator } from './YouTubeMoneyCalculator'`

### Route page: `src/app/(calculators)/youtube-money-calculator/page.tsx`
- This page already exists as a placeholder — **replace its contents**
- SSG metadata: unique title, description, and OG tags targeting SEO keywords
- `<CalculatorSchema>` component for JSON-LD structured data
- `<CalculatorLayout>` wrapping `<YouTubeMoneyCalculator />`
- "How it works" section explaining CPM-based earnings estimation (2-3 paragraphs)
- FAQ section with 5-7 questions targeting long-tail keywords like:
  - "How much money do YouTubers make per view?"
  - "What is CPM on YouTube?"
  - "How much does YouTube pay for 1 million views?"
  - "What YouTube niche pays the most?"
  - "How do YouTubers get paid?"

## SEO targets
- "youtube money calculator"
- "youtube earnings calculator"
- "how much do youtubers make"
- "youtube revenue calculator"

## Verification
1. `npm run lint` passes
2. `npm run format:check` passes (run `npm run format` first)
3. `npm run build` passes — page should be statically generated
4. Run `npm run dev` and verify at http://localhost:3000/youtube-money-calculator:
   - Slider and number input stay synced
   - Changing niche updates CPM and results
   - Chart renders with 12 months of data
   - FAQ accordion opens/closes
5. Commit to a feature branch and open PR to `staging`
