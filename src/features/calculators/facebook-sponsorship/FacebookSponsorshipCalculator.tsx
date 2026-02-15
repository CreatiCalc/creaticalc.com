'use client';

import SponsorshipCalculator from '@/features/calculators/sponsorship-shared/SponsorshipCalculator';
import { FACEBOOK_SPONSORSHIP_CONFIG } from '@/features/calculators/sponsorship-shared/sponsorshipConfigs';

export default function FacebookSponsorshipCalculator() {
  return <SponsorshipCalculator config={FACEBOOK_SPONSORSHIP_CONFIG} />;
}
