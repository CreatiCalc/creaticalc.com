import dynamic from 'next/dynamic';

export const IndustryBenchmarks = dynamic(
  () => import('@/features/calculators/engagement-shared/IndustryBenchmarks'),
  { ssr: false }
);
export const BrandDealEstimate = dynamic(
  () => import('@/features/calculators/engagement-shared/BrandDealEstimate'),
  { ssr: false }
);
export const GrowthRecommendations = dynamic(
  () => import('@/features/calculators/engagement-shared/GrowthRecommendations'),
  { ssr: false }
);
export const EngagementBreakdownChart = dynamic(
  () => import('@/features/calculators/engagement-shared/EngagementBreakdownChart'),
  { ssr: false }
);
export const MultiFormulaDisplay = dynamic(
  () => import('@/features/calculators/engagement-shared/MultiFormulaDisplay'),
  { ssr: false }
);
export const WhatIfScenarios = dynamic(
  () => import('@/features/calculators/engagement-shared/WhatIfScenarios'),
  { ssr: false }
);
export const EstimatedReachDisplay = dynamic(
  () => import('@/features/calculators/engagement-shared/EstimatedReachDisplay'),
  { ssr: false }
);
export const CrossPlatformComparison = dynamic(
  () => import('@/features/calculators/engagement-shared/CrossPlatformComparison'),
  { ssr: false }
);
export const YoYTrendContext = dynamic(
  () => import('@/features/calculators/engagement-shared/YoYTrendContext'),
  { ssr: false }
);
