'use client';

import type { TikTokContentType } from '@/lib/sponsorshipModel';
import {
  createSponsorshipStateHook,
  type SponsorshipState,
} from '@/features/calculators/sponsorship-shared/useSponsorshipState';

export type TikTokSponsorshipState = SponsorshipState<TikTokContentType>;

export const useTikTokSponsorshipState = createSponsorshipStateHook<TikTokContentType>({
  platform: 'tiktok',
  defaults: {
    followers: 10_000,
    engagementRate: 5.0,
    contentType: 'video',
    dealType: 'mention',
    industryId: 'general',
    dealsPerMonth: 2,
  },
});
