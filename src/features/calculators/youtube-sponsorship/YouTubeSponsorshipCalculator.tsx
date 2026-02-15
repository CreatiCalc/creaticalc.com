'use client';

import SponsorshipCalculator from '@/features/calculators/sponsorship-shared/SponsorshipCalculator';
import { YOUTUBE_SPONSORSHIP_CONFIG } from '@/features/calculators/sponsorship-shared/sponsorshipConfigs';

export default function YouTubeSponsorshipCalculator() {
  return <SponsorshipCalculator config={YOUTUBE_SPONSORSHIP_CONFIG} />;
}
