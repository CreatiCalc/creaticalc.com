# Step 7: YouTube Subscriber Growth Projector

## Goal
Build the YouTube Subscriber Growth Projector with milestone detection and line chart visualization.

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
Reference the other completed calculator feature modules (e.g., `src/features/calculators/youtube-money/`) for the established patterns. This calculator is **different** from the engagement calculators — it uses a **line chart** (not bar chart) and has a **time-based projection** with milestone detection.

## Feature module: `src/features/calculators/youtube-growth/`

### Files to create

1. **`projection.ts`** — Growth projection math
   - Two growth modes:
     - **Linear:** `subscribers + (monthlyGain × months)` — adds fixed number per month
     - **Percentage:** `subscribers × (1 + rate/100)^months` — compounds monthly (more realistic)
   - `projectGrowth(currentSubs: number, monthlyGain: number, months: number, mode: 'linear' | 'percentage'): ProjectionData[]`
     - Returns array: `{ month: number, label: string, subscribers: number }[]`
     - `label` should be "Month 1", "Month 2", etc. (or actual month names based on current date)
   - `detectMilestones(currentSubs: number, projections: ProjectionData[]): Milestone[]`
     - Milestones to detect: 100, 1,000, 10,000, 50,000, 100,000, 500,000, 1,000,000
     - Only return milestones that haven't been reached yet (skip milestones below currentSubs)
     - Each milestone: `{ target: number, label: string, monthNumber: number | null }` (null if not reached in projection period)
   - Export types: `ProjectionData`, `Milestone`, `GrowthMode`

2. **`GrowthChart.tsx`** — Recharts line chart (`'use client'`)
   - X-axis: month labels, Y-axis: subscriber count (formatted: 1K, 10K, 100K, 1M)
   - Smooth line showing projected growth curve (primary color #6d28d9)
   - Milestone markers: use Recharts `<ReferenceLine>` with labels at milestone subscriber counts (e.g., dashed horizontal lines at 1K, 10K, 100K, 1M with labels)
   - Only show reference lines for milestones within the chart's Y range
   - Area fill below the line (light primary with opacity)
   - Responsive via `<ResponsiveContainer>`
   - Tooltip showing exact subscriber count per month

3. **`YouTubeGrowthProjector.tsx`** — Main client component (`'use client'`)
   - Inputs section (in a `<Card>`):
     - Current subscriber count: `<NumberInput>` (min: 0, placeholder: "e.g., 2500")
     - Growth mode toggle: two buttons or `<Select>` — "Fixed monthly gain" vs "Monthly growth rate %"
     - If linear mode: Monthly subscriber gain `<Slider>` (10 → 50,000, step varies) + `<NumberInput>`
     - If percentage mode: Monthly growth rate % `<Slider>` (0.5% → 30%, step 0.5) + `<NumberInput>`
     - Projection period: 3 toggle buttons for 6 / 12 / 24 months
   - Results section:
     - `<ResultCard label="Projected Subscribers" value="125,000" highlight={true} comparison="In 12 months" />`
     - `<ResultCard label="Total Growth" value="+100,000" comparison="400% increase" />`
   - Milestones section: list of milestones with estimated month ("You'll hit 100K in Month 8" or "Not reached in this period")
     - Style reached milestones with success color, unreached with muted
   - Chart: `<GrowthChart>` with projection line and milestone reference lines

4. **`index.ts`** — Public exports: `export { default as YouTubeGrowthProjector } from './YouTubeGrowthProjector'`

### Route page: `src/app/(calculators)/youtube-subscriber-projector/page.tsx`
- This page already exists as a placeholder — **replace its contents**
- SSG metadata targeting keywords:
  - Title: "YouTube Subscriber Growth Projector — Free Calculator"
  - Description: "Project your YouTube subscriber growth for free. See when you'll hit 1K, 10K, 100K, and 1M subscribers based on your current growth rate."
- `<CalculatorSchema>` with name="YouTube Subscriber Growth Projector", description, url
- `<CalculatorLayout>` wrapping `<YouTubeGrowthProjector />`
- "How it works" section (2-3 paragraphs):
  - Explain linear vs percentage growth modes
  - Why compound growth is more realistic for growing channels
  - How YouTube milestone thresholds matter (1K = monetization, 100K = Silver Play Button, etc.)
- FAQ section with 5-7 questions:
  - "How fast do YouTube channels grow?"
  - "When will I hit 1,000 subscribers on YouTube?"
  - "What is a good YouTube subscriber growth rate?"
  - "How many subscribers do you need to make money on YouTube?"
  - "Does subscriber growth compound over time?"
  - "What milestones matter on YouTube?"
  - "How can I grow my YouTube channel faster?"

## SEO targets
- "youtube subscriber projector"
- "youtube growth calculator"
- "when will I hit 1000 subscribers"
- "youtube subscriber growth rate"
- "youtube channel growth projector"

## Verification
1. `npm run lint` passes
2. `npm run format:check` passes (run `npm run format` first)
3. `npm run build` passes — page should be statically generated
4. Run `npm run dev` and verify at http://localhost:3000/youtube-subscriber-projector:
   - Linear mode: growth line is straight
   - Percentage mode: growth line curves upward (compound)
   - Switching between 6/12/24 months updates chart and projections
   - Milestones display correctly (e.g., starting at 500 subs with 200/month gain → "1K in Month 3")
   - Chart reference lines appear only for relevant milestones
   - FAQ accordion opens/closes
5. Commit to a feature branch and open PR to `staging`
