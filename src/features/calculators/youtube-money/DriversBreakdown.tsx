'use client';

import type { ProjectionInput, ProjectionResult } from '@/lib/youtubeEarningsModel';
import { calculateDrivers, formatUSD } from '@/lib/youtubeEarningsModel';

const BAR_COLORS = ['bg-primary', 'bg-secondary', 'bg-accent', 'bg-muted-light'];

interface DriversBreakdownProps {
  state: ProjectionInput;
  projection: ProjectionResult;
}

export default function DriversBreakdown({ state, projection }: DriversBreakdownProps) {
  const drivers = calculateDrivers(state, projection);

  return (
    <div className="mt-8">
      <h3 className="mb-3 text-lg font-semibold">What Drives Your Earnings?</h3>
      <div className="space-y-3">
        {drivers.map((driver, i) => (
          <div key={driver.factor}>
            <div className="mb-1 flex items-center justify-between text-sm">
              <div>
                <span className="font-medium">{driver.factor}</span>
                <span className="ml-2 text-muted">({driver.currentValue})</span>
              </div>
              <span className="text-xs font-semibold text-muted">
                +{formatUSD(driver.impactPerUnit)}/mo
              </span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-surface-alt">
              <div
                className={`h-full rounded-full transition-all ${BAR_COLORS[i] ?? BAR_COLORS[3]}`}
                style={{ width: `${Math.max(driver.relativeImpact, 2)}%` }}
              />
            </div>
            <p className="mt-0.5 text-xs text-muted">{driver.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
