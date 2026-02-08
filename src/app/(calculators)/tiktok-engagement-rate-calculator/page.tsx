import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TikTok Engagement Rate Calculator',
  description:
    'Free TikTok engagement rate calculator. Measure your TikTok engagement rate using views, likes, comments, and shares with industry benchmarks.',
};

export default function TikTokEngagementPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 text-center">
      <h1 className="text-3xl font-bold">TikTok Engagement Rate Calculator</h1>
      <p className="mt-3 text-muted">Coming soon</p>
    </div>
  );
}
