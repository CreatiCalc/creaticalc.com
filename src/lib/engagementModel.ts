// ─── Types ────────────────────────────────────────────────────────────────────

export type Platform = 'instagram' | 'tiktok';

export type FollowerTier = 'nano' | 'micro' | 'mid' | 'macro' | 'mega' | 'super';

export type EngagementRating = 'excellent' | 'good' | 'average' | 'below_average' | 'low';

export type IndustryId =
  | 'animals'
  | 'arts'
  | 'beauty'
  | 'design'
  | 'education'
  | 'fashion'
  | 'finance'
  | 'food'
  | 'health'
  | 'tech'
  | 'travel'
  | 'entertainment'
  | 'sports'
  | 'general';

export type InstagramContentType = 'feed' | 'reels' | 'stories' | 'mixed';
export type TikTokCalcMethod = 'byFollowers' | 'byViews';

export interface EngagementInput {
  platform: Platform;
  followers: number;
  avgLikes: number;
  avgComments: number;
  industryId: IndustryId;
  postsAnalyzed: number;
  // Instagram-specific
  avgSaves?: number;
  contentType?: InstagramContentType;
  // TikTok-specific
  avgShares?: number;
  avgViews?: number;
  calcMethod?: TikTokCalcMethod;
}

export interface EngagementBreakdown {
  likes: { count: number; pct: number };
  comments: { count: number; pct: number };
  saves?: { count: number; pct: number };
  shares?: { count: number; pct: number };
  total: number;
  likeToCommentRatio: number;
}

export interface EngagementResult {
  engagementRate: number;
  rating: EngagementRating;
  ratingLabel: string;
  followerTier: FollowerTier;
  tierLabel: string;
  tierBenchmark: { low: number; high: number };
  vsIndustryAvg: number;
  industryAvg: number;
  breakdown: EngagementBreakdown;
  brandDealEstimate: { low: number; high: number };
}

export interface EngagementRecommendation {
  id: string;
  text: string;
  detail: string;
}

export interface IndustryBenchmark {
  id: IndustryId;
  name: string;
  instagram: number;
  tiktok: number;
}

// ─── Data Tables ──────────────────────────────────────────────────────────────

interface TierData {
  tier: FollowerTier;
  label: string;
  min: number;
  max: number;
}

interface TierBenchmark extends TierData {
  benchmarkLow: number;
  benchmarkHigh: number;
}

const INSTAGRAM_TIERS: TierBenchmark[] = [
  { tier: 'nano', label: 'Nano Creator', min: 0, max: 9_999, benchmarkLow: 4, benchmarkHigh: 6 },
  {
    tier: 'micro',
    label: 'Micro Creator',
    min: 10_000,
    max: 49_999,
    benchmarkLow: 2,
    benchmarkHigh: 4,
  },
  {
    tier: 'mid',
    label: 'Mid-Tier Creator',
    min: 50_000,
    max: 499_999,
    benchmarkLow: 1.5,
    benchmarkHigh: 3,
  },
  {
    tier: 'macro',
    label: 'Macro Creator',
    min: 500_000,
    max: 999_999,
    benchmarkLow: 1,
    benchmarkHigh: 2,
  },
  {
    tier: 'mega',
    label: 'Mega Creator',
    min: 1_000_000,
    max: Infinity,
    benchmarkLow: 0.5,
    benchmarkHigh: 1.5,
  },
];

const TIKTOK_TIERS: TierBenchmark[] = [
  {
    tier: 'nano',
    label: 'Nano Creator',
    min: 0,
    max: 999,
    benchmarkLow: 10,
    benchmarkHigh: 18,
  },
  {
    tier: 'micro',
    label: 'Micro Creator',
    min: 1_000,
    max: 9_999,
    benchmarkLow: 8,
    benchmarkHigh: 12,
  },
  {
    tier: 'mid',
    label: 'Mid-Tier Creator',
    min: 10_000,
    max: 99_999,
    benchmarkLow: 6,
    benchmarkHigh: 8,
  },
  {
    tier: 'macro',
    label: 'Macro Creator',
    min: 100_000,
    max: 999_999,
    benchmarkLow: 5,
    benchmarkHigh: 7,
  },
  {
    tier: 'mega',
    label: 'Mega Creator',
    min: 1_000_000,
    max: 9_999_999,
    benchmarkLow: 4,
    benchmarkHigh: 6,
  },
  {
    tier: 'super',
    label: 'Super Creator',
    min: 10_000_000,
    max: Infinity,
    benchmarkLow: 2,
    benchmarkHigh: 4,
  },
];

// View-based benchmarks for TikTok (engagement as % of views)
const TIKTOK_VIEW_BENCHMARKS = {
  excellent: 12,
  good: 8,
  average: 5,
  belowAverage: 3,
};

export const INDUSTRY_BENCHMARKS: IndustryBenchmark[] = [
  { id: 'animals', name: 'Animals & Pets', instagram: 2.0, tiktok: 6.5 },
  { id: 'arts', name: 'Arts & Culture', instagram: 1.82, tiktok: 5.8 },
  { id: 'beauty', name: 'Beauty & Skincare', instagram: 0.87, tiktok: 4.5 },
  { id: 'design', name: 'Design & Architecture', instagram: 1.69, tiktok: 5.2 },
  { id: 'education', name: 'Education', instagram: 1.4, tiktok: 7.36 },
  { id: 'fashion', name: 'Fashion', instagram: 0.68, tiktok: 3.8 },
  { id: 'finance', name: 'Finance & Business', instagram: 0.85, tiktok: 4.2 },
  { id: 'food', name: 'Food & Drink', instagram: 1.15, tiktok: 6.8 },
  { id: 'health', name: 'Health & Fitness', instagram: 1.2, tiktok: 5.5 },
  { id: 'tech', name: 'Technology', instagram: 0.9, tiktok: 4.8 },
  { id: 'travel', name: 'Travel', instagram: 1.35, tiktok: 5.0 },
  { id: 'entertainment', name: 'Entertainment', instagram: 0.75, tiktok: 4.9 },
  { id: 'sports', name: 'Sports', instagram: 1.1, tiktok: 5.6 },
  { id: 'general', name: 'General / Other', instagram: 0.98, tiktok: 4.9 },
];

export const INDUSTRIES = INDUSTRY_BENCHMARKS.map((b) => ({ label: b.name, value: b.id }));

// Brand deal base rates per 1K followers
const BRAND_DEAL_BASE: Record<Platform, { low: number; high: number }> = {
  instagram: { low: 10, high: 25 },
  tiktok: { low: 5, high: 15 },
};

const ENGAGEMENT_MULTIPLIERS: { maxRate: number; multiplier: number }[] = [
  { maxRate: 1, multiplier: 0.5 },
  { maxRate: 3, multiplier: 1.0 },
  { maxRate: 5, multiplier: 1.5 },
  { maxRate: Infinity, multiplier: 2.0 },
];

const NICHE_MULTIPLIERS: Partial<Record<IndustryId, number>> = {
  finance: 2.0,
  tech: 1.5,
  education: 1.3,
  health: 1.2,
  beauty: 1.2,
  travel: 1.1,
  food: 1.0,
  fashion: 1.0,
  entertainment: 0.8,
  sports: 0.9,
};

// ─── Core Functions ───────────────────────────────────────────────────────────

function getTiers(platform: Platform): TierBenchmark[] {
  return platform === 'instagram' ? INSTAGRAM_TIERS : TIKTOK_TIERS;
}

export function getFollowerTier(platform: Platform, followers: number): FollowerTier {
  const tiers = getTiers(platform);
  const match = tiers.find((t) => followers >= t.min && followers <= t.max);
  return match?.tier ?? tiers[tiers.length - 1].tier;
}

export function getTierLabel(platform: Platform, followers: number): string {
  const tiers = getTiers(platform);
  const match = tiers.find((t) => followers >= t.min && followers <= t.max);
  return match?.label ?? tiers[tiers.length - 1].label;
}

export function getTierBenchmark(
  platform: Platform,
  followers: number
): { low: number; high: number } {
  const tiers = getTiers(platform);
  const match = tiers.find((t) => followers >= t.min && followers <= t.max);
  if (!match) {
    const last = tiers[tiers.length - 1];
    return { low: last.benchmarkLow, high: last.benchmarkHigh };
  }
  return { low: match.benchmarkLow, high: match.benchmarkHigh };
}

export function getTierRange(platform: Platform, followers: number): string {
  const tiers = getTiers(platform);
  const match = tiers.find((t) => followers >= t.min && followers <= t.max);
  if (!match) return '';
  if (match.max === Infinity) return `${formatFollowerCount(match.min)}+`;
  return `${formatFollowerCount(match.min)}–${formatFollowerCount(match.max)}`;
}

export function calculateEngagementRate(input: EngagementInput): number {
  const { platform, followers, avgLikes, avgComments } = input;

  if (platform === 'tiktok' && input.calcMethod === 'byViews') {
    const views = input.avgViews ?? 0;
    if (views <= 0) return 0;
    const totalInteractions = avgLikes + avgComments + (input.avgShares ?? 0);
    return (totalInteractions / views) * 100;
  }

  if (followers <= 0) return 0;

  if (platform === 'instagram') {
    const saves = input.avgSaves ?? 0;
    return ((avgLikes + avgComments + saves) / followers) * 100;
  }

  // TikTok by followers
  const shares = input.avgShares ?? 0;
  return ((avgLikes + avgComments + shares) / followers) * 100;
}

export function rateEngagement(
  platform: Platform,
  followers: number,
  rate: number,
  calcMethod?: TikTokCalcMethod
): EngagementRating {
  // TikTok view-based uses its own scale
  if (platform === 'tiktok' && calcMethod === 'byViews') {
    if (rate >= TIKTOK_VIEW_BENCHMARKS.excellent) return 'excellent';
    if (rate >= TIKTOK_VIEW_BENCHMARKS.good) return 'good';
    if (rate >= TIKTOK_VIEW_BENCHMARKS.average) return 'average';
    if (rate >= TIKTOK_VIEW_BENCHMARKS.belowAverage) return 'below_average';
    return 'low';
  }

  const benchmark = getTierBenchmark(platform, followers);
  const mid = (benchmark.low + benchmark.high) / 2;

  if (rate >= benchmark.high * 1.2) return 'excellent';
  if (rate >= mid) return 'good';
  if (rate >= benchmark.low) return 'average';
  if (rate >= benchmark.low * 0.5) return 'below_average';
  return 'low';
}

export function getRatingLabel(rating: EngagementRating): string {
  const labels: Record<EngagementRating, string> = {
    excellent: 'Excellent',
    good: 'Good',
    average: 'Average',
    below_average: 'Below Average',
    low: 'Low',
  };
  return labels[rating];
}

export function getRatingColor(rating: EngagementRating): string {
  const colors: Record<EngagementRating, string> = {
    excellent: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    good: 'text-green-600 bg-green-50 border-green-200',
    average: 'text-yellow-600 bg-yellow-50 border-yellow-200',
    below_average: 'text-orange-600 bg-orange-50 border-orange-200',
    low: 'text-red-600 bg-red-50 border-red-200',
  };
  return colors[rating];
}

export function calculateBreakdown(input: EngagementInput): EngagementBreakdown {
  const { platform, avgLikes, avgComments } = input;

  let total: number;
  let saves: { count: number; pct: number } | undefined;
  let shares: { count: number; pct: number } | undefined;

  if (platform === 'instagram') {
    const savesCount = input.avgSaves ?? 0;
    total = avgLikes + avgComments + savesCount;
    saves = { count: savesCount, pct: total > 0 ? (savesCount / total) * 100 : 0 };
  } else {
    const sharesCount = input.avgShares ?? 0;
    total = avgLikes + avgComments + sharesCount;
    shares = { count: sharesCount, pct: total > 0 ? (sharesCount / total) * 100 : 0 };
  }

  return {
    likes: { count: avgLikes, pct: total > 0 ? (avgLikes / total) * 100 : 0 },
    comments: { count: avgComments, pct: total > 0 ? (avgComments / total) * 100 : 0 },
    saves,
    shares,
    total,
    likeToCommentRatio: avgComments > 0 ? avgLikes / avgComments : 0,
  };
}

export function getIndustryBenchmark(platform: Platform, industryId: IndustryId): number {
  const industry = INDUSTRY_BENCHMARKS.find((b) => b.id === industryId);
  if (!industry) return platform === 'instagram' ? 0.98 : 4.9;
  return platform === 'instagram' ? industry.instagram : industry.tiktok;
}

export function getTopIndustries(platform: Platform, count = 5): IndustryBenchmark[] {
  return [...INDUSTRY_BENCHMARKS]
    .sort((a, b) => {
      const aVal = platform === 'instagram' ? a.instagram : a.tiktok;
      const bVal = platform === 'instagram' ? b.instagram : b.tiktok;
      return bVal - aVal;
    })
    .slice(0, count);
}

export function estimateBrandDealRate(
  platform: Platform,
  followers: number,
  engagementRate: number,
  industryId: IndustryId
): { low: number; high: number } {
  const base = BRAND_DEAL_BASE[platform];
  const followerK = followers / 1000;

  // Engagement multiplier
  const engMul = ENGAGEMENT_MULTIPLIERS.find((m) => engagementRate < m.maxRate)?.multiplier ?? 2.0;

  // Niche multiplier
  const nicheMul = NICHE_MULTIPLIERS[industryId] ?? 1.0;

  return {
    low: Math.round(followerK * base.low * engMul * nicheMul),
    high: Math.round(followerK * base.high * engMul * nicheMul),
  };
}

// ─── Master Compute ───────────────────────────────────────────────────────────

export function computeEngagement(input: EngagementInput): EngagementResult {
  const rate = calculateEngagementRate(input);
  const tier = getFollowerTier(input.platform, input.followers);
  const tierLabel = getTierLabel(input.platform, input.followers);
  const tierBenchmark = getTierBenchmark(input.platform, input.followers);
  const rating = rateEngagement(input.platform, input.followers, rate, input.calcMethod);
  const ratingLabel = getRatingLabel(rating);
  const breakdown = calculateBreakdown(input);
  const industryAvg = getIndustryBenchmark(input.platform, input.industryId);
  const brandDealEstimate = estimateBrandDealRate(
    input.platform,
    input.followers,
    rate,
    input.industryId
  );

  return {
    engagementRate: rate,
    rating,
    ratingLabel,
    followerTier: tier,
    tierLabel,
    tierBenchmark,
    vsIndustryAvg: rate - industryAvg,
    industryAvg,
    breakdown,
    brandDealEstimate,
  };
}

// ─── Recommendations ──────────────────────────────────────────────────────────

export function generateEngagementRecommendations(
  input: EngagementInput,
  result: EngagementResult
): EngagementRecommendation[] {
  const recs: EngagementRecommendation[] = [];
  const { rating, breakdown, engagementRate, tierBenchmark } = result;
  const isInstagram = input.platform === 'instagram';

  // Low/below average: content quality tips
  if (rating === 'low' || rating === 'below_average') {
    recs.push({
      id: 'improve-content',
      text: 'Improve content quality and consistency',
      detail: `Your engagement rate of ${formatPercent(engagementRate)} is below the ${formatPercent(tierBenchmark.low)}–${formatPercent(tierBenchmark.high)} benchmark for your follower tier. Focus on creating content that sparks conversation — ask questions in captions, share personal stories, and use strong hooks in the first 1–2 seconds.`,
    });

    recs.push({
      id: 'posting-frequency',
      text: 'Optimize your posting schedule',
      detail: isInstagram
        ? 'Post consistently 4–7 times per week. Use Instagram Insights to find when your audience is most active. Reels tend to get 2–3x more reach than static feed posts.'
        : "Post 1–3 times daily during peak hours (7–9 AM, 12–3 PM, 7–11 PM in your audience's timezone). Consistency signals the algorithm to push your content to more viewers.",
    });
  }

  // Like-to-comment ratio analysis
  if (breakdown.likeToCommentRatio > 50) {
    recs.push({
      id: 'boost-comments',
      text: 'Encourage more comments to boost engagement quality',
      detail: `Your like-to-comment ratio is ${Math.round(breakdown.likeToCommentRatio)}:1, meaning your audience is passive. Brands value comments more than likes. Try ending posts with a question, running polls, or responding to every comment within the first hour to encourage conversation.`,
    });
  }

  // Platform-specific tips
  if (isInstagram) {
    if (breakdown.saves && breakdown.saves.pct < 10) {
      recs.push({
        id: 'increase-saves',
        text: 'Create more saveable content',
        detail:
          'Saves are the most valuable engagement signal for the Instagram algorithm. Create educational carousels, tip lists, recipes, or reference guides that people want to revisit. Content that teaches something is saved 3x more often than entertainment content.',
      });
    }
    if (input.contentType === 'feed') {
      recs.push({
        id: 'try-reels',
        text: 'Incorporate Reels into your content mix',
        detail:
          'Instagram Reels reach 2–3x more non-followers than static feed posts. Even repurposing your best-performing feed content as short-form video can significantly boost your engagement rate and attract new followers.',
      });
    }
  } else {
    if (breakdown.shares && breakdown.shares.pct < 5) {
      recs.push({
        id: 'increase-shares',
        text: 'Create more shareable content',
        detail:
          'Shares are TikTok\'s strongest signal for viral distribution. Create relatable content, duet-worthy videos, or "send this to someone who..." formats. Videos that get shared reach entirely new audience circles beyond the For You Page.',
      });
    }
    if (input.calcMethod === 'byViews' && input.avgViews && input.followers > 0) {
      const viewToFollowerRatio = input.avgViews / input.followers;
      if (viewToFollowerRatio < 0.5) {
        recs.push({
          id: 'improve-reach',
          text: 'Improve your video reach',
          detail: `Your average views are only ${Math.round(viewToFollowerRatio * 100)}% of your follower count. Use trending sounds, relevant hashtags, and hook viewers in the first second. The algorithm prioritizes watch time — aim for videos where viewers watch at least 70% through.`,
        });
      }
    }
  }

  // Good/excellent: monetization tips
  if (rating === 'good' || rating === 'excellent') {
    recs.push({
      id: 'monetize',
      text: 'Your engagement is strong — start monetizing',
      detail: `With a ${formatPercent(engagementRate)} engagement rate, you're well above the benchmark for your tier. Brands typically look for 2%+ on Instagram and 5%+ on TikTok. Start reaching out to brands in your niche or join creator marketplaces like AspireIQ, Grin, or CreatorIQ to connect with sponsors.`,
    });

    if (result.brandDealEstimate.high > 0) {
      recs.push({
        id: 'brand-deal-value',
        text: `Your estimated brand deal value: ${formatUSD(result.brandDealEstimate.low)}–${formatUSD(result.brandDealEstimate.high)} per post`,
        detail:
          'This estimate is based on your follower count, engagement rate, and content niche. When negotiating with brands, lead with your engagement rate — it matters more than follower count. Brands pay a premium for engaged audiences because they convert better.',
      });
    }
  }

  // Average: growth tips
  if (rating === 'average') {
    recs.push({
      id: 'grow-engagement',
      text: "You're on track — focus on deepening engagement",
      detail: `Your engagement rate is within the expected range for your tier. To move into "good" territory (${formatPercent(tierBenchmark.high)}+), focus on: responding to comments quickly, creating series content that keeps viewers coming back, and collaborating with creators in your niche.`,
    });
  }

  return recs.slice(0, 5);
}

// ─── Utilities ────────────────────────────────────────────────────────────────

export function formatPercent(value: number): string {
  return `${value.toFixed(2)}%`;
}

export function formatFollowerCount(count: number): string {
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(count % 1_000_000 === 0 ? 0 : 1)}M`;
  if (count >= 1_000) return `${(count / 1_000).toFixed(count % 1_000 === 0 ? 0 : 1)}K`;
  return count.toLocaleString();
}

export function formatUSD(amount: number): string {
  return amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });
}
