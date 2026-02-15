'use client';

import AnimatedNumber from '@/components/ui/AnimatedNumber';
import { formatUSD } from '@/lib/engagementBenchmarks';
import type { RateRange } from '@/lib/sponsorshipModel';
import { getContentTypeLabel, getDealTypeLabel } from '@/lib/sponsorshipModel';
import type { SponsorshipPlatform, SponsorshipContentType, DealType } from '@/lib/sponsorshipModel';

interface SponsorshipRateDisplayProps {
  rate: RateRange;
  platform: SponsorshipPlatform;
  contentType: SponsorshipContentType;
  dealType: DealType;
  tierLabel: string;
  followers: number;
  engagementRate: number;
}

export default function SponsorshipRateDisplay({
  rate,
  platform,
  contentType,
  dealType,
  tierLabel,
  followers,
  engagementRate,
}: SponsorshipRateDisplayProps) {
  const contentLabel = getContentTypeLabel(platform, contentType);
  const dealLabel = getDealTypeLabel(dealType);

  return (
    <div className="relative overflow-hidden rounded-xl border border-primary/30 bg-primary/5 p-6">
      <div
        className="absolute inset-x-0 top-0 h-1"
        style={{ background: 'var(--gradient-brand)' }}
      />
      <p className="text-sm font-medium text-muted">Estimated Per-Post Sponsorship Rate</p>
      <div className="mt-2 flex items-baseline gap-1">
        <span className="text-4xl font-bold text-primary">
          <AnimatedNumber value={rate.low} format={formatUSD} />
        </span>
        <span className="text-2xl text-muted">&ndash;</span>
        <span className="text-4xl font-bold text-primary">
          <AnimatedNumber value={rate.high} format={formatUSD} />
        </span>
      </div>
      <p className="mt-1 text-sm text-muted">
        Mid estimate:{' '}
        <strong className="text-foreground">
          <AnimatedNumber value={rate.mid} format={formatUSD} />
        </strong>
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
          {tierLabel}
        </span>
        <span className="rounded-full bg-surface px-2.5 py-0.5 text-xs text-muted">
          {followers.toLocaleString()} followers
        </span>
        <span className="rounded-full bg-surface px-2.5 py-0.5 text-xs text-muted">
          {engagementRate.toFixed(1)}% engagement
        </span>
        <span className="rounded-full bg-surface px-2.5 py-0.5 text-xs text-muted">
          {contentLabel}
        </span>
        <span className="rounded-full bg-surface px-2.5 py-0.5 text-xs text-muted">
          {dealLabel}
        </span>
      </div>
    </div>
  );
}
