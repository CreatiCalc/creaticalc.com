import type { IndustryId } from '@/lib/engagementBenchmarks';
import type { SponsorshipPlatform, SponsorshipContentType, DealType } from '@/lib/sponsorshipModel';

export interface SponsorshipPlatformConfig {
  platform: SponsorshipPlatform;
  basePath: string;
  platformLabel: string;
  defaultFollowers: number;
  defaultEngagementRate: number;
  defaultContentType: SponsorshipContentType;
  defaultDealType: DealType;
  defaultIndustryId: IndustryId;
  defaultDealsPerMonth: number;
}

export const INSTAGRAM_SPONSORSHIP_CONFIG: SponsorshipPlatformConfig = {
  platform: 'instagram',
  basePath: '/instagram-sponsorship-rate-calculator',
  platformLabel: 'Instagram',
  defaultFollowers: 10_000,
  defaultEngagementRate: 3.0,
  defaultContentType: 'feedPost',
  defaultDealType: 'mention',
  defaultIndustryId: 'general',
  defaultDealsPerMonth: 2,
};

export const TIKTOK_SPONSORSHIP_CONFIG: SponsorshipPlatformConfig = {
  platform: 'tiktok',
  basePath: '/tiktok-sponsorship-rate-calculator',
  platformLabel: 'TikTok',
  defaultFollowers: 10_000,
  defaultEngagementRate: 5.0,
  defaultContentType: 'video',
  defaultDealType: 'mention',
  defaultIndustryId: 'general',
  defaultDealsPerMonth: 2,
};

export const YOUTUBE_SPONSORSHIP_CONFIG: SponsorshipPlatformConfig = {
  platform: 'youtube',
  basePath: '/youtube-sponsorship-rate-calculator',
  platformLabel: 'YouTube',
  defaultFollowers: 10_000,
  defaultEngagementRate: 3.5,
  defaultContentType: 'integration',
  defaultDealType: 'mention',
  defaultIndustryId: 'general',
  defaultDealsPerMonth: 2,
};

export const FACEBOOK_SPONSORSHIP_CONFIG: SponsorshipPlatformConfig = {
  platform: 'facebook',
  basePath: '/facebook-sponsorship-rate-calculator',
  platformLabel: 'Facebook',
  defaultFollowers: 10_000,
  defaultEngagementRate: 1.0,
  defaultContentType: 'feedPost',
  defaultDealType: 'mention',
  defaultIndustryId: 'general',
  defaultDealsPerMonth: 2,
};

export const TWITTER_SPONSORSHIP_CONFIG: SponsorshipPlatformConfig = {
  platform: 'twitter',
  basePath: '/twitter-sponsorship-rate-calculator',
  platformLabel: 'X (Twitter)',
  defaultFollowers: 10_000,
  defaultEngagementRate: 1.5,
  defaultContentType: 'tweet',
  defaultDealType: 'mention',
  defaultIndustryId: 'general',
  defaultDealsPerMonth: 2,
};
