'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { type Platform, type EngagementBreakdown, formatPercent } from '@/lib/engagementBenchmarks';

interface EngagementBreakdownChartProps {
  breakdown: EngagementBreakdown;
  platform: Platform;
}

const PLATFORM_COLORS: Record<Platform, string[]> = {
  instagram: ['#E1306C', '#833AB4', '#F77737'],
  tiktok: ['#FF0050', '#00F2EA', '#000000'],
  facebook: ['#1877F2', '#42B72A', '#F7B928'],
  twitter: ['#1DA1F2', '#14171A', '#657786', '#AAB8C2'],
};

export default function EngagementBreakdownChart({
  breakdown,
  platform,
}: EngagementBreakdownChartProps) {
  const colors = PLATFORM_COLORS[platform];

  const data = [
    {
      name: platform === 'facebook' ? 'Reactions' : 'Likes',
      value: breakdown.likes.count,
      pct: breakdown.likes.pct,
    },
    {
      name: platform === 'twitter' ? 'Replies' : 'Comments',
      value: breakdown.comments.count,
      pct: breakdown.comments.pct,
    },
    ...(breakdown.saves
      ? [{ name: 'Saves', value: breakdown.saves.count, pct: breakdown.saves.pct }]
      : []),
    ...(breakdown.shares
      ? [{ name: 'Shares', value: breakdown.shares.count, pct: breakdown.shares.pct }]
      : []),
    ...(breakdown.reposts
      ? [{ name: 'Reposts', value: breakdown.reposts.count, pct: breakdown.reposts.pct }]
      : []),
    ...(breakdown.bookmarks
      ? [{ name: 'Bookmarks', value: breakdown.bookmarks.count, pct: breakdown.bookmarks.pct }]
      : []),
  ].filter((d) => d.value > 0);

  if (data.length === 0) return null;

  // Like-to-comment ratio insight
  let ratioInsight: string;
  if (breakdown.likeToCommentRatio > 50) {
    ratioInsight =
      'Your audience is mostly passive likers. Try asking questions or creating debate-worthy content to spark more comments.';
  } else if (breakdown.likeToCommentRatio > 20) {
    ratioInsight =
      'Your like-to-comment ratio is typical. Keep encouraging conversations to build a more engaged community.';
  } else if (breakdown.likeToCommentRatio > 5) {
    ratioInsight =
      'Great comment engagement! Your audience actively participates in discussions, which signals high-quality engagement to both the algorithm and potential brand partners.';
  } else {
    ratioInsight =
      'Extremely high comment engagement — your community is very active. This is the kind of engagement brands pay a premium for.';
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center gap-4 sm:flex-row">
        {/* Pie chart */}
        <div className="h-48 w-48 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={70}
                dataKey="value"
                strokeWidth={2}
                stroke="#fff"
              >
                {data.map((_entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [Number(value).toLocaleString()]}
                contentStyle={{
                  borderRadius: '8px',
                  border: '1px solid var(--color-border)',
                  fontSize: '12px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend + stats */}
        <div className="flex-1 space-y-2">
          {data.map((item, index) => (
            <div key={item.name} className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm">
                <span
                  className="inline-block h-3 w-3 rounded-full"
                  style={{ backgroundColor: colors[index % colors.length] }}
                />
                {item.name}
              </span>
              <span className="text-sm font-medium">
                {item.value.toLocaleString()}{' '}
                <span className="text-muted">({formatPercent(item.pct)})</span>
              </span>
            </div>
          ))}
          <div className="border-t border-border pt-2">
            <div className="flex items-center justify-between text-sm font-semibold">
              <span>Total Interactions</span>
              <span>{breakdown.total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Like-to-comment ratio */}
      <div className="rounded-lg border border-border bg-surface p-4">
        <p className="text-sm font-medium text-foreground">
          Like-to-Comment Ratio: {Math.round(breakdown.likeToCommentRatio)}:1
        </p>
        <p className="mt-1 text-sm text-muted">{ratioInsight}</p>
      </div>
    </div>
  );
}
