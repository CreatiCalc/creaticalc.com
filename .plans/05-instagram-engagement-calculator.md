# Step 5: Instagram Engagement Rate Calculator

## Goal
Build the Instagram Engagement Rate Calculator with benchmarks and comparison chart.

## Feature module: `src/features/calculators/instagram-engagement/`

### Files to create

1. **`benchmarks.ts`** — IG engagement benchmarks by follower tier
   - Tiers: 0-1K, 1K-5K, 5K-10K, 10K-50K, 50K-100K, 100K-500K, 500K-1M, 1M+
   - Each tier: average engagement rate, poor/good/excellent thresholds
   - Source: industry benchmark data

2. **`engagement.ts`** — Engagement rate formula
   - Formula: `((likes + comments) / followers) × 100`
   - Rating function: takes rate + follower count → returns poor/average/good/excellent
   - Returns benchmark comparison data for the user's tier

3. **`EngagementChart.tsx`** — Recharts bar chart
   - Compares user's engagement rate vs. benchmarks across follower tiers
   - Highlights user's tier
   - Responsive

4. **`InstagramEngagementCalculator.tsx`** — Main client component
   - Inputs: follower count, avg likes per post, avg comments per post
   - Results: engagement rate %, rating badge, tier comparison
   - Chart: benchmark comparison

5. **`index.ts`** — Public exports

### Route page: `src/app/(calculators)/instagram-engagement-rate-calculator/page.tsx`
- SSG metadata, JSON-LD, FAQ, "How it works" copy
- Composes `<InstagramEngagementCalculator />`

## SEO targets
- "instagram engagement rate calculator"
- "engagement rate calculator"
- "good engagement rate instagram"
