# Step 4: YouTube Money Calculator (Flagship)

## Goal
Build the fully functional YouTube Money Calculator — the highest-traffic page and SEO flagship.

## Feature module: `src/features/calculators/youtube-money/`

### Files to create

1. **`cpm-data.ts`** — Niche CPM constants/ranges
   - Niches: Gaming, Tech, Finance, Beauty, Food, Travel, Education, Entertainment, Health, Lifestyle
   - Each niche has: low CPM, mid CPM, high CPM (in USD)
   - Source: industry averages (e.g., Finance $12-30, Gaming $2-5, Tech $6-12)

2. **`earnings.ts`** — Earnings calculation logic
   - Inputs: daily views, CPM low/mid/high
   - Formula: `(views / 1000) * CPM`
   - Output: daily, monthly (×30), yearly (×365) earnings as low/mid/high range
   - Returns 12-month projection data for chart

3. **`EarningsChart.tsx`** — Recharts bar chart
   - 12-month earnings projection
   - Low/mid/high bars per month
   - Responsive, labeled axes

4. **`YouTubeMoneyCalculator.tsx`** — Main client component
   - Daily views: slider (1,000 → 1,000,000) + manual number input
   - Niche selector: dropdown that auto-sets CPM range
   - Results: 3 ResultCards (daily/monthly/yearly earnings as ranges)
   - Chart: 12-month earnings projection
   - Niche CPM reference table below

5. **`index.ts`** — Public exports

### Route page: `src/app/(calculators)/youtube-money-calculator/page.tsx`
- SSG metadata (title, description, OG tags)
- JSON-LD WebApplication schema
- "How it works" SEO copy
- FAQ section (5-7 questions targeting long-tail keywords)
- Composes `<YouTubeMoneyCalculator />`

## SEO targets
- "youtube money calculator"
- "youtube earnings calculator"
- "how much do youtubers make"
- "youtube revenue calculator"
