# Step 6: TikTok Engagement Rate Calculator

## Goal
Build the TikTok Engagement Rate Calculator with TikTok-specific metrics (views + shares).

## Feature module: `src/features/calculators/tiktok-engagement/`

### Files to create

1. **`benchmarks.ts`** — TikTok engagement benchmarks by follower tier
   - Same tier structure as Instagram but with TikTok-specific rates
   - TikTok generally has higher engagement rates than IG
   - Tiers: 0-1K, 1K-5K, 5K-10K, 10K-50K, 50K-100K, 100K-500K, 500K-1M, 1M+

2. **`engagement.ts`** — TikTok-specific engagement formula
   - Formula: `((likes + comments + shares) / views) × 100`
   - Note: TikTok uses views as denominator (not followers) — this is industry standard
   - Rating function with TikTok-specific thresholds

3. **`EngagementChart.tsx`** — Recharts bar chart
   - Same pattern as Instagram but with TikTok benchmarks
   - Highlights user's tier

4. **`TikTokEngagementCalculator.tsx`** — Main client component
   - Inputs: follower count, avg views per video, avg likes, avg comments, avg shares
   - Results: engagement rate %, rating badge, tier comparison
   - Chart: benchmark comparison

5. **`index.ts`** — Public exports

### Route page: `src/app/(calculators)/tiktok-engagement-rate-calculator/page.tsx`
- SSG metadata, JSON-LD, FAQ, "How it works" copy
- Composes `<TikTokEngagementCalculator />`

## SEO targets
- "tiktok engagement rate calculator"
- "tiktok engagement rate"
- "good engagement rate tiktok"
