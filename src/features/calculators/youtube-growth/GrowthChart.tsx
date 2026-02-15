'use client';

import RangeProjectionChart from '../shared/RangeProjectionChart';
import type { MonthGrowthProjection } from '@/lib/subscriberGrowthModel';
import { formatSubscribers } from '@/lib/subscriberGrowthModel';

interface GrowthChartProps {
  months: MonthGrowthProjection[];
}

interface SubscriberDataPoint {
  month: string;
  bandBase: number;
  bandHeight: number;
  mid: number;
  low: number;
  high: number;
}

function SubscriberTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { payload: SubscriberDataPoint }[];
  label?: string;
}) {
  if (!active || !payload?.[0]) return null;
  const d = payload[0].payload;

  return (
    <div className="rounded-lg border border-border bg-white p-3 text-xs shadow-md">
      <p className="mb-1 font-semibold">{d.month}</p>
      <p className="font-medium">
        Projected: <span className="text-primary">{d.mid.toLocaleString()} subs</span>
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
  const data = months.map((m) => ({
    month: m.monthLabel,
    bandBase: m.subscribersLow,
    bandHeight: m.subscribersHigh - m.subscribersLow,
    mid: m.subscribers,
    low: m.subscribersLow,
    high: m.subscribersHigh,
  }));

  return (
    <RangeProjectionChart
      title="24-Month Subscriber Projection"
      data={data}
      yAxisFormatter={formatSubscribers}
      tooltip={<SubscriberTooltip />}
      xAxisInterval={2}
      dotRadius={3}
    />
  );
}
