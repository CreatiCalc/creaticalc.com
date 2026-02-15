import dynamic from 'next/dynamic';
import ChartSkeleton from '@/features/calculators/shared/ChartSkeleton';
import SectionSkeleton from '@/features/calculators/shared/SectionSkeleton';

export const GrowthChart = dynamic(() => import('./GrowthChart'), {
  ssr: false,
  loading: ChartSkeleton,
});
export const GrowthMilestoneTimeline = dynamic(() => import('./GrowthMilestoneTimeline'), {
  ssr: false,
  loading: SectionSkeleton,
});
export const GrowthRecommendations = dynamic(() => import('./GrowthRecommendations'), {
  ssr: false,
  loading: SectionSkeleton,
});
