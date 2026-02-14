'use client';

import type { HealthScore } from '@/lib/engagementModel';

interface EngagementHealthScoreProps {
  healthScore: HealthScore;
}

function ArcGauge({ score }: { score: number }) {
  // SVG arc gauge: 180-degree arc
  const radius = 60;
  const cx = 70;
  const cy = 70;
  const startAngle = Math.PI;
  const endAngle = 0;
  const scoreAngle = startAngle - (score / 100) * Math.PI;

  // Background arc
  const bgX1 = cx + radius * Math.cos(startAngle);
  const bgY1 = cy - radius * Math.sin(startAngle);
  const bgX2 = cx + radius * Math.cos(endAngle);
  const bgY2 = cy - radius * Math.sin(endAngle);

  // Score arc
  const sX2 = cx + radius * Math.cos(scoreAngle);
  const sY2 = cy - radius * Math.sin(scoreAngle);
  // Color based on score
  let strokeColor = '#ef4444'; // red
  if (score >= 80)
    strokeColor = '#10b981'; // emerald
  else if (score >= 60)
    strokeColor = '#22c55e'; // green
  else if (score >= 40)
    strokeColor = '#eab308'; // yellow
  else if (score >= 25) strokeColor = '#f97316'; // orange

  return (
    <svg viewBox="0 0 140 80" className="mx-auto w-40">
      {/* Background arc */}
      <path
        d={`M ${bgX1} ${bgY1} A ${radius} ${radius} 0 1 1 ${bgX2} ${bgY2}`}
        fill="none"
        stroke="#e5e7eb"
        strokeWidth="10"
        strokeLinecap="round"
      />
      {/* Score arc */}
      {score > 0 && (
        <path
          d={`M ${bgX1} ${bgY1} A ${radius} ${radius} 0 0 1 ${sX2} ${sY2}`}
          fill="none"
          stroke={strokeColor}
          strokeWidth="10"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}

const COMPONENT_LABELS: Record<string, string> = {
  rateBenchmark: 'Rate vs Benchmark',
  likeCommentRatio: 'Like:Comment Ratio',
  saveSharePct: 'Saves/Shares',
  industryComparison: 'Industry Comparison',
};

const COMPONENT_MAX: Record<string, number> = {
  rateBenchmark: 40,
  likeCommentRatio: 20,
  saveSharePct: 20,
  industryComparison: 20,
};

export default function EngagementHealthScore({ healthScore }: EngagementHealthScoreProps) {
  const { score, grade, components } = healthScore;

  let gradeColor = 'text-red-600';
  if (score >= 80) gradeColor = 'text-emerald-700';
  else if (score >= 60) gradeColor = 'text-green-600';
  else if (score >= 40) gradeColor = 'text-yellow-600';
  else if (score >= 25) gradeColor = 'text-orange-600';

  return (
    <div className="rounded-xl border border-border bg-background p-6 shadow-sm">
      <div className="text-center">
        <ArcGauge score={score} />
        <div className="-mt-2 flex items-baseline justify-center gap-2">
          <span className="text-4xl font-bold text-foreground">{score}</span>
          <span className={`text-2xl font-bold ${gradeColor}`}>{grade}</span>
        </div>
        <p className="mt-1 text-sm text-muted">Engagement Health Score</p>
      </div>

      <div className="mt-6 space-y-3">
        {Object.entries(components).map(([key, value]) => (
          <div key={key}>
            <div className="flex justify-between text-xs text-muted">
              <span>{COMPONENT_LABELS[key]}</span>
              <span>
                {value}/{COMPONENT_MAX[key]}
              </span>
            </div>
            <div className="mt-1 h-2 overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${(value / COMPONENT_MAX[key]) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
