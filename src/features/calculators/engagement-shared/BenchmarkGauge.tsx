'use client';

import { type Platform, formatPercent } from '@/lib/engagementModel';

interface BenchmarkGaugeProps {
  rate: number;
  benchmarkLow: number;
  benchmarkHigh: number;
  industryAvg: number;
  platform: Platform;
}

export default function BenchmarkGauge({
  rate,
  benchmarkLow,
  benchmarkHigh,
  industryAvg,
  platform,
}: BenchmarkGaugeProps) {
  // Dynamic scale: 0 to benchmarkHigh * 2 (with some padding)
  const scaleMax = Math.max(benchmarkHigh * 2, rate * 1.3, industryAvg * 1.5);

  const toPercent = (val: number) => Math.min((val / scaleMax) * 100, 100);

  const lowPct = toPercent(benchmarkLow);
  const highPct = toPercent(benchmarkHigh);
  const ratePct = toPercent(rate);
  const industryPct = toPercent(industryAvg);

  const platformColor = platform === 'instagram' ? 'bg-purple-600' : 'bg-pink-500';

  return (
    <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
      <p className="mb-4 text-sm font-medium text-foreground">
        Your Rate vs. Follower Tier Benchmark
      </p>

      <div className="relative mb-2 h-8 overflow-hidden rounded-full bg-gray-100">
        {/* Low zone */}
        <div
          className="absolute inset-y-0 left-0 rounded-l-full bg-red-100"
          style={{ width: `${lowPct}%` }}
        />
        {/* Average zone */}
        <div
          className="absolute inset-y-0 bg-yellow-100"
          style={{ left: `${lowPct}%`, width: `${highPct - lowPct}%` }}
        />
        {/* Good zone */}
        <div
          className="absolute inset-y-0 rounded-r-full bg-green-100"
          style={{ left: `${highPct}%`, width: `${100 - highPct}%` }}
        />

        {/* User's rate marker */}
        <div
          className={`absolute top-0 h-full w-1 ${platformColor}`}
          style={{ left: `${ratePct}%`, transform: 'translateX(-50%)' }}
        />
        <div
          className={`absolute -top-0.5 h-3 w-3 rounded-full border-2 border-white ${platformColor}`}
          style={{ left: `${ratePct}%`, transform: 'translateX(-50%)' }}
        />

        {/* Industry avg marker */}
        <div
          className="absolute top-0 h-full w-0.5 border-l border-dashed border-gray-400"
          style={{ left: `${industryPct}%` }}
        />
      </div>

      <div className="flex justify-between text-xs text-muted">
        <span>0%</span>
        <span>{formatPercent(benchmarkLow)} (tier low)</span>
        <span>{formatPercent(benchmarkHigh)} (tier high)</span>
      </div>

      <div className="mt-3 flex flex-wrap gap-4 text-xs">
        <span className="flex items-center gap-1.5">
          <span className={`inline-block h-2.5 w-2.5 rounded-full ${platformColor}`} />
          Your rate: {formatPercent(rate)}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-0.5 border-l border-dashed border-gray-400" />
          Industry avg: {formatPercent(industryAvg)}
        </span>
      </div>
    </div>
  );
}
