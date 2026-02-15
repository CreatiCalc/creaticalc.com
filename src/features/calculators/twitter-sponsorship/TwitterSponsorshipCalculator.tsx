'use client';

import SponsorshipCalculator from '@/features/calculators/sponsorship-shared/SponsorshipCalculator';
import { TWITTER_SPONSORSHIP_CONFIG } from '@/features/calculators/sponsorship-shared/sponsorshipConfigs';

export default function TwitterSponsorshipCalculator() {
  return <SponsorshipCalculator config={TWITTER_SPONSORSHIP_CONFIG} />;
}
