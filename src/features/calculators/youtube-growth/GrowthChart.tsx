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
import type { MonthGrowthProjection } from '@/lib/subscriberGrowthModel';
import { formatSubscribers } from '@/lib/subscriberGrowthModel';

interface GrowthChartProps {
  months: MonthGrowthProjection[];
}

interface ChartDataPoint {
  month: string;
  bandBase: number;
  bandHeight: number;
  subscribers: number;
  low: number;
  high: number;
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
      <p className="font-medium">
        Projected: <span className="text-primary">{d.subscribers.toLocaleString()} subs</span>
      </p>
      <div className="mt-1.5 border-t border-border pt-1.5">
        <p className="text-muted">
          Low: <span className="text-foreground">{d.low.toLocaleString()}</span>
        </p>
        <p className="text-muted">
          High: <span className="text-foreground">{d.high.toLocaleString()}</span>
        </p>
      </div>
    </div>
  );
}

export default function GrowthChart({ months }: GrowthChartProps) {
  const data: ChartDataPoint[] = months.map((m) => ({
    month: m.monthLabel,
    bandBase: m.subscribersLow,
    bandHeight: m.subscribersHigh - m.subscribersLow,
    subscribers: m.subscribers,
    low: m.subscribersLow,
    high: m.subscribersHigh,
  }));

  return (
    <div className="mt-6">
      <h3 className="mb-3 text-lg font-semibold">24-Month Subscriber Projection</h3>
      <ResponsiveContainer width="100%" height={350}>
        <ComposedChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="month" tick={{ fontSize: 11 }} interval={2} />
          <YAxis tickFormatter={(v: number) => formatSubscribers(v)} tick={{ fontSize: 12 }} />
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
            dataKey="subscribers"
            stroke="var(--color-primary)"
            strokeWidth={2}
            dot={{ r: 3, fill: 'var(--color-primary)' }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
