import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page Not Found',
  robots: { index: false },
};

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <p className="text-gradient-brand text-6xl font-bold">404</p>
      <h1 className="mt-4 text-2xl font-bold">Page Not Found</h1>
      <p className="mt-3 text-muted">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>

      <div className="mt-10">
        <h2 className="mb-4 text-lg font-semibold">Try one of our free calculators</h2>
        <div className="grid gap-3 text-left sm:grid-cols-2">
          <Link
            href="/youtube-money-calculator"
            className="rounded-lg border border-border bg-white px-4 py-3 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
          >
            YouTube Money Calculator
          </Link>
          <Link
            href="/instagram-engagement-rate-calculator"
            className="rounded-lg border border-border bg-white px-4 py-3 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
          >
            Instagram Engagement Rate
          </Link>
          <Link
            href="/tiktok-engagement-rate-calculator"
            className="rounded-lg border border-border bg-white px-4 py-3 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
          >
            TikTok Engagement Rate
          </Link>
          <Link
            href="/instagram-sponsorship-rate-calculator"
            className="rounded-lg border border-border bg-white px-4 py-3 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
          >
            Instagram Sponsorship Rate
          </Link>
          <Link
            href="/engagement-rate-benchmarks"
            className="rounded-lg border border-border bg-white px-4 py-3 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
          >
            Engagement Rate Benchmarks
          </Link>
          <Link
            href="/youtube-subscriber-projector"
            className="rounded-lg border border-border bg-white px-4 py-3 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
          >
            YouTube Subscriber Projector
          </Link>
        </div>
      </div>

      <Link
        href="/"
        className="mt-10 inline-block rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary/90"
      >
        Back to Home
      </Link>
    </div>
  );
}
