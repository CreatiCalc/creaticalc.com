'use client';

import type { InstagramContentType } from '@/lib/sponsorshipModel';
import {
  createSponsorshipStateHook,
  type SponsorshipState,
} from '@/features/calculators/sponsorship-shared/useSponsorshipState';

export type InstagramSponsorshipState = SponsorshipState<InstagramContentType>;

export const useInstagramSponsorshipState = createSponsorshipStateHook<InstagramContentType>({
  platform: 'instagram',
  defaults: {
    followers: 10_000,
    engagementRate: 3.0,
    contentType: 'feedPost',
    dealType: 'mention',
    industryId: 'general',
    dealsPerMonth: 2,
  },
});
