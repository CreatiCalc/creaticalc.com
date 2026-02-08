import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'YouTube Subscriber Growth Projector',
  description:
    "Free YouTube subscriber growth projector. See when you'll hit 1K, 10K, 100K, and 1M subscribers based on your current growth rate.",
};

export default function YouTubeGrowthPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 text-center">
      <h1 className="text-3xl font-bold">YouTube Subscriber Growth Projector</h1>
      <p className="mt-3 text-muted">Coming soon</p>
    </div>
  );
}
