'use client';

import {
  type Platform,
  type IndustryId,
  formatUSD,
  formatPercent,
  INDUSTRY_BENCHMARKS,
} from '@/lib/engagementBenchmarks';

interface BrandDealEstimateProps {
  platform: Platform;
  followers: number;
  engagementRate: number;
  industryId: IndustryId;
  estimate: { low: number; high: number };
}

export default function BrandDealEstimate({
  platform,
  followers,
  engagementRate,
  industryId,
  estimate,
}: BrandDealEstimateProps) {
  const industryName = INDUSTRY_BENCHMARKS.find((b) => b.id === industryId)?.name ?? 'your niche';

  // Determine engagement tier label
  let engTier: string;
  if (engagementRate >= 5) engTier = 'High (2.0x premium)';
  else if (engagementRate >= 3) engTier = 'Above average (1.5x premium)';
  else if (engagementRate >= 1) engTier = 'Standard (1.0x)';
  else engTier = 'Low (0.5x discount)';

  const platformNotes: Record<Platform, string> = {
    instagram:
      'Instagram commands the highest per-post rates among social platforms due to mature brand deal infrastructure.',
    tiktok: 'TikTok rates are typically 50–70% of Instagram rates for comparable audience sizes.',
    facebook:
      'Facebook brand deal rates are lower than Instagram but benefit from precise audience targeting and longer content lifespan.',
    twitter:
      'X (Twitter) sponsorship rates vary widely — accounts with high-value niches (finance, tech) can command premium rates despite lower overall engagement.',
  };
  const platformNote = platformNotes[platform];

  return (
    <div className="space-y-4">
      {/* Main estimate */}
      <div className="rounded-lg border border-border bg-surface p-4 text-center">
        <p className="text-sm text-muted">Estimated Per-Post Sponsorship Rate</p>
        <p className="mt-1 text-3xl font-bold text-foreground">
          {formatUSD(estimate.low)} &ndash; {formatUSD(estimate.high)}
        </p>
        <p className="mt-1 text-xs text-muted">
          Based on {followers.toLocaleString()} followers at {formatPercent(engagementRate)}{' '}
          engagement
        </p>
      </div>

      {/* Multiplier breakdown */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-foreground">How this is calculated</p>
        <div className="grid gap-2 sm:grid-cols-2">
          <div className="rounded-lg border border-border bg-white p-3">
            <p className="text-xs text-muted">Engagement Level</p>
            <p className="text-sm font-semibold">{engTier}</p>
          </div>
          <div className="rounded-lg border border-border bg-white p-3">
            <p className="text-xs text-muted">Niche</p>
            <p className="text-sm font-semibold">{industryName}</p>
          </div>
        </div>
        <p className="text-xs text-muted">{platformNote}</p>
      </div>

      {/* Pricing tips */}
      <div className="rounded-lg border border-border bg-white p-4">
        <p className="text-sm font-medium text-foreground">Pricing Tips</p>
        <ul className="mt-2 space-y-1.5 text-sm text-muted">
          <li>
            &bull; Charge <strong>3&ndash;5x more</strong> for dedicated review/tutorial videos vs.
            brief mentions
          </li>
          <li>
            &bull; Add <strong>50&ndash;500%</strong> if the brand wants usage rights for paid ads
          </li>
          <li>
            &bull; <strong>Exclusivity clauses</strong> (no competing brands for 30–90 days) warrant
            a 20–50% premium
          </li>
          <li>
            &bull; Always negotiate based on{' '}
            <strong>engagement rate, not just follower count</strong> — brands pay more for engaged
            audiences
          </li>
        </ul>
      </div>
    </div>
  );
}
