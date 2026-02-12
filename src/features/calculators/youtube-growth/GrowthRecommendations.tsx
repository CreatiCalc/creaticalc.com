'use client';

import type { GrowthRecommendation } from '@/lib/subscriberGrowthModel';

interface GrowthRecommendationsProps {
  recommendations: GrowthRecommendation[];
}

export default function GrowthRecommendations({ recommendations }: GrowthRecommendationsProps) {
  if (recommendations.length === 0) return null;

  return (
    <div className="mt-4 space-y-3">
      <h3 className="text-lg font-semibold">Growth Tips</h3>
      {recommendations.map((rec) => (
        <div key={rec.id} className="rounded-lg border border-border bg-surface p-4">
          <p className="font-medium text-foreground">{rec.title}</p>
          <p className="mt-1 text-sm text-muted">{rec.detail}</p>
        </div>
      ))}
    </div>
  );
}
