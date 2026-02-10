'use client';

import { useMemo } from 'react';
import type { ProjectionInput, ProjectionResult, Recommendation } from '@/lib/youtubeEarningsModel';
import { generateRecommendations, formatUSD } from '@/lib/youtubeEarningsModel';
import NumberInput from '@/components/ui/NumberInput';

interface RecommendationsProps {
  state: ProjectionInput & { revenueTarget: number };
  projection: ProjectionResult;
  onApplyScenario: (scenario: Partial<ProjectionInput>) => void;
  onRevenueTargetChange: (target: number) => void;
}

export default function Recommendations({
  state,
  projection,
  onApplyScenario,
  onRevenueTargetChange,
}: RecommendationsProps) {
  const recommendations: Recommendation[] = useMemo(
    () => generateRecommendations(state, projection, state.revenueTarget),
    [state, projection]
  );

  return (
    <div className="mt-8">
      <h3 className="mb-3 text-lg font-semibold">What Should I Change?</h3>
      <div className="mb-4 max-w-xs">
        <NumberInput
          label="Monthly revenue target ($)"
          value={state.revenueTarget}
          min={100}
          max={1000000}
          step={100}
          onChange={onRevenueTargetChange}
        />
      </div>
      {recommendations.length > 0 ? (
        <div className="grid gap-3 sm:grid-cols-2">
          {recommendations.map((rec) => (
            <div
              key={rec.id}
              className="flex flex-col justify-between rounded-lg border border-border bg-white p-4"
            >
              <div>
                <div className="mb-1 flex items-start justify-between gap-2">
                  <p className="font-medium">{rec.text}</p>
                  <span className="shrink-0 rounded-full bg-success/10 px-2 py-0.5 text-xs font-semibold text-success">
                    +{formatUSD(rec.projectedImpact)}/mo
                  </span>
                </div>
                <p className="text-sm text-muted">{rec.detail}</p>
              </div>
              <button
                type="button"
                onClick={() => onApplyScenario(rec.scenario)}
                className="mt-3 self-start rounded-lg bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
              >
                Try this
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-success/30 bg-success/5 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-success/15">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5 text-success"
              >
                <path
                  fillRule="evenodd"
                  d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-success">You&apos;re on track!</p>
              <p className="mt-1 text-sm text-muted">
                Your projected earnings of {formatUSD(projection.summary.monthly.mid)}/mo already
                exceed your {formatUSD(state.revenueTarget)}/mo target. Raise your target above to
                get new recommendations.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
