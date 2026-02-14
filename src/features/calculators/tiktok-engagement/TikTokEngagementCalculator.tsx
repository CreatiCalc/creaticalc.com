'use client';

import EngagementCalculator from '@/features/calculators/engagement-shared/EngagementCalculator';
import { TIKTOK_CONFIG } from '@/features/calculators/engagement-shared/platformConfigs';

export default function TikTokEngagementCalculator() {
  return <EngagementCalculator config={TIKTOK_CONFIG} />;
}
