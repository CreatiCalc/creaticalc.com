import dynamic from 'next/dynamic';

export const GrowthChart = dynamic(() => import('./GrowthChart'), { ssr: false });
export const GrowthMilestoneTimeline = dynamic(() => import('./GrowthMilestoneTimeline'), {
  ssr: false,
});
export const GrowthRecommendations = dynamic(() => import('./GrowthRecommendations'), {
  ssr: false,
});
