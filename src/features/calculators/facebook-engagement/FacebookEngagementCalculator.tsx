'use client';

import EngagementCalculator from '@/features/calculators/engagement-shared/EngagementCalculator';
import { FACEBOOK_CONFIG } from '@/features/calculators/engagement-shared/platformConfigs';

export default function FacebookEngagementCalculator() {
  return <EngagementCalculator config={FACEBOOK_CONFIG} />;
}
