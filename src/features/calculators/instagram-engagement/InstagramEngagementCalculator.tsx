'use client';

import EngagementCalculator from '@/features/calculators/engagement-shared/EngagementCalculator';
import { INSTAGRAM_CONFIG } from '@/features/calculators/engagement-shared/platformConfigs';

export default function InstagramEngagementCalculator() {
  return <EngagementCalculator config={INSTAGRAM_CONFIG} />;
}
