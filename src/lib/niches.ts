/**
 * Canonical niche/industry taxonomy shared across all calculators.
 *
 * Each calculator domain uses a subset — YouTube calculators use YOUTUBE_NICHE_IDS,
 * engagement calculators use ENGAGEMENT_INDUSTRY_IDS. The full NicheId union covers
 * all possible values for type-safe cross-domain operations.
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
