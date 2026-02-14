'use client';

import EngagementCalculator from '@/features/calculators/engagement-shared/EngagementCalculator';
import { TWITTER_CONFIG } from '@/features/calculators/engagement-shared/platformConfigs';

export default function TwitterEngagementCalculator() {
  return <EngagementCalculator config={TWITTER_CONFIG} />;
}
