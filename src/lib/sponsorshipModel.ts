import type { Platform, IndustryId, FollowerTier } from './engagementBenchmarks';
import {
  getFollowerTier,
  getTierLabel,
  formatUSD,
  formatFollowerCount,
  getEngagementMultiplier,
  getNicheMultiplier,
} from './engagementBenchmarks';

// ─── Types ────────────────────────────────────────────────────────────────────

export type InstagramContentType = 'feedPost' | 'reel' | 'story' | 'carousel';
export type TikTokContentType = 'video' | 'story' | 'live';
export type SponsorshipContentType = InstagramContentType | TikTokContentType;

export type DealType = 'mention' | 'dedicated' | 'review' | 'series';

export interface SponsorshipInput {
  platform: Platform;
  followers: number;
  engagementRate: number;
  contentType: SponsorshipContentType;
  dealType: DealType;
  industryId: IndustryId;
  dealsPerMonth: number;
}

export interface RateRange {
  low: number;
  mid: number;
  high: number;
}

export interface RateCardEntry {
  contentType: SponsorshipContentType;
  label: string;
  rate: RateRange;
}

export interface TierRateInfo {
  tier: FollowerTier;
  label: string;
  followerRange: string;
  typicalRate: RateRange;
}

export interface SponsorshipResult {
  rate: RateRange;
  rateCard: RateCardEntry[];
  monthlyEarnings: RateRange;
  tier: FollowerTier;
  tierLabel: string;
  tierRates: TierRateInfo[];
}

// ─── Data Tables ──────────────────────────────────────────────────────────────

const BASE_RATES: Record<Platform, { low: number; mid: number; high: number }> = {
  instagram: { low: 10, mid: 17.5, high: 25 },
  tiktok: { low: 5, mid: 10, high: 15 },
  facebook: { low: 5, mid: 10, high: 15 },
  twitter: { low: 8, mid: 14, high: 20 },
};

const IG_CONTENT_TYPE_MULTIPLIERS: Record<InstagramContentType, number> = {
  feedPost: 1.0,
  reel: 1.5,
  story: 0.3,
  carousel: 1.2,
};

const TIKTOK_CONTENT_TYPE_MULTIPLIERS: Record<TikTokContentType, number> = {
  video: 1.0,
  story: 0.25,
  live: 0.8,
};

const DEAL_TYPE_MULTIPLIERS: Record<DealType, number> = {
  mention: 1.0,
  dedicated: 2.5,
  review: 3.5,
  series: 2.0,
};

export const IG_CONTENT_TYPES: { value: InstagramContentType; label: string }[] = [
  { value: 'feedPost', label: 'Feed Post' },
  { value: 'reel', label: 'Reel' },
  { value: 'story', label: 'Story' },
  { value: 'carousel', label: 'Carousel' },
];

export const TIKTOK_CONTENT_TYPES: { value: TikTokContentType; label: string }[] = [
  { value: 'video', label: 'Video' },
  { value: 'story', label: 'Story' },
  { value: 'live', label: 'Live' },
];

export const DEAL_TYPES: { value: DealType; label: string; description: string }[] = [
  { value: 'mention', label: 'Mention', description: 'Brief brand mention in content' },
  { value: 'dedicated', label: 'Dedicated', description: 'Entire post focused on brand' },
  { value: 'review', label: 'Review', description: 'In-depth product review' },
  { value: 'series', label: 'Series', description: 'Multi-post campaign (per-post rate)' },
];

// ─── Tier data for context display ────────────────────────────────────────────

interface TierDef {
  tier: FollowerTier;
  label: string;
  min: number;
  max: number;
}

const IG_TIER_DEFS: TierDef[] = [
  { tier: 'nano', label: 'Nano', min: 1_000, max: 9_999 },
  { tier: 'micro', label: 'Micro', min: 10_000, max: 49_999 },
  { tier: 'mid', label: 'Mid-Tier', min: 50_000, max: 499_999 },
  { tier: 'macro', label: 'Macro', min: 500_000, max: 999_999 },
  { tier: 'mega', label: 'Mega', min: 1_000_000, max: Infinity },
];

const TIKTOK_TIER_DEFS: TierDef[] = [
  { tier: 'nano', label: 'Nano', min: 1_000, max: 9_999 },
  { tier: 'micro', label: 'Micro', min: 10_000, max: 99_999 },
  { tier: 'mid', label: 'Mid-Tier', min: 100_000, max: 499_999 },
  { tier: 'macro', label: 'Macro', min: 500_000, max: 999_999 },
  { tier: 'mega', label: 'Mega', min: 1_000_000, max: Infinity },
];

// ─── Core Functions ───────────────────────────────────────────────────────────

function getContentTypeMultiplier(platform: Platform, contentType: SponsorshipContentType): number {
  if (platform === 'instagram') {
    return IG_CONTENT_TYPE_MULTIPLIERS[contentType as InstagramContentType] ?? 1.0;
  }
  return TIKTOK_CONTENT_TYPE_MULTIPLIERS[contentType as TikTokContentType] ?? 1.0;
}

function getDealTypeMultiplier(dealType: DealType): number {
  return DEAL_TYPE_MULTIPLIERS[dealType];
}

export function calculateRate(
  platform: Platform,
  followers: number,
  engagementRate: number,
  contentType: SponsorshipContentType,
  dealType: DealType,
  industryId: IndustryId
): RateRange {
  const base = BASE_RATES[platform];
  const followerK = followers / 1000;
  const engMul = getEngagementMultiplier(engagementRate);
  const nicheMul = getNicheMultiplier(industryId);
  const contentMul = getContentTypeMultiplier(platform, contentType);
  const dealMul = getDealTypeMultiplier(dealType);

  return {
    low: Math.round(followerK * base.low * engMul * nicheMul * contentMul * dealMul),
    mid: Math.round(followerK * base.mid * engMul * nicheMul * contentMul * dealMul),
    high: Math.round(followerK * base.high * engMul * nicheMul * contentMul * dealMul),
  };
}

export function buildRateCard(
  platform: Platform,
  followers: number,
  engagementRate: number,
  dealType: DealType,
  industryId: IndustryId
): RateCardEntry[] {
  const contentTypes =
    platform === 'instagram'
      ? IG_CONTENT_TYPES.map((ct) => ({
          value: ct.value as SponsorshipContentType,
          label: ct.label,
        }))
      : TIKTOK_CONTENT_TYPES.map((ct) => ({
          value: ct.value as SponsorshipContentType,
          label: ct.label,
        }));

  return contentTypes.map((ct) => ({
    contentType: ct.value,
    label: ct.label,
    rate: calculateRate(platform, followers, engagementRate, ct.value, dealType, industryId),
  }));
}

export function getTierRates(
  platform: Platform,
  engagementRate: number,
  contentType: SponsorshipContentType,
  dealType: DealType,
  industryId: IndustryId
): TierRateInfo[] {
  const defs = platform === 'instagram' ? IG_TIER_DEFS : TIKTOK_TIER_DEFS;

  return defs.map((def) => {
    const representativeFollowers = def.max === Infinity ? def.min * 2 : (def.min + def.max) / 2;
    const rate = calculateRate(
      platform,
      representativeFollowers,
      engagementRate,
      contentType,
      dealType,
      industryId
    );
    const followerRange =
      def.max === Infinity
        ? `${formatFollowerCount(def.min)}+`
        : `${formatFollowerCount(def.min)}–${formatFollowerCount(def.max)}`;

    return {
      tier: def.tier,
      label: def.label,
      followerRange,
      typicalRate: rate,
    };
  });
}

export function computeSponsorship(input: SponsorshipInput): SponsorshipResult {
  const { platform, followers, engagementRate, contentType, dealType, industryId, dealsPerMonth } =
    input;

  const rate = calculateRate(
    platform,
    followers,
    engagementRate,
    contentType,
    dealType,
    industryId
  );
  const rateCard = buildRateCard(platform, followers, engagementRate, dealType, industryId);
  const tier = getFollowerTier(platform, followers);
  const tierLabel = getTierLabel(platform, followers);
  const tierRates = getTierRates(platform, engagementRate, contentType, dealType, industryId);
  const monthlyEarnings: RateRange = {
    low: rate.low * dealsPerMonth,
    mid: rate.mid * dealsPerMonth,
    high: rate.high * dealsPerMonth,
  };

  return {
    rate,
    rateCard,
    monthlyEarnings,
    tier,
    tierLabel,
    tierRates,
  };
}

// ─── Negotiation Tips ─────────────────────────────────────────────────────────

export interface NegotiationTip {
  id: string;
  text: string;
  detail: string;
}

export function getNegotiationTips(
  tier: FollowerTier,
  engagementRate: number,
  platform: Platform
): NegotiationTip[] {
  const tips: NegotiationTip[] = [];

  if (engagementRate >= 5) {
    tips.push({
      id: 'high-engagement-leverage',
      text: 'Leverage your high engagement rate',
      detail: `Your ${engagementRate.toFixed(1)}% engagement rate is well above average. Lead negotiations with this metric — brands pay a premium for engaged audiences because they convert better. Ask for 50–100% above standard rates.`,
    });
  }

  if (tier === 'nano' || tier === 'micro') {
    tips.push({
      id: 'small-account-value',
      text: 'Emphasize your niche audience value',
      detail:
        'Smaller creators often have more engaged, niche audiences. Brands are increasingly shifting budgets to micro-influencers for better ROI. Highlight your audience demographics and conversion rates when negotiating.',
    });
  }

  if (tier === 'macro' || tier === 'mega') {
    tips.push({
      id: 'scale-pricing',
      text: 'Price for scale and exclusivity',
      detail:
        'With your audience size, you can command premium rates. Charge extra for exclusivity clauses (no competing brands for 30–90 days), usage rights, and whitelisting permissions. These add 20–100% to your base rate.',
    });
  }

  tips.push({
    id: 'usage-rights',
    text: 'Charge separately for usage rights',
    detail:
      'If a brand wants to use your content in their own ads (paid media), charge 50–500% on top of your base rate. Organic posting and paid usage are two different licenses. Always clarify usage terms upfront.',
  });

  tips.push({
    id: 'bundle-discount',
    text: 'Offer multi-post packages',
    detail:
      'Brands love predictability. Offer a 10–15% discount for 3+ post packages. You earn more total revenue while the brand gets a better per-post rate. This also builds longer-term relationships.',
  });

  if (platform === 'instagram') {
    tips.push({
      id: 'ig-cross-post',
      text: 'Charge extra for cross-posting',
      detail:
        'If a brand wants you to post on Stories, Reels, AND Feed, each format should be priced separately. A Reel typically commands 1.5x a feed post rate, while each Story frame is worth about 30% of a feed post.',
    });
  } else {
    tips.push({
      id: 'tt-viral-potential',
      text: 'Highlight TikTok viral potential',
      detail:
        "TikTok's algorithm can push sponsored content far beyond your follower count. If your average views exceed your followers, use this as leverage — brands are paying for potential reach, not just your follower count.",
    });
  }

  return tips.slice(0, 5);
}

// ─── Formatting helpers ───────────────────────────────────────────────────────

export function formatRateRange(range: RateRange): string {
  return `${formatUSD(range.low)} – ${formatUSD(range.high)}`;
}

export function getDealTypeLabel(dealType: DealType): string {
  return DEAL_TYPES.find((d) => d.value === dealType)?.label ?? dealType;
}

export function getContentTypeLabel(
  platform: Platform,
  contentType: SponsorshipContentType
): string {
  if (platform === 'instagram') {
    return IG_CONTENT_TYPES.find((c) => c.value === contentType)?.label ?? contentType;
  }
  return TIKTOK_CONTENT_TYPES.find((c) => c.value === contentType)?.label ?? contentType;
}
