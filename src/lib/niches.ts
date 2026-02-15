/**
 * Canonical niche/industry taxonomy shared across all calculators.
 *
 * Each calculator domain uses a subset — YouTube calculators use YOUTUBE_NICHE_IDS,
 * engagement calculators use ENGAGEMENT_INDUSTRY_IDS. The full NicheId union covers
 * all possible values for type-safe cross-domain operations.
 *
 * YouTube-specific data (CPM ranges, growth rates) is co-located here so there is
 * a single source of truth for niche names and their associated metrics.
 */

export const YOUTUBE_NICHE_IDS = [
  'finance',
  'tech',
  'education',
  'health',
  'beauty',
  'travel',
  'food',
  'lifestyle',
  'entertainment',
  'gaming',
] as const;

export const ENGAGEMENT_INDUSTRY_IDS = [
  'animals',
  'arts',
  'beauty',
  'design',
  'education',
  'fashion',
  'finance',
  'food',
  'health',
  'tech',
  'travel',
  'entertainment',
  'sports',
  'general',
] as const;

export type YouTubeNicheId = (typeof YOUTUBE_NICHE_IDS)[number];
export type EngagementIndustryId = (typeof ENGAGEMENT_INDUSTRY_IDS)[number];
export type NicheId = YouTubeNicheId | EngagementIndustryId;

export const NICHE_NAMES: Record<NicheId, string> = {
  animals: 'Animals & Pets',
  arts: 'Arts & Crafts',
  beauty: 'Beauty & Fashion',
  design: 'Design',
  education: 'Education',
  entertainment: 'Entertainment',
  fashion: 'Fashion',
  finance: 'Finance & Business',
  food: 'Food & Cooking',
  gaming: 'Gaming',
  general: 'General',
  health: 'Health & Fitness',
  lifestyle: 'Lifestyle',
  sports: 'Sports',
  tech: 'Technology',
  travel: 'Travel',
};

// ─── YouTube-Specific Niche Data ─────────────────────────────────────────────

export interface RpmRange {
  low: number;
  mid: number;
  high: number;
}

export interface YouTubeNicheData {
  name: string;
  cpm: RpmRange;
  avgMonthlyGrowthPct: number;
}

/**
 * Single source of truth for YouTube niche metadata.
 * Used by both the earnings model (CPM/RPM) and the growth model (growth %).
 */
export const YOUTUBE_NICHE_DATA: Record<YouTubeNicheId, YouTubeNicheData> = {
  finance: {
    name: 'Finance & Business',
    cpm: { low: 20, mid: 32, high: 50 },
    avgMonthlyGrowthPct: 3.5,
  },
  tech: { name: 'Technology', cpm: { low: 8, mid: 12, high: 18 }, avgMonthlyGrowthPct: 4.0 },
  education: { name: 'Education', cpm: { low: 5, mid: 8, high: 12 }, avgMonthlyGrowthPct: 5.0 },
  health: { name: 'Health & Fitness', cpm: { low: 5, mid: 8, high: 12 }, avgMonthlyGrowthPct: 4.5 },
  beauty: { name: 'Beauty & Fashion', cpm: { low: 3, mid: 6, high: 10 }, avgMonthlyGrowthPct: 3.0 },
  travel: { name: 'Travel', cpm: { low: 4, mid: 7, high: 10 }, avgMonthlyGrowthPct: 3.5 },
  food: { name: 'Food & Cooking', cpm: { low: 3, mid: 5, high: 8 }, avgMonthlyGrowthPct: 4.0 },
  lifestyle: { name: 'Lifestyle', cpm: { low: 2, mid: 4, high: 6 }, avgMonthlyGrowthPct: 3.0 },
  entertainment: {
    name: 'Entertainment',
    cpm: { low: 1.5, mid: 2.5, high: 4 },
    avgMonthlyGrowthPct: 6.0,
  },
  gaming: { name: 'Gaming', cpm: { low: 1.5, mid: 3, high: 5 }, avgMonthlyGrowthPct: 5.5 },
};
