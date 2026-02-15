import dynamic from 'next/dynamic';
import ChartSkeleton from '@/features/calculators/shared/ChartSkeleton';
import SectionSkeleton from '@/features/calculators/shared/SectionSkeleton';

export const IndustryBenchmarks = dynamic(
  () => import('@/features/calculators/engagement-shared/IndustryBenchmarks'),
  { ssr: false, loading: SectionSkeleton }
);
export const BrandDealEstimate = dynamic(
  () => import('@/features/calculators/engagement-shared/BrandDealEstimate'),
  { ssr: false, loading: SectionSkeleton }
);
export const GrowthRecommendations = dynamic(
  () => import('@/features/calculators/engagement-shared/GrowthRecommendations'),
  { ssr: false, loading: SectionSkeleton }
);
export const EngagementBreakdownChart = dynamic(
  () => import('@/features/calculators/engagement-shared/EngagementBreakdownChart'),
  { ssr: false, loading: ChartSkeleton }
);
export const MultiFormulaDisplay = dynamic(
  () => import('@/features/calculators/engagement-shared/MultiFormulaDisplay'),
  { ssr: false, loading: SectionSkeleton }
);
export const WhatIfScenarios = dynamic(
  () => import('@/features/calculators/engagement-shared/WhatIfScenarios'),
  { ssr: false, loading: SectionSkeleton }
);
export const EstimatedReachDisplay = dynamic(
  () => import('@/features/calculators/engagement-shared/EstimatedReachDisplay'),
  { ssr: false, loading: SectionSkeleton }
);
export const CrossPlatformComparison = dynamic(
  () => import('@/features/calculators/engagement-shared/CrossPlatformComparison'),
  { ssr: false, loading: SectionSkeleton }
);
export const YoYTrendContext = dynamic(
  () => import('@/features/calculators/engagement-shared/YoYTrendContext'),
  { ssr: false, loading: SectionSkeleton }
);
