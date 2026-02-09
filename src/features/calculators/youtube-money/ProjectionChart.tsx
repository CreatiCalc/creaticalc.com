'use client';

import {
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import type { MonthProjection } from '@/lib/youtubeEarningsModel';
import { formatUSD } from '@/lib/youtubeEarningsModel';

interface ProjectionChartProps {
  months: MonthProjection[];
}

interface ChartDataPoint {
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

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { payload: ChartDataPoint }[];
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

export default function ProjectionChart({ months }: ProjectionChartProps) {
  const data: ChartDataPoint[] = months.map((m) => ({
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
    <div className="mt-6">
      <h3 className="mb-3 text-lg font-semibold">12-Month Earnings Projection</h3>
      <ResponsiveContainer width="100%" height={350}>
        <ComposedChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} />
          <YAxis
            tickFormatter={(v: number) => (v >= 1000 ? `$${(v / 1000).toFixed(0)}k` : `$${v}`)}
            tick={{ fontSize: 12 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="bandBase"
            stackId="band"
            fill="transparent"
            stroke="none"
          />
          <Area
            type="monotone"
            dataKey="bandHeight"
            stackId="band"
            fill="var(--color-primary)"
            fillOpacity={0.12}
            stroke="none"
          />
          <Line
            type="monotone"
            dataKey="mid"
            stroke="var(--color-primary)"
            strokeWidth={2}
            dot={{ r: 4, fill: 'var(--color-primary)' }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
