'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import type { Platform } from '@/lib/engagementBenchmarks';
import { getTierBenchmark, findTier } from '@/lib/engagementBenchmarks';
import { rateEngagement, getRatingLabel } from '@/lib/engagementModel';

const RATING_DOT: Record<string, string> = {
  excellent: 'bg-emerald-500',
  good: 'bg-green-500',
  average: 'bg-yellow-500',
  below_average: 'bg-orange-500',
  low: 'bg-red-500',
};

const RATING_TEXT: Record<string, string> = {
  excellent: 'text-emerald-700',
  good: 'text-green-600',
  average: 'text-yellow-600',
  below_average: 'text-orange-600',
  low: 'text-red-500',
};

interface MetricField {
  label: string;
  placeholder: string;
}

const PLATFORM_METRICS: Record<Platform, [MetricField, MetricField]> = {
  twitter: [
    { label: 'Avg. Likes', placeholder: '50' },
    { label: 'Avg. Replies', placeholder: '5' },
  ],
  instagram: [
    { label: 'Avg. Likes', placeholder: '200' },
    { label: 'Avg. Comments', placeholder: '15' },
  ],
  tiktok: [
    { label: 'Avg. Likes', placeholder: '500' },
    { label: 'Avg. Comments', placeholder: '20' },
  ],
  facebook: [
    { label: 'Avg. Reactions', placeholder: '50' },
    { label: 'Avg. Comments', placeholder: '10' },
  ],
};

interface QuickEngagementCheckProps {
  platform: Platform;
  calculatorHref: string;
}

export default function QuickEngagementCheck({
  platform,
  calculatorHref,
}: QuickEngagementCheckProps) {
  const [followers, setFollowers] = useState('');
  const [metricA, setMetricA] = useState('');
  const [metricB, setMetricB] = useState('');

  const metrics = PLATFORM_METRICS[platform];

  const result = useMemo(() => {
    const f = parseInt(followers.replace(/,/g, ''), 10);
    const a = parseInt(metricA.replace(/,/g, ''), 10);
    const b = parseInt(metricB.replace(/,/g, ''), 10);
    if (!f || f <= 0) return null;
    const totalEngagements = (a || 0) + (b || 0);
    if (totalEngagements <= 0) return null;

    const rate = (totalEngagements / f) * 100;
    const rating = rateEngagement(platform, f, rate);
    const tier = findTier(platform, f);
    const benchmark = getTierBenchmark(platform, f);

    return { rate, rating, tierLabel: tier.label, benchmark };
  }, [followers, metricA, metricB, platform]);

  const formatInput = (value: string) => {
    const num = value.replace(/[^\d]/g, '');
    if (!num) return '';
    return parseInt(num, 10).toLocaleString();
  };

  // Mini gauge: position the rate marker within the benchmark range
  const gaugeData = useMemo(() => {
    if (!result) return null;
    const { benchmark, rate } = result;
    const scaleMax = benchmark.high * 2.5;
    const lowPct = (benchmark.low / scaleMax) * 100;
    const highPct = (benchmark.high / scaleMax) * 100;
    const ratePct = Math.min((rate / scaleMax) * 100, 100);
    return { lowPct, highPct, ratePct };
  }, [result]);

  const hasResult = result !== null;

  const inputClass =
    'w-full rounded-lg border border-border bg-background px-3 py-2 font-mono text-sm tabular-nums text-foreground placeholder:text-stone-300 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors';

  return (
    <div className="not-prose my-8 rounded-2xl border border-border bg-background shadow-sm">
      <div className="p-5 sm:p-6">
        {/* Header row */}
        <div className="mb-5 flex items-baseline justify-between">
          <h3 className="font-display text-[0.9rem] font-semibold tracking-tight text-foreground">
            Quick Engagement Check
          </h3>
          <Link
            href={calculatorHref}
            className="text-xs font-medium text-primary transition-colors hover:text-primary-dark"
          >
            Advanced calculator &rarr;
          </Link>
        </div>

        {/* Main layout: inputs left, result right */}
        <div className="flex flex-col gap-5 sm:flex-row sm:gap-6">
          {/* Inputs column */}
          <div className="flex-1 space-y-3">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted">Followers</label>
              <input
                type="text"
                inputMode="numeric"
                value={followers}
                onChange={(e) => setFollowers(formatInput(e.target.value))}
                placeholder="10,000"
                className={inputClass}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted">
                  {metrics[0].label}
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={metricA}
                  onChange={(e) => setMetricA(formatInput(e.target.value))}
                  placeholder={metrics[0].placeholder}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted">
                  {metrics[1].label}
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={metricB}
                  onChange={(e) => setMetricB(formatInput(e.target.value))}
                  placeholder={metrics[1].placeholder}
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* Result column — identical DOM always, only text/color changes */}
          <div className="flex flex-col items-center justify-center rounded-xl bg-surface-alt px-6 py-5 sm:min-w-[200px]">
            <p
              className={`font-mono text-3xl font-bold tracking-tight ${hasResult ? 'text-foreground' : 'text-stone-200'}`}
            >
              {hasResult ? result.rate.toFixed(2) : '0.00'}%
            </p>
            <div className="mt-1.5 flex items-center gap-1.5">
              <span
                className={`inline-block h-2 w-2 rounded-full ${hasResult ? RATING_DOT[result.rating] : 'bg-stone-200'}`}
              />
              <span
                className={`text-sm font-semibold ${hasResult ? RATING_TEXT[result.rating] : 'text-stone-300'}`}
              >
                {hasResult ? getRatingLabel(result.rating) : 'Your Rate'}
              </span>
            </div>

            <div className="mt-4 w-full">
              <div className="relative h-1.5 overflow-hidden rounded-full bg-stone-200">
                {gaugeData && (
                  <>
                    <div
                      className="absolute inset-y-0 rounded-full bg-primary/20"
                      style={{
                        left: `${gaugeData.lowPct}%`,
                        width: `${gaugeData.highPct - gaugeData.lowPct}%`,
                      }}
                    />
                    <div
                      className={`absolute top-1/2 h-3 w-3 rounded-full border-2 border-white shadow-sm ${RATING_DOT[result!.rating]}`}
                      style={{
                        left: `${gaugeData.ratePct}%`,
                        transform: 'translate(-50%, -50%)',
                      }}
                    />
                  </>
                )}
              </div>
              <div className="mt-1.5 flex justify-between text-[0.6rem] text-muted-light">
                <span>{hasResult ? `${result.benchmark.low}%` : 'Low'}</span>
                <span>{hasResult ? result.tierLabel : 'Benchmark'}</span>
                <span>{hasResult ? `${result.benchmark.high}%` : 'High'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
