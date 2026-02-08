# Step 7: YouTube Subscriber Growth Projector

## Goal
Build the YouTube Subscriber Growth Projector with milestone detection and line chart.

## Feature module: `src/features/calculators/youtube-growth/`

### Files to create

1. **`projection.ts`** — Growth projection math
   - Inputs: current subscribers, monthly gain (absolute number or % growth rate)
   - Projects subscriber count month-by-month for 6/12/24 months
   - Linear growth mode: adds fixed number per month
   - Percentage growth mode: compounds monthly (more realistic for growing channels)
   - Milestone detection: finds when user will hit 1K, 10K, 100K, 1M subscribers
   - Returns array of { month, subscribers } data points + milestone markers

2. **`GrowthChart.tsx`** — Recharts line chart
   - X-axis: months, Y-axis: subscriber count
   - Line showing projected growth
   - Milestone markers (horizontal reference lines or annotations at 1K, 10K, 100K, 1M)
   - Responsive

3. **`YouTubeGrowthProjector.tsx`** — Main client component
   - Inputs: current subscriber count, monthly gain OR growth rate %, projection period toggle (6/12/24 months)
   - Results: projected subscriber count at end of period, milestones with estimated dates
   - Chart: growth projection line chart

4. **`index.ts`** — Public exports

### Route page: `src/app/(calculators)/youtube-subscriber-projector/page.tsx`
- SSG metadata, JSON-LD, FAQ, "How it works" copy
- Composes `<YouTubeGrowthProjector />`

## SEO targets
- "youtube subscriber projector"
- "youtube growth calculator"
- "when will I hit 1000 subscribers"
