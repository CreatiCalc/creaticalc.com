'use client';

import { useMemo } from 'react';
import type {
  ProjectionInput,
  ProjectionResult,
  OptimizationTip,
} from '@/lib/youtubeEarningsModel';
import { generateOptimizationTips } from '@/lib/youtubeEarningsModel';

interface RecommendationsProps {
  state: ProjectionInput;
  projection: ProjectionResult;
  onApplyScenario: (scenario: Partial<ProjectionInput>) => void;
}

const CATEGORY_STYLES: Record<OptimizationTip['category'], { label: string; className: string }> = {
  revenue: { label: 'Revenue', className: 'bg-success/10 text-success' },
  strategy: { label: 'Strategy', className: 'bg-primary/10 text-primary' },
  growth: { label: 'Growth', className: 'bg-blue-100 text-blue-700' },
};

export default function Recommendations({
  state,
  projection,
  onApplyScenario,
}: RecommendationsProps) {
  const tips = useMemo(() => generateOptimizationTips(state, projection), [state, projection]);

  return (
    <div className="mt-8">
      <div className="grid gap-3 sm:grid-cols-2">
        {tips.map((tip) => {
          const style = CATEGORY_STYLES[tip.category];
          return (
            <div
              key={tip.id}
              className="flex flex-col justify-between rounded-lg border border-border bg-white p-4"
            >
              <div>
                <div className="mb-2 flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${style.className}`}
                    >
                      {style.label}
                    </span>
                    {tip.impact && (
                      <span className="shrink-0 rounded-full bg-success/10 px-2 py-0.5 text-xs font-semibold text-success">
                        {tip.impact}
                      </span>
                    )}
                  </div>
                </div>
                <p className="mb-1 font-medium">{tip.title}</p>
                <p className="text-sm text-muted">{tip.detail}</p>
              </div>
              {tip.scenario && (
                <button
                  type="button"
                  onClick={() => onApplyScenario(tip.scenario!)}
                  className="mt-3 self-start rounded-lg bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
                >
                  Try this
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
