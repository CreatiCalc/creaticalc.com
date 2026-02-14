import type { Platform } from '@/lib/engagementModel';
import {
  INDUSTRY_BENCHMARKS,
  PLATFORM_NAMES,
  formatPercent,
  YOY_TRENDS,
} from '@/lib/engagementModel';

interface BenchmarkTableProps {
  platform: Platform;
}

const TIER_BENCHMARKS: Record<Platform, { tier: string; low: number; high: number }[]> = {
  instagram: [
    { tier: 'Nano (1K–10K)', low: 4.0, high: 6.0 },
    { tier: 'Micro (10K–50K)', low: 2.0, high: 4.0 },
    { tier: 'Mid-Tier (50K–500K)', low: 1.5, high: 3.0 },
    { tier: 'Macro (500K–1M)', low: 1.0, high: 2.0 },
    { tier: 'Mega (1M+)', low: 0.5, high: 1.5 },
  ],
  tiktok: [
    { tier: 'Nano (0–1K)', low: 10.0, high: 18.0 },
    { tier: 'Micro (1K–10K)', low: 8.0, high: 12.0 },
    { tier: 'Mid-Tier (10K–100K)', low: 6.0, high: 8.0 },
    { tier: 'Macro (100K–1M)', low: 5.0, high: 7.0 },
    { tier: 'Mega (1M–10M)', low: 4.0, high: 6.0 },
    { tier: 'Super (10M+)', low: 2.0, high: 4.0 },
  ],
  facebook: [
    { tier: 'Nano (0–10K)', low: 1.5, high: 3.0 },
    { tier: 'Micro (10K–50K)', low: 0.8, high: 1.8 },
    { tier: 'Mid-Tier (50K–200K)', low: 0.5, high: 1.2 },
    { tier: 'Macro (200K–1M)', low: 0.2, high: 0.8 },
    { tier: 'Mega (1M+)', low: 0.05, high: 0.3 },
  ],
  twitter: [
    { tier: 'Nano (0–10K)', low: 1.0, high: 3.0 },
    { tier: 'Micro (10K–50K)', low: 0.5, high: 1.5 },
    { tier: 'Mid-Tier (50K–200K)', low: 0.2, high: 0.8 },
    { tier: 'Macro (200K–1M)', low: 0.1, high: 0.4 },
    { tier: 'Mega (1M+)', low: 0.02, high: 0.2 },
  ],
};

export default function BenchmarkTable({ platform }: BenchmarkTableProps) {
  const platformName = PLATFORM_NAMES[platform];
  const tierData = TIER_BENCHMARKS[platform];
  const industryData = INDUSTRY_BENCHMARKS.map((b) => ({
    name: b.name,
    rate: b[platform],
  })).sort((a, b) => b.rate - a.rate);

  return (
    <div className="space-y-10">
      {/* Tier benchmarks */}
      <div>
        <h3 className="mb-4 text-lg font-semibold text-foreground">
          {platformName} Engagement Rate by Follower Tier (2026)
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs text-muted">
                <th className="pb-2 pr-4 font-medium">Follower Tier</th>
                <th className="pb-2 pr-4 font-medium">Low Benchmark</th>
                <th className="pb-2 pr-4 font-medium">High Benchmark</th>
                <th className="pb-2 font-medium">Avg Range</th>
              </tr>
            </thead>
            <tbody>
              {tierData.map((row) => (
                <tr key={row.tier} className="border-b border-border/50 last:border-0">
                  <td className="py-2.5 pr-4 font-medium text-foreground">{row.tier}</td>
                  <td className="py-2.5 pr-4 text-muted">{formatPercent(row.low)}</td>
                  <td className="py-2.5 pr-4 text-muted">{formatPercent(row.high)}</td>
                  <td className="py-2.5 text-primary">{formatPercent((row.low + row.high) / 2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Industry benchmarks */}
      <div>
        <h3 className="mb-4 text-lg font-semibold text-foreground">
          {platformName} Engagement Rate by Industry (2026)
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs text-muted">
                <th className="pb-2 pr-4 font-medium">Industry</th>
                <th className="pb-2 pr-4 font-medium">Avg Rate</th>
                <th className="pb-2 font-medium">Relative</th>
              </tr>
            </thead>
            <tbody>
              {industryData.map((row) => {
                const overallAvg = YOY_TRENDS[YOY_TRENDS.length - 1][platform];
                const relative = ((row.rate / overallAvg - 1) * 100).toFixed(0);
                const sign = Number(relative) >= 0 ? '+' : '';
                return (
                  <tr key={row.name} className="border-b border-border/50 last:border-0">
                    <td className="py-2.5 pr-4 font-medium text-foreground">{row.name}</td>
                    <td className="py-2.5 pr-4 text-muted">{formatPercent(row.rate)}</td>
                    <td
                      className={`py-2.5 ${Number(relative) >= 0 ? 'text-emerald-700' : 'text-red-700'}`}
                    >
                      {sign}
                      {relative}% vs avg
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
