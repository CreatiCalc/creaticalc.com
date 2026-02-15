import dynamic from 'next/dynamic';

function ChartPlaceholder() {
  return (
    <div className="mt-6">
      <div className="mb-3 h-6 w-64 animate-pulse rounded bg-surface-alt" />
      <div className="h-[350px] animate-pulse rounded-lg bg-surface-alt" />
    </div>
  );
}

export const ProjectionChart = dynamic(() => import('./ProjectionChart'), {
  ssr: false,
  loading: ChartPlaceholder,
});
export const Recommendations = dynamic(() => import('./Recommendations'), { ssr: false });
export const DriversBreakdown = dynamic(() => import('./DriversBreakdown'), { ssr: false });
export const MilestoneTimeline = dynamic(() => import('./MilestoneTimeline'), { ssr: false });
export const SponsorshipEstimate = dynamic(() => import('./SponsorshipEstimate'), { ssr: false });
export const RpmTable = dynamic(() => import('./RpmTable'), { ssr: false });
