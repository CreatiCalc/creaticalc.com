'use client';

import {
  type Platform,
  type IndustryId,
  getTopIndustries,
  getIndustryBenchmark,
  formatPercent,
  INDUSTRY_BENCHMARKS,
} from '@/lib/engagementModel';

interface IndustryBenchmarksProps {
  platform: Platform;
  currentIndustryId: IndustryId;
  currentRate: number;
}

export default function IndustryBenchmarks({
  platform,
  currentIndustryId,
  currentRate,
}: IndustryBenchmarksProps) {
  const industryAvg = getIndustryBenchmark(platform, currentIndustryId);
  const delta = currentRate - industryAvg;
  const topIndustries = getTopIndustries(platform, 5);
  const currentIndustry = INDUSTRY_BENCHMARKS.find((b) => b.id === currentIndustryId);
  const maxRate = Math.max(
    ...topIndustries.map((i) => (platform === 'instagram' ? i.instagram : i.tiktok))
  );

  return (
    <div className="space-y-6">
      {/* User vs industry comparison */}
      <div className="rounded-lg border border-border bg-surface p-4">
        <p className="text-sm font-medium text-foreground">
          Your Rate vs. {currentIndustry?.name ?? 'Industry'} Average
        </p>
        <div className="mt-2 flex items-baseline gap-3">
          <span className="text-2xl font-bold text-foreground">{formatPercent(currentRate)}</span>
          <span className="text-sm text-muted">vs</span>
          <span className="text-lg text-muted">{formatPercent(industryAvg)}</span>
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
              delta >= 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
            }`}
          >
            {delta >= 0 ? '+' : ''}
            {formatPercent(delta)}
          </span>
        </div>
      </div>

      {/* Top industries chart */}
      <div>
        <p className="mb-3 text-sm font-medium text-foreground">
          Top {platform === 'instagram' ? 'Instagram' : 'TikTok'} Industries by Engagement
        </p>
        <div className="space-y-2">
          {topIndustries.map((industry) => {
            const rate = platform === 'instagram' ? industry.instagram : industry.tiktok;
            const barWidth = maxRate > 0 ? (rate / maxRate) * 100 : 0;
            const isCurrent = industry.id === currentIndustryId;

            return (
              <div key={industry.id} className="flex items-center gap-3">
                <span
                  className={`w-36 shrink-0 text-sm ${isCurrent ? 'font-semibold text-primary' : 'text-muted'}`}
                >
                  {industry.name}
                </span>
                <div className="flex-1">
                  <div className="h-5 overflow-hidden rounded-full bg-gray-100">
                    <div
                      className={`h-full rounded-full transition-all ${
                        isCurrent ? 'bg-primary' : 'bg-primary/30'
                      }`}
                      style={{ width: `${barWidth}%` }}
                    />
                  </div>
                </div>
                <span
                  className={`w-14 text-right text-sm ${isCurrent ? 'font-semibold text-primary' : 'text-muted'}`}
                >
                  {formatPercent(rate)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
