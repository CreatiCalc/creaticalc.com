'use client';

import RangeProjectionChart from '../shared/RangeProjectionChart';
import type { MonthProjection } from '@/lib/youtubeEarningsModel';
import { formatUSD } from '@/lib/youtubeEarningsModel';

interface ProjectionChartProps {
  months: MonthProjection[];
}

interface RevenueDataPoint {
  month: string;
  bandBase: number;
  bandHeight: number;
  mid: number;
  low: number;
  high: number;
  views: number;
  rpmLow: number;
  rpmMid: number;
  rpmHigh: number;
}

function RevenueTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { payload: RevenueDataPoint }[];
  label?: string;
}) {
  if (!active || !payload?.[0]) return null;
  const d = payload[0].payload;

  return (
    <div className="rounded-lg border border-border bg-white p-3 text-xs shadow-md">
      <p className="mb-1 font-semibold">{d.month}</p>
      <p className="text-muted">
        Projected views: <span className="text-foreground">{d.views.toLocaleString()}</span>
      </p>
      <div className="mt-1.5 border-t border-border pt-1.5">
        <p className="text-muted">
          RPM: ${d.rpmLow.toFixed(2)} / ${d.rpmMid.toFixed(2)} / ${d.rpmHigh.toFixed(2)}
        </p>
      </div>
      <div className="mt-1.5 border-t border-border pt-1.5">
        <p className="text-muted">
          Revenue low: <span className="text-foreground">{formatUSD(d.low)}</span>
        </p>
        <p className="font-medium">
          Revenue mid: <span className="text-primary">{formatUSD(d.mid)}</span>
        </p>
        <p className="text-muted">
          Revenue high: <span className="text-foreground">{formatUSD(d.high)}</span>
        </p>
      </div>
    </div>
  );
}

function formatYAxis(v: number) {
  return v >= 1000 ? `$${(v / 1000).toFixed(0)}k` : `$${v}`;
}

export default function ProjectionChart({ months }: ProjectionChartProps) {
  const data = months.map((m) => ({
    month: m.monthLabel,
    bandBase: Math.round(m.revenue.low),
    bandHeight: Math.round(m.revenue.high - m.revenue.low),
    mid: Math.round(m.revenue.mid),
    low: Math.round(m.revenue.low),
    high: Math.round(m.revenue.high),
    views: m.projectedMonthViews,
    rpmLow: m.rpm.low,
    rpmMid: m.rpm.mid,
    rpmHigh: m.rpm.high,
  }));

  return (
    <RangeProjectionChart
      title="12-Month Earnings Projection"
      data={data}
      yAxisFormatter={formatYAxis}
      tooltip={<RevenueTooltip />}
    />
  );
}
