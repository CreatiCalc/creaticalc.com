'use client';

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
  const recommendations: Recommendation[] = generateRecommendations(
    state,
    projection,
    state.revenueTarget
  );

  if (recommendations.length === 0) return null;

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
    </div>
  );
}
