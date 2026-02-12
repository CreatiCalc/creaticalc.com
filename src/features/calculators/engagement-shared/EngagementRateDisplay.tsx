'use client';

import AnimatedNumber from '@/components/ui/AnimatedNumber';
import {
  type Platform,
  type EngagementRating,
  getRatingColor,
  formatPercent,
} from '@/lib/engagementModel';

interface EngagementRateDisplayProps {
  rate: number;
  rating: EngagementRating;
  ratingLabel: string;
  tierLabel: string;
  tierRange: string;
  platform: Platform;
}

export default function EngagementRateDisplay({
  rate,
  rating,
  ratingLabel,
  tierLabel,
  tierRange,
  platform,
}: EngagementRateDisplayProps) {
  const colorClasses = getRatingColor(rating);
  const platformAccent =
    platform === 'instagram'
      ? 'from-pink-500 via-purple-500 to-orange-400'
      : 'from-cyan-400 via-pink-500 to-red-500';

  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-white p-6 text-center shadow-sm">
      <div
        className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${platformAccent}`}
        aria-hidden="true"
      />

      <p className="text-sm font-medium text-muted">Engagement Rate</p>
      <p className="mt-2 text-5xl font-bold text-foreground">
        <AnimatedNumber value={rate} format={(n) => formatPercent(n)} />
      </p>

      <div className="mt-3 flex items-center justify-center gap-2">
        <span className={`rounded-full border px-3 py-0.5 text-sm font-semibold ${colorClasses}`}>
          {ratingLabel}
        </span>
      </div>

      <p className="mt-3 text-sm text-muted">
        {tierLabel}{' '}
        {tierRange && <span className="text-xs text-muted/70">({tierRange} followers)</span>}
      </p>
    </div>
  );
}
