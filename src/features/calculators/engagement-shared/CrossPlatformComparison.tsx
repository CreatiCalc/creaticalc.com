'use client';

import Link from 'next/link';
import {
  type Platform,
  crossPlatformComparison,
  formatPercent,
  getRatingLabel,
  getRatingColor,
} from '@/lib/engagementModel';

interface CrossPlatformComparisonProps {
  platform: Platform;
  rate: number;
  followers: number;
}

const PLATFORM_LINKS: Record<Platform, { name: string; href: string }> = {
  instagram: {
    name: 'Instagram',
    href: '/instagram-engagement-rate-calculator',
  },
  tiktok: {
    name: 'TikTok',
    href: '/tiktok-engagement-rate-calculator',
  },
  facebook: {
    name: 'Facebook',
    href: '/facebook-engagement-rate-calculator',
  },
  twitter: {
    name: 'X (Twitter)',
    href: '/twitter-engagement-rate-calculator',
  },
};

// Default comparison target per platform
const DEFAULT_COMPARISON: Record<Platform, Platform> = {
  instagram: 'tiktok',
  tiktok: 'instagram',
  facebook: 'instagram',
  twitter: 'instagram',
};

export default function CrossPlatformComparison({
  platform,
  rate,
  followers,
}: CrossPlatformComparisonProps) {
  const otherPlatform = DEFAULT_COMPARISON[platform];
  const result = crossPlatformComparison(platform, rate, followers, otherPlatform);
  const currentInfo = PLATFORM_LINKS[platform];
  const otherInfo = PLATFORM_LINKS[result.otherPlatform];
  const otherRatingLabel = getRatingLabel(result.otherRating);
  const otherRatingColor = getRatingColor(result.otherRating);
  const currentRatingLabel = getRatingLabel(result.currentRating);
  const currentRatingColor = getRatingColor(result.currentRating);

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted">See how your engagement translates across platforms.</p>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-white p-4 text-center">
          <p className="text-xs font-medium text-muted">{currentInfo.name}</p>
          <p className="mt-1 text-2xl font-bold text-foreground">{formatPercent(rate)}</p>
          <span
            className={`mt-1 inline-block rounded-full border px-2 py-0.5 text-xs font-semibold ${currentRatingColor}`}
          >
            {currentRatingLabel}
          </span>
        </div>

        <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 text-center">
          <p className="text-xs font-medium text-muted">Equivalent on {otherInfo.name}</p>
          <p className="mt-1 text-2xl font-bold text-foreground">
            ~{formatPercent(result.equivalentRate)}
          </p>
          <span
            className={`mt-1 inline-block rounded-full border px-2 py-0.5 text-xs font-semibold ${otherRatingColor}`}
          >
            {otherRatingLabel}
          </span>
        </div>
      </div>

      <p className="text-center text-sm text-muted">
        Try the{' '}
        <Link href={otherInfo.href} className="font-medium text-primary hover:underline">
          {otherInfo.name} Engagement Calculator
        </Link>{' '}
        for a detailed analysis.
      </p>
    </div>
  );
}
