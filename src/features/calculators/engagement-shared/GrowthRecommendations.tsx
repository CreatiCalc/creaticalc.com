'use client';

import type { EngagementRecommendation } from '@/lib/engagementBenchmarks';

interface GrowthRecommendationsProps {
  recommendations: EngagementRecommendation[];
}

export default function GrowthRecommendations({ recommendations }: GrowthRecommendationsProps) {
  if (recommendations.length === 0) return null;

  return (
    <div className="space-y-3">
      {recommendations.map((rec, index) => (
        <div
          key={rec.id}
          className="rounded-lg border border-border bg-white p-4 transition-colors hover:border-primary/30"
        >
          <div className="flex items-start gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
              {index + 1}
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">{rec.text}</p>
              <p className="mt-1 text-sm text-muted">{rec.detail}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
