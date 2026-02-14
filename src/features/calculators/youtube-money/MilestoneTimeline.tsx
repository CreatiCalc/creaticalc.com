'use client';

import { useMemo } from 'react';
import type { ProjectionInput } from '@/lib/youtubeEarningsModel';
import { findMilestoneMonths, formatUSD } from '@/lib/youtubeEarningsModel';
import { getMonthLabel } from '@/lib/formatters';
import SharedMilestoneTimeline from '../shared/MilestoneTimeline';
import type { MilestoneItem } from '../shared/MilestoneTimeline';

interface MilestoneTimelineProps {
  input: ProjectionInput;
}

const START_YEAR = new Date().getFullYear();

export default function MilestoneTimeline({ input }: MilestoneTimelineProps) {
  const rawMilestones = useMemo(() => findMilestoneMonths(input), [input]);

  if (input.monthlyGrowthRate <= 0) return null;

  const hasAnyFuture = rawMilestones.some((m) => m.monthIndex !== null && m.monthIndex > 0);
  if (!hasAnyFuture) return null;

  const milestones: MilestoneItem[] = rawMilestones.map((m) => ({
    key: m.target,
    monthIndex: m.monthIndex,
    label: <>{formatUSD(m.target)}/mo</>,
    reachedText: 'Already there',
    futureDetail:
      m.monthIndex !== null && m.monthIndex > 0 ? (
        <>
          Month {m.monthIndex} &mdash; {getMonthLabel(input.startMonth, START_YEAR, m.monthIndex)}
        </>
      ) : undefined,
    unreachableText: 'Beyond 3 years',
  }));

  return <SharedMilestoneTimeline title="When Will You Hit..." milestones={milestones} />;
}
