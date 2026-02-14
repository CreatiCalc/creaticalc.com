'use client';

import type { ReactNode } from 'react';

export interface MilestoneItem {
  key: string | number;
  monthIndex: number | null;
  label: ReactNode;
  reachedText: string;
  futureDetail?: ReactNode;
  unreachableText: string;
  description?: string;
}

interface MilestoneTimelineProps {
  title: string;
  milestones: MilestoneItem[];
}

export default function MilestoneTimeline({ title, milestones }: MilestoneTimelineProps) {
  const hasAnyVisible = milestones.some((m) => m.monthIndex !== null);
  if (!hasAnyVisible) return null;

  return (
    <div className="mt-4">
      <h3 className="mb-4 text-lg font-semibold">{title}</h3>
      <div className="relative space-y-0">
        {milestones.map((milestone, i) => {
          const isReached = milestone.monthIndex === 0;
          const isFuture = milestone.monthIndex !== null && milestone.monthIndex > 0;
          const isUnreachable = milestone.monthIndex === null;
          const isLast = i === milestones.length - 1;

          return (
            <div key={milestone.key} className="flex items-stretch gap-3">
              {/* Timeline column */}
              <div className="flex w-5 flex-col items-center">
                {isReached ? (
                  <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-green-500 text-white">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path
                        d="M2.5 6L5 8.5L9.5 3.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                ) : isFuture ? (
                  <div className="h-5 w-5 flex-shrink-0 rounded-full border-2 border-primary bg-white" />
                ) : (
                  <div className="h-5 w-5 flex-shrink-0 rounded-full border-2 border-border bg-surface-alt" />
                )}
                {!isLast && (
                  <div
                    className={`w-0.5 flex-1 ${isUnreachable ? 'bg-border' : 'bg-primary/30'}`}
                  />
                )}
              </div>

              {/* Content */}
              <div className={`pb-4 ${isUnreachable ? 'opacity-40' : ''}`}>
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-semibold">{milestone.label}</span>
                  {isReached && (
                    <span className="text-xs font-medium text-green-600">
                      {milestone.reachedText}
                    </span>
                  )}
                  {isFuture && milestone.futureDetail && (
                    <span className="text-xs text-muted">{milestone.futureDetail}</span>
                  )}
                  {isUnreachable && (
                    <span className="text-xs text-muted">{milestone.unreachableText}</span>
                  )}
                </div>
                {milestone.description && (
                  <p className="text-xs text-muted">{milestone.description}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
