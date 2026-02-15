'use client';

import SponsorshipCalculator from '@/features/calculators/sponsorship-shared/SponsorshipCalculator';
import { INSTAGRAM_SPONSORSHIP_CONFIG } from '@/features/calculators/sponsorship-shared/sponsorshipConfigs';

export default function InstagramSponsorshipCalculator() {
  return <SponsorshipCalculator config={INSTAGRAM_SPONSORSHIP_CONFIG} />;
}
