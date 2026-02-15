import dynamic from 'next/dynamic';
import ChartSkeleton from '@/features/calculators/shared/ChartSkeleton';
import SectionSkeleton from '@/features/calculators/shared/SectionSkeleton';

export const ProjectionChart = dynamic(() => import('./ProjectionChart'), {
  ssr: false,
  loading: ChartSkeleton,
});
export const Recommendations = dynamic(() => import('./Recommendations'), {
  ssr: false,
  loading: SectionSkeleton,
});
export const DriversBreakdown = dynamic(() => import('./DriversBreakdown'), {
  ssr: false,
  loading: SectionSkeleton,
});
export const MilestoneTimeline = dynamic(() => import('./MilestoneTimeline'), {
  ssr: false,
  loading: SectionSkeleton,
});
export const SponsorshipEstimate = dynamic(() => import('./SponsorshipEstimate'), {
  ssr: false,
  loading: SectionSkeleton,
});
export const RpmTable = dynamic(() => import('./RpmTable'), {
  ssr: false,
  loading: SectionSkeleton,
});
