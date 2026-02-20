import { formatFollowerCount } from './formatters';
import type { EngagementIndustryId } from './niches';

// ─── Types ────────────────────────────────────────────────────────────────────

export type Platform = 'instagram' | 'tiktok' | 'facebook' | 'twitter';

export type FollowerTier = 'nano' | 'micro' | 'mid' | 'macro' | 'mega' | 'super';

export type EngagementRating = 'excellent' | 'good' | 'average' | 'below_average' | 'low';

export type LetterGrade = 'A+' | 'A' | 'A-' | 'B+' | 'B' | 'B-' | 'C+' | 'C' | 'D' | 'F';

export type InstagramCalcMethod = 'byFollowers' | 'byReach' | 'byImpressions';

export type IndustryId = EngagementIndustryId;

export type InstagramContentType = 'feed' | 'reels' | 'stories' | 'mixed';
export type TikTokCalcMethod = 'byFollowers' | 'byViews';
export type FacebookCalcMethod = 'byFollowers' | 'byReach';
export type TwitterCalcMethod = 'byFollowers' | 'byImpressions';

export const PLATFORM_NAMES: Record<Platform, string> = {
  instagram: 'Instagram',
  tiktok: 'TikTok',
  facebook: 'Facebook',
  twitter: 'X (Twitter)',
};

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
  avgReach?: number;
  avgImpressions?: number;
  instagramCalcMethod?: InstagramCalcMethod;
  // TikTok-specific
  avgShares?: number;
  avgViews?: number;
  calcMethod?: TikTokCalcMethod;
  // Facebook-specific
  facebookCalcMethod?: FacebookCalcMethod;
  // Twitter-specific
  twitterCalcMethod?: TwitterCalcMethod;
  avgReposts?: number;
  avgBookmarks?: number;
}

/** Type-safe accessor for dynamically-keyed EngagementInput fields. */
export function getInputField<K extends keyof EngagementInput>(
  input: EngagementInput,
  key: K
): EngagementInput[K] {
  return input[key];
}

/** Type-safe setter that returns a shallow copy with the field updated. */
export function setInputField<K extends keyof EngagementInput>(
  input: EngagementInput,
  key: K,
  value: EngagementInput[K]
): EngagementInput {
  return { ...input, [key]: value };
}

export interface EngagementBreakdown {
  likes: { count: number; pct: number };
  comments: { count: number; pct: number };
  saves?: { count: number; pct: number };
  shares?: { count: number; pct: number };
  reposts?: { count: number; pct: number };
  bookmarks?: { count: number; pct: number };
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

export interface HealthScore {
  score: number; // 0-100
  grade: LetterGrade;
  components: {
    rateBenchmark: number; // 0-40
    likeCommentRatio: number; // 0-20
    saveSharePct: number; // 0-20
    industryComparison: number; // 0-20
  };
}

export interface MultiFormulaResult {
  byFollowers: number;
  byReach: number | null;
  byImpressions: number | null;
}

export interface WhatIfScenario {
  id: string;
  label: string;
  description: string;
  changes: Partial<EngagementInput>;
}

export interface EstimatedReach {
  estimatedReach: number;
  estimatedImpressions: number;
  reachRate: number;
}

export interface CrossPlatformResult {
  currentPlatform: Platform;
  currentRate: number;
  currentRating: EngagementRating;
  otherPlatform: Platform;
  equivalentRate: number;
  otherRating: EngagementRating;
}

export interface YoYTrend {
  year: number;
  instagram: number;
  tiktok: number;
  facebook: number;
  twitter: number;
}

export interface IndustryBenchmark {
  id: IndustryId;
  name: string;
  instagram: number;
  tiktok: number;
  facebook: number;
  twitter: number;
}

// ─── Data Tables ──────────────────────────────────────────────────────────────

export interface TierData {
  tier: FollowerTier;
  label: string;
  min: number;
  max: number;
}

export interface TierBenchmark extends TierData {
  benchmarkLow: number;
  benchmarkHigh: number;
}

export const INSTAGRAM_TIERS: TierBenchmark[] = [
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

export const TIKTOK_TIERS: TierBenchmark[] = [
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

export const FACEBOOK_TIERS: TierBenchmark[] = [
  {
    tier: 'nano',
    label: 'Nano Page',
    min: 0,
    max: 9_999,
    benchmarkLow: 1.5,
    benchmarkHigh: 3.0,
  },
  {
    tier: 'micro',
    label: 'Micro Page',
    min: 10_000,
    max: 49_999,
    benchmarkLow: 0.8,
    benchmarkHigh: 1.8,
  },
  {
    tier: 'mid',
    label: 'Mid-Tier Page',
    min: 50_000,
    max: 199_999,
    benchmarkLow: 0.5,
    benchmarkHigh: 1.2,
  },
  {
    tier: 'macro',
    label: 'Macro Page',
    min: 200_000,
    max: 999_999,
    benchmarkLow: 0.2,
    benchmarkHigh: 0.8,
  },
  {
    tier: 'mega',
    label: 'Mega Page',
    min: 1_000_000,
    max: Infinity,
    benchmarkLow: 0.05,
    benchmarkHigh: 0.3,
  },
];

export const TWITTER_TIERS: TierBenchmark[] = [
  {
    tier: 'nano',
    label: 'Nano Account',
    min: 0,
    max: 9_999,
    benchmarkLow: 1.0,
    benchmarkHigh: 3.0,
  },
  {
    tier: 'micro',
    label: 'Micro Account',
    min: 10_000,
    max: 49_999,
    benchmarkLow: 0.5,
    benchmarkHigh: 1.5,
  },
  {
    tier: 'mid',
    label: 'Mid-Tier Account',
    min: 50_000,
    max: 199_999,
    benchmarkLow: 0.2,
    benchmarkHigh: 0.8,
  },
  {
    tier: 'macro',
    label: 'Macro Account',
    min: 200_000,
    max: 999_999,
    benchmarkLow: 0.1,
    benchmarkHigh: 0.4,
  },
  {
    tier: 'mega',
    label: 'Mega Account',
    min: 1_000_000,
    max: Infinity,
    benchmarkLow: 0.02,
    benchmarkHigh: 0.2,
  },
];

// View-based benchmarks for TikTok (engagement as % of views)
export const TIKTOK_VIEW_BENCHMARKS = {
  excellent: 12,
  good: 8,
  average: 5,
  belowAverage: 3,
};

// Reach-based benchmarks for Facebook (engagement as % of reach)
export const FACEBOOK_REACH_BENCHMARKS = {
  excellent: 8,
  good: 5,
  average: 3,
  belowAverage: 1.5,
};

// Impressions-based benchmarks for Twitter (engagement as % of impressions)
export const TWITTER_IMPRESSIONS_BENCHMARKS = {
  excellent: 5,
  good: 3,
  average: 1.5,
  belowAverage: 0.5,
};

export const INDUSTRY_BENCHMARKS: IndustryBenchmark[] = [
  {
    id: 'animals',
    name: 'Animals & Pets',
    instagram: 2.0,
    tiktok: 6.5,
    facebook: 0.18,
    twitter: 0.08,
  },
  {
    id: 'arts',
    name: 'Arts & Culture',
    instagram: 1.82,
    tiktok: 5.8,
    facebook: 0.12,
    twitter: 0.06,
  },
  {
    id: 'beauty',
    name: 'Beauty & Skincare',
    instagram: 0.87,
    tiktok: 4.5,
    facebook: 0.07,
    twitter: 0.02,
  },
  {
    id: 'design',
    name: 'Design & Architecture',
    instagram: 1.69,
    tiktok: 5.2,
    facebook: 0.1,
    twitter: 0.04,
  },
  {
    id: 'education',
    name: 'Education',
    instagram: 1.4,
    tiktok: 7.36,
    facebook: 0.22,
    twitter: 0.1,
  },
  { id: 'fashion', name: 'Fashion', instagram: 0.68, tiktok: 3.8, facebook: 0.05, twitter: 0.02 },
  {
    id: 'finance',
    name: 'Finance & Business',
    instagram: 0.85,
    tiktok: 4.2,
    facebook: 0.08,
    twitter: 0.06,
  },
  { id: 'food', name: 'Food & Drink', instagram: 1.15, tiktok: 6.8, facebook: 0.12, twitter: 0.03 },
  {
    id: 'health',
    name: 'Health & Fitness',
    instagram: 1.2,
    tiktok: 5.5,
    facebook: 0.1,
    twitter: 0.04,
  },
  { id: 'tech', name: 'Technology', instagram: 0.9, tiktok: 4.8, facebook: 0.05, twitter: 0.04 },
  { id: 'travel', name: 'Travel', instagram: 1.35, tiktok: 5.0, facebook: 0.07, twitter: 0.03 },
  {
    id: 'entertainment',
    name: 'Entertainment',
    instagram: 0.75,
    tiktok: 4.9,
    facebook: 0.08,
    twitter: 0.05,
  },
  { id: 'sports', name: 'Sports', instagram: 1.1, tiktok: 5.6, facebook: 0.15, twitter: 0.07 },
  {
    id: 'general',
    name: 'General / Other',
    instagram: 0.98,
    tiktok: 4.9,
    facebook: 0.06,
    twitter: 0.04,
  },
];

export const INDUSTRIES = INDUSTRY_BENCHMARKS.map((b) => ({ label: b.name, value: b.id }));

/** Canonical set of valid IndustryId values — use for codec validation instead of hardcoding. */
export const VALID_INDUSTRY_IDS: ReadonlySet<string> = new Set<string>(
  INDUSTRY_BENCHMARKS.map((b) => b.id)
);

/** Canonical set of valid InstagramContentType values. */
export const VALID_CONTENT_TYPES: ReadonlySet<string> = new Set<string>([
  'feed',
  'reels',
  'stories',
  'mixed',
]);

/** Canonical sets of valid calc-method values per platform. */
export const VALID_IG_CALC_METHODS: ReadonlySet<string> = new Set<string>([
  'byFollowers',
  'byReach',
  'byImpressions',
]);
export const VALID_TT_CALC_METHODS: ReadonlySet<string> = new Set<string>([
  'byFollowers',
  'byViews',
]);
export const VALID_FB_CALC_METHODS: ReadonlySet<string> = new Set<string>([
  'byFollowers',
  'byReach',
]);
export const VALID_TW_CALC_METHODS: ReadonlySet<string> = new Set<string>([
  'byFollowers',
  'byImpressions',
]);

// Brand deal base rates per 1K followers
export const BRAND_DEAL_BASE: Record<Platform, { low: number; high: number }> = {
  instagram: { low: 10, high: 25 },
  tiktok: { low: 5, high: 15 },
  facebook: { low: 5, high: 15 },
  twitter: { low: 8, high: 20 },
};

export const ENGAGEMENT_MULTIPLIERS: { maxRate: number; multiplier: number }[] = [
  { maxRate: 1, multiplier: 0.5 },
  { maxRate: 3, multiplier: 1.0 },
  { maxRate: 5, multiplier: 1.5 },
  { maxRate: Infinity, multiplier: 2.0 },
];

export const NICHE_MULTIPLIERS: Partial<Record<IndustryId, number>> = {
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

// Estimated organic reach as % of followers, by tier
export const REACH_RATES: Record<FollowerTier, number> = {
  nano: 70,
  micro: 40,
  mid: 25,
  macro: 15,
  mega: 10,
  super: 5,
};

// Platform-specific reach rate adjustments (multiplied against base REACH_RATES)
export const PLATFORM_REACH_MULTIPLIERS: Record<Platform, number> = {
  instagram: 1.0,
  tiktok: 1.0,
  facebook: 0.15, // Facebook organic reach is notoriously low (~2-6% for pages)
  twitter: 0.4, // Twitter/X reach is moderate
};

// Year-over-year average engagement rate trends
export const YOY_TRENDS: YoYTrend[] = [
  { year: 2023, instagram: 1.16, tiktok: 4.07, facebook: 0.06, twitter: 0.05 },
  { year: 2024, instagram: 1.05, tiktok: 4.4, facebook: 0.06, twitter: 0.04 },
  { year: 2025, instagram: 1.01, tiktok: 4.64, facebook: 0.063, twitter: 0.035 },
  { year: 2026, instagram: 0.98, tiktok: 4.9, facebook: 0.065, twitter: 0.03 },
];

// Platform averages for cross-platform comparison
export const PLATFORM_AVERAGES: Record<Platform, number> = {
  instagram: 0.98,
  tiktok: 4.9,
  facebook: 0.065,
  twitter: 0.03,
};

/** YouTube engagement rate range (view-based, not follower-based like other platforms). */
export const YOUTUBE_ENGAGEMENT_RANGE = { low: 3.5, high: 5.5 };

// ─── Tier Lookup Functions ───────────────────────────────────────────────────

export function getTiers(platform: Platform): TierBenchmark[] {
  switch (platform) {
    case 'instagram':
      return INSTAGRAM_TIERS;
    case 'tiktok':
      return TIKTOK_TIERS;
    case 'facebook':
      return FACEBOOK_TIERS;
    case 'twitter':
      return TWITTER_TIERS;
  }
}

/** Single tier lookup — all other tier helpers delegate to this. */
export function findTier(platform: Platform, followers: number): TierBenchmark {
  const tiers = getTiers(platform);
  return tiers.find((t) => followers >= t.min && followers <= t.max) ?? tiers[tiers.length - 1];
}

export function getFollowerTier(platform: Platform, followers: number): FollowerTier {
  return findTier(platform, followers).tier;
}

export function getTierLabel(platform: Platform, followers: number): string {
  return findTier(platform, followers).label;
}

export function getTierBenchmark(
  platform: Platform,
  followers: number
): { low: number; high: number } {
  const match = findTier(platform, followers);
  return { low: match.benchmarkLow, high: match.benchmarkHigh };
}

export function getTierRange(platform: Platform, followers: number): string {
  const tiers = getTiers(platform);
  const match = tiers.find((t) => followers >= t.min && followers <= t.max);
  if (!match) return '';
  if (match.max === Infinity) return `${formatFollowerCount(match.min)}+`;
  return `${formatFollowerCount(match.min)}–${formatFollowerCount(match.max)}`;
}

export function getIndustryBenchmark(platform: Platform, industryId: IndustryId): number {
  const industry = INDUSTRY_BENCHMARKS.find((b) => b.id === industryId);
  if (!industry) return PLATFORM_AVERAGES[platform];
  return industry[platform];
}

export function getTopIndustries(platform: Platform, count = 5): IndustryBenchmark[] {
  return [...INDUSTRY_BENCHMARKS].sort((a, b) => b[platform] - a[platform]).slice(0, count);
}

// ─── Multiplier Helpers ──────────────────────────────────────────────────────

/** Look up the engagement-rate multiplier used for brand-deal / sponsorship estimates. */
export function getEngagementMultiplier(engagementRate: number): number {
  return ENGAGEMENT_MULTIPLIERS.find((m) => engagementRate < m.maxRate)?.multiplier ?? 2.0;
}

/** Look up the niche/industry multiplier used for brand-deal / sponsorship estimates. */
export function getNicheMultiplier(industryId: IndustryId): number {
  return NICHE_MULTIPLIERS[industryId] ?? 1.0;
}

// ─── Utilities (canonical source: ./formatters) ─────────────────────────────

export { formatUSD, formatPercent, formatFollowerCount } from './formatters';
