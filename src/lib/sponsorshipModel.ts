import type { IndustryId, FollowerTier } from './engagementBenchmarks';
import {
  findTier,
  formatUSD,
  formatFollowerCount,
  getEngagementMultiplier,
  getNicheMultiplier,
} from './engagementBenchmarks';
import type { PlatformSlug } from '@/lib/platforms';

// ─── Types ────────────────────────────────────────────────────────────────────

/** All platforms supported by the sponsorship model — derived from the central PlatformSlug. */
export type SponsorshipPlatform = PlatformSlug;

export type InstagramContentType = 'feedPost' | 'reel' | 'story' | 'carousel';
export type TikTokContentType = 'video' | 'story' | 'live';
export type YouTubeContentType = 'integration' | 'dedicated' | 'short' | 'preRoll';
export type FacebookContentType = 'feedPost' | 'reel' | 'story' | 'live';
export type TwitterContentType = 'tweet' | 'thread' | 'space';
export type SponsorshipContentType =
  | InstagramContentType
  | TikTokContentType
  | YouTubeContentType
  | FacebookContentType
  | TwitterContentType;

export type DealType = 'mention' | 'dedicated' | 'review' | 'series';

export interface SponsorshipInput {
  platform: SponsorshipPlatform;
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

export interface ContentTypeOption {
  value: SponsorshipContentType;
  label: string;
}

export interface NegotiationTip {
  id: string;
  text: string;
  detail: string;
}

// ─── Per-Platform Data ───────────────────────────────────────────────────────

interface TierDef {
  tier: FollowerTier;
  label: string;
  min: number;
  max: number;
}

interface PlatformSponsorshipData {
  baseRate: { low: number; mid: number; high: number };
  contentTypes: ContentTypeOption[];
  contentTypeMultipliers: Partial<Record<SponsorshipContentType, number>>;
  tierDefs: TierDef[];
  platformTip: NegotiationTip;
}

const STANDARD_TIER_DEFS: TierDef[] = [
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

const PLATFORM_DATA: Record<SponsorshipPlatform, PlatformSponsorshipData> = {
  instagram: {
    baseRate: { low: 10, mid: 17.5, high: 25 },
    contentTypes: [
      { value: 'feedPost', label: 'Feed Post' },
      { value: 'reel', label: 'Reel' },
      { value: 'story', label: 'Story' },
      { value: 'carousel', label: 'Carousel' },
    ],
    contentTypeMultipliers: { feedPost: 1.0, reel: 1.5, story: 0.3, carousel: 1.2 },
    tierDefs: STANDARD_TIER_DEFS,
    platformTip: {
      id: 'ig-cross-post',
      text: 'Charge extra for cross-posting',
      detail:
        'If a brand wants you to post on Stories, Reels, AND Feed, each format should be priced separately. A Reel typically commands 1.5x a feed post rate, while each Story frame is worth about 30% of a feed post.',
    },
  },
  tiktok: {
    baseRate: { low: 5, mid: 10, high: 15 },
    contentTypes: [
      { value: 'video', label: 'Video' },
      { value: 'story', label: 'Story' },
      { value: 'live', label: 'Live' },
    ],
    contentTypeMultipliers: { video: 1.0, story: 0.25, live: 0.8 },
    tierDefs: TIKTOK_TIER_DEFS,
    platformTip: {
      id: 'tt-viral-potential',
      text: 'Highlight TikTok viral potential',
      detail:
        "TikTok's algorithm can push sponsored content far beyond your follower count. If your average views exceed your followers, use this as leverage — brands are paying for potential reach, not just your follower count.",
    },
  },
  youtube: {
    baseRate: { low: 20, mid: 35, high: 50 },
    contentTypes: [
      { value: 'integration', label: 'Integration' },
      { value: 'dedicated', label: 'Dedicated Video' },
      { value: 'short', label: 'Short' },
      { value: 'preRoll', label: 'Pre-Roll' },
    ],
    contentTypeMultipliers: { integration: 1.0, dedicated: 2.0, short: 0.4, preRoll: 0.6 },
    tierDefs: STANDARD_TIER_DEFS,
    platformTip: {
      id: 'yt-long-tail',
      text: 'Leverage YouTube long-tail value',
      detail:
        'Unlike social media posts, YouTube videos generate views for months or years. When negotiating, highlight this evergreen reach — a sponsored integration keeps driving brand awareness long after the upload date. Charge a premium for this lasting exposure.',
    },
  },
  facebook: {
    baseRate: { low: 5, mid: 10, high: 15 },
    contentTypes: [
      { value: 'feedPost', label: 'Feed Post' },
      { value: 'reel', label: 'Reel' },
      { value: 'story', label: 'Story' },
      { value: 'live', label: 'Live' },
    ],
    contentTypeMultipliers: { feedPost: 1.0, reel: 1.4, story: 0.3, live: 0.7 },
    tierDefs: STANDARD_TIER_DEFS,
    platformTip: {
      id: 'fb-audience-targeting',
      text: 'Emphasize Facebook audience demographics',
      detail:
        'Facebook skews older and more affluent than TikTok or Instagram. Brands targeting 25–55 year-olds value Facebook placements highly. Share your page insights showing audience age, income level, and location data to justify premium rates.',
    },
  },
  twitter: {
    baseRate: { low: 8, mid: 14, high: 20 },
    contentTypes: [
      { value: 'tweet', label: 'Tweet' },
      { value: 'thread', label: 'Thread' },
      { value: 'space', label: 'Space' },
    ],
    contentTypeMultipliers: { tweet: 1.0, thread: 1.8, space: 0.7 },
    tierDefs: STANDARD_TIER_DEFS,
    platformTip: {
      id: 'x-thought-leadership',
      text: 'Position sponsored content as thought leadership',
      detail:
        'X is where industry conversations happen. Brands pay a premium for creators who can weave product mentions into insightful commentary. A well-crafted thread that educates while promoting feels authentic and drives higher engagement than obvious ads.',
    },
  },
};

// ─── Deal Types ──────────────────────────────────────────────────────────────

const DEAL_TYPE_MULTIPLIERS: Record<DealType, number> = {
  mention: 1.0,
  dedicated: 2.5,
  review: 3.5,
  series: 2.0,
};

export const DEAL_TYPES: { value: DealType; label: string; description: string }[] = [
  { value: 'mention', label: 'Mention', description: 'Brief brand mention in content' },
  { value: 'dedicated', label: 'Dedicated', description: 'Entire post focused on brand' },
  { value: 'review', label: 'Review', description: 'In-depth product review' },
  { value: 'series', label: 'Series', description: 'Multi-post campaign (per-post rate)' },
];

// ─── Public Data Accessors ───────────────────────────────────────────────────

/** Returns the content type options for a given platform (used by the shared UI). */
export function getContentTypesForPlatform(platform: SponsorshipPlatform): ContentTypeOption[] {
  return PLATFORM_DATA[platform].contentTypes;
}

// ─── Core Functions ───────────────────────────────────────────────────────────

function getContentTypeMultiplier(
  platform: SponsorshipPlatform,
  contentType: SponsorshipContentType
): number {
  return PLATFORM_DATA[platform].contentTypeMultipliers[contentType] ?? 1.0;
}

function getDealTypeMultiplier(dealType: DealType): number {
  return DEAL_TYPE_MULTIPLIERS[dealType];
}

export function calculateRate(
  platform: SponsorshipPlatform,
  followers: number,
  engagementRate: number,
  contentType: SponsorshipContentType,
  dealType: DealType,
  industryId: IndustryId
): RateRange {
  const base = PLATFORM_DATA[platform].baseRate;
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
  platform: SponsorshipPlatform,
  followers: number,
  engagementRate: number,
  dealType: DealType,
  industryId: IndustryId
): RateCardEntry[] {
  return PLATFORM_DATA[platform].contentTypes.map((ct) => ({
    contentType: ct.value,
    label: ct.label,
    rate: calculateRate(platform, followers, engagementRate, ct.value, dealType, industryId),
  }));
}

function findSponsorshipTier(
  platform: SponsorshipPlatform,
  followers: number
): { tier: FollowerTier; label: string } {
  // For engagement platforms, delegate to the canonical engagement tier lookup
  if (platform !== 'youtube') {
    const tierData = findTier(platform, followers);
    return { tier: tierData.tier, label: tierData.label };
  }
  // YouTube uses sponsorship-specific tier defs
  const defs = PLATFORM_DATA.youtube.tierDefs;
  const match = defs.find((d) => followers >= d.min && followers <= d.max) ?? defs[defs.length - 1];
  return { tier: match.tier, label: match.label };
}

export function getTierRates(
  platform: SponsorshipPlatform,
  engagementRate: number,
  contentType: SponsorshipContentType,
  dealType: DealType,
  industryId: IndustryId
): TierRateInfo[] {
  return PLATFORM_DATA[platform].tierDefs.map((def) => {
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
  const tierData = findSponsorshipTier(platform, followers);
  const tier = tierData.tier;
  const tierLabel = tierData.label;
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

export function getNegotiationTips(
  tier: FollowerTier,
  engagementRate: number,
  platform: SponsorshipPlatform
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

  tips.push(PLATFORM_DATA[platform].platformTip);

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
  platform: SponsorshipPlatform,
  contentType: SponsorshipContentType
): string {
  return (
    PLATFORM_DATA[platform].contentTypes.find((c) => c.value === contentType)?.label ?? contentType
  );
}

/** Base sponsorship rate range (per 1K followers) for a platform. */
export function getSponsorshipBaseRate(platform: SponsorshipPlatform): {
  low: number;
  mid: number;
  high: number;
} {
  return PLATFORM_DATA[platform].baseRate;
}
