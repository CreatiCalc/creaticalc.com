'use client';

import SponsorshipCalculator from '@/features/calculators/sponsorship-shared/SponsorshipCalculator';
import { TIKTOK_SPONSORSHIP_CONFIG } from '@/features/calculators/sponsorship-shared/sponsorshipConfigs';

export default function TikTokSponsorshipCalculator() {
  return <SponsorshipCalculator config={TIKTOK_SPONSORSHIP_CONFIG} />;
}
