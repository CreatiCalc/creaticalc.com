'use client';

import Slider from '@/components/ui/Slider';
import AnimatedNumber from '@/components/ui/AnimatedNumber';
import { formatUSD } from '@/lib/engagementBenchmarks';
import type { RateRange } from '@/lib/sponsorshipModel';

interface MonthlyEarningsProjectionProps {
  rate: RateRange;
  dealsPerMonth: number;
  onDealsChange: (value: number) => void;
}

export default function MonthlyEarningsProjection({
  rate,
  dealsPerMonth,
  onDealsChange,
}: MonthlyEarningsProjectionProps) {
  const monthlyLow = rate.low * dealsPerMonth;
  const monthlyMid = rate.mid * dealsPerMonth;
  const monthlyHigh = rate.high * dealsPerMonth;
  const yearlyMid = monthlyMid * 12;

  return (
    <div className="space-y-4">
      <Slider
        label="Sponsored Deals per Month"
        value={dealsPerMonth}
        min={1}
        max={20}
        step={1}
        onChange={onDealsChange}
        formatValue={(v) => `${v} deal${v === 1 ? '' : 's'}`}
      />

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-border bg-white p-3 text-center">
          <p className="text-xs text-muted">Low Estimate</p>
          <p className="mt-1 text-lg font-bold text-foreground">
            <AnimatedNumber value={monthlyLow} format={formatUSD} />
          </p>
          <p className="text-xs text-muted">/month</p>
        </div>
        <div className="rounded-lg border border-primary/30 bg-primary/5 p-3 text-center">
          <p className="text-xs text-muted">Mid Estimate</p>
          <p className="mt-1 text-lg font-bold text-primary">
            <AnimatedNumber value={monthlyMid} format={formatUSD} />
          </p>
          <p className="text-xs text-muted">/month</p>
        </div>
        <div className="rounded-lg border border-border bg-white p-3 text-center">
          <p className="text-xs text-muted">High Estimate</p>
          <p className="mt-1 text-lg font-bold text-foreground">
            <AnimatedNumber value={monthlyHigh} format={formatUSD} />
          </p>
          <p className="text-xs text-muted">/month</p>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-surface p-3 text-center">
        <p className="text-xs text-muted">Projected Annual Earnings (mid estimate)</p>
        <p className="mt-1 text-xl font-bold text-foreground">
          <AnimatedNumber value={yearlyMid} format={formatUSD} />
        </p>
        <p className="text-xs text-muted">
          Based on {dealsPerMonth} deal{dealsPerMonth === 1 ? '' : 's'}/month &times; 12 months
        </p>
      </div>
    </div>
  );
}
