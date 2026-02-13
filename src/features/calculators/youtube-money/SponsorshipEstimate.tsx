'use client';

import { useMemo } from 'react';
import type { NicheId, ContentFormat, RpmRange } from '@/lib/youtubeEarningsModel';
import { formatUSD, getNiche } from '@/lib/youtubeEarningsModel';

// Sponsorship CPM rates per 1K views for a standard 30-60s integrated mention.
// Based on 2025/2026 industry data from CreatorsJet, ADOPTER Media, InfluenceFlow,
// and SEOWebster. These represent mid-tier channel rates (15K-250K avg views/video).
const SPONSORSHIP_CPM: Record<NicheId, RpmRange> = {
  finance: { low: 35, mid: 50, high: 70 },
  tech: { low: 25, mid: 35, high: 50 },
  education: { low: 18, mid: 25, high: 35 },
  health: { low: 18, mid: 25, high: 35 },
  beauty: { low: 18, mid: 25, high: 35 },
  travel: { low: 15, mid: 22, high: 30 },
  food: { low: 15, mid: 22, high: 30 },
  lifestyle: { low: 12, mid: 18, high: 25 },
  entertainment: { low: 8, mid: 12, high: 18 },
  gaming: { low: 8, mid: 12, high: 18 },
};

// Shorts sponsorships pay ~30% of long-form rates (industry range: 25-40%)
const SHORTS_DISCOUNT = 0.3;

interface SponsorshipEstimateProps {
  dailyViews: number;
  nicheId: NicheId;
  contentFormat: ContentFormat;
  viewsPerVideo?: number;
}

export default function SponsorshipEstimate({
  dailyViews,
  nicheId,
  contentFormat,
  viewsPerVideo,
}: SponsorshipEstimateProps) {
  const estimates = useMemo(() => {
    // Estimate views per video: use explicit value if available,
    // otherwise approximate as ~7 days of daily views (a video's first-week traffic)
    const estViewsPerVideo = viewsPerVideo ?? dailyViews * 7;
    const cpm = SPONSORSHIP_CPM[nicheId];
    const isShorts = contentFormat === 'shorts';
    const discount = isShorts ? SHORTS_DISCOUNT : 1;

    return {
      viewsPerVideo: estViewsPerVideo,
      perVideo: {
        low: (estViewsPerVideo / 1000) * cpm.low * discount,
        mid: (estViewsPerVideo / 1000) * cpm.mid * discount,
        high: (estViewsPerVideo / 1000) * cpm.high * discount,
      },
      cpm: {
        low: cpm.low * discount,
        mid: cpm.mid * discount,
        high: cpm.high * discount,
      },
      isShorts,
    };
  }, [dailyViews, nicheId, contentFormat, viewsPerVideo]);

  const niche = getNiche(nicheId);

  return (
    <div className="mt-8">
      <h2 className="mb-3 text-lg font-semibold">What to Charge Sponsors</h2>
      <div className="rounded-xl border border-border bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm text-muted">
              Estimated rate per sponsored {estimates.isShorts ? 'Short' : 'video'}
            </p>
            <p className="mt-1 text-2xl font-bold text-foreground">
              {formatUSD(estimates.perVideo.low)} &mdash; {formatUSD(estimates.perVideo.high)}
            </p>
            <p className="mt-0.5 text-sm text-muted">
              Mid estimate: {formatUSD(estimates.perVideo.mid)} per{' '}
              {estimates.isShorts ? 'Short' : 'video'}
            </p>
          </div>
          <div className="text-sm sm:text-right">
            <p className="text-muted">Your sponsorship CPM</p>
            <p className="mt-1 font-semibold text-primary">
              ${estimates.cpm.low.toFixed(0)}&ndash;${estimates.cpm.high.toFixed(0)}
              <span className="font-normal text-muted"> per 1K views</span>
            </p>
            <p className="mt-0.5 text-xs text-muted">
              Based on {estimates.viewsPerVideo.toLocaleString()} views/
              {estimates.isShorts ? 'Short' : 'video'}
            </p>
          </div>
        </div>

        <div className="mt-4 border-t border-border pt-3">
          <p className="text-xs text-muted">
            Rates are for a standard 30&ndash;60 second integrated mention in {niche.name} content.
            {estimates.isShorts
              ? ' Shorts sponsorships typically pay 25–40% of long-form rates.'
              : ' Dedicated review videos typically command 3–5x these rates.'}{' '}
            Actual rates depend on engagement, audience demographics, and production quality.
          </p>
        </div>
      </div>
    </div>
  );
}
