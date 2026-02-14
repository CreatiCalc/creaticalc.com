import type { Platform, IndustryId } from '@/lib/engagementModel';
import type { SponsorshipContentType, DealType } from '@/lib/sponsorshipModel';

export interface SponsorshipPlatformConfig {
  platform: Platform;
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
