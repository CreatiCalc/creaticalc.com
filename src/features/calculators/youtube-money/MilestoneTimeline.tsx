'use client';

import { useMemo } from 'react';
import type { ProjectionInput } from '@/lib/youtubeEarningsModel';
import { findMilestoneMonths, formatUSD } from '@/lib/youtubeEarningsModel';
import { MONTH_ABBREVIATIONS } from '@/lib/formatters';
import SharedMilestoneTimeline from '../shared/MilestoneTimeline';
import type { MilestoneItem } from '../shared/MilestoneTimeline';

function getMonthLabel(startMonth: number, monthIndex: number): string {
  const now = new Date();
  const startYear = now.getFullYear();
  const calMonth = (startMonth + monthIndex) % 12;
  const yearOffset = Math.floor((startMonth + monthIndex) / 12);
  return `${MONTH_ABBREVIATIONS[calMonth]} ${startYear + yearOffset}`;
}

interface MilestoneTimelineProps {
  input: ProjectionInput;
}

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
          Month {m.monthIndex} &mdash; {getMonthLabel(input.startMonth, m.monthIndex)}
        </>
      ) : undefined,
    unreachableText: 'Beyond 3 years',
  }));

  return <SharedMilestoneTimeline title="When Will You Hit..." milestones={milestones} />;
}
