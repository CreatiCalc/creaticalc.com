'use client';

import type { GrowthMilestone } from '@/lib/subscriberGrowthModel';
import SharedMilestoneTimeline from '../shared/MilestoneTimeline';
import type { MilestoneItem } from '../shared/MilestoneTimeline';

interface GrowthMilestoneTimelineProps {
  milestones: GrowthMilestone[];
}

export default function GrowthMilestoneTimeline({ milestones }: GrowthMilestoneTimelineProps) {
  const hasAnyFuture = milestones.some((m) => m.monthIndex !== null && m.monthIndex > 0);
  const hasAnyReached = milestones.some((m) => m.monthIndex === 0);

  if (!hasAnyFuture && !hasAnyReached) return null;

  const items: MilestoneItem[] = milestones.map((m) => ({
    key: m.target,
    monthIndex: m.monthIndex,
    label: <>{m.label} subscribers</>,
    reachedText: 'Already reached',
    futureDetail: m.monthIndex !== null && m.monthIndex > 0 ? <>Month {m.monthIndex}</> : undefined,
    unreachableText: 'Beyond 24 months',
    description: m.description,
  }));

  return <SharedMilestoneTimeline title="Subscriber Milestones" milestones={items} />;
}
