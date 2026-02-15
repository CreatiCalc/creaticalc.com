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

export interface RangeChartDataPoint {
  month: string;
  bandBase: number;
  bandHeight: number;
  mid: number;
}

interface RangeProjectionChartProps {
  title: string;
  data: RangeChartDataPoint[];
  yAxisFormatter: (value: number) => string;
  tooltip: React.ReactElement;
  xAxisInterval?: number;
  dotRadius?: number;
}

export default function RangeProjectionChart({
  title,
  data,
  yAxisFormatter,
  tooltip,
  xAxisInterval,
  dotRadius = 4,
}: RangeProjectionChartProps) {
  return (
    <div className="mt-6">
      <h3 className="mb-3 text-lg font-semibold">{title}</h3>
      <ResponsiveContainer width="100%" height={350}>
        <ComposedChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} interval={xAxisInterval} />
          <YAxis tickFormatter={yAxisFormatter} tick={{ fontSize: 12 }} />
          <Tooltip content={tooltip} />
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
            dot={{ r: dotRadius, fill: 'var(--color-primary)' }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
