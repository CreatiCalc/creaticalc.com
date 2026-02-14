'use client';

import {
  type Platform,
  PLATFORM_NAMES,
  formatPercent,
  YOY_TRENDS,
} from '@/lib/engagementBenchmarks';
import { getYoYContext } from '@/lib/engagementModel';

interface YoYTrendContextProps {
  platform: Platform;
  rate: number;
}

export default function YoYTrendContext({ platform, rate }: YoYTrendContextProps) {
  const context = getYoYContext(platform, rate);

  const trendDirection = context.changePercent < 0 ? 'declined' : 'risen';
  const trendIcon = context.changePercent < 0 ? '\u2193' : '\u2191';

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3 rounded-lg border border-border bg-white p-4">
        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <span className="text-lg font-bold">{trendIcon}</span>
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">
            Platform average has {trendDirection} {Math.abs(context.changePercent).toFixed(1)}%
            year-over-year
          </p>
          <p className="mt-1 text-sm text-muted">
            The average {PLATFORM_NAMES[platform]} engagement rate moved from{' '}
            {formatPercent(context.prevYearAvg)} (2025) to {formatPercent(context.currentYearAvg)}{' '}
            (2026). Your rate of {formatPercent(rate)} is{' '}
            <span className="font-medium text-foreground">{context.ratingVsPrev}</span>.
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border text-xs text-muted">
              <th className="pb-2 pr-4 font-medium">Year</th>
              <th className="pb-2 pr-4 font-medium">Instagram</th>
              <th className="pb-2 pr-4 font-medium">TikTok</th>
              <th className="pb-2 pr-4 font-medium">Facebook</th>
              <th className="pb-2 font-medium">X (Twitter)</th>
            </tr>
          </thead>
          <tbody>
            {YOY_TRENDS.map((trend) => (
              <tr key={trend.year} className="border-b border-border/50 last:border-0">
                <td className="py-2 pr-4 font-medium text-foreground">{trend.year}</td>
                <td className="py-2 pr-4 text-muted">{formatPercent(trend.instagram)}</td>
                <td className="py-2 pr-4 text-muted">{formatPercent(trend.tiktok)}</td>
                <td className="py-2 pr-4 text-muted">{formatPercent(trend.facebook)}</td>
                <td className="py-2 text-muted">{formatPercent(trend.twitter)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
