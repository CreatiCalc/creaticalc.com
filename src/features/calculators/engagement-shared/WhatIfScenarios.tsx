'use client';

import Card from '@/components/ui/Card';
import {
  type Platform,
  type EngagementInput,
  type WhatIfScenario,
  getWhatIfScenarios,
  calculateEngagementRate,
  formatPercent,
} from '@/lib/engagementModel';

interface WhatIfScenariosProps {
  input: EngagementInput;
  currentRate: number;
  onApply: (changes: Partial<EngagementInput>) => void;
  platform: Platform;
}

export default function WhatIfScenarios({
  input,
  currentRate,
  onApply,
  platform,
}: WhatIfScenariosProps) {
  const scenarios = getWhatIfScenarios(input);

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted">
        See how small changes could impact your engagement rate. Click &ldquo;Try this&rdquo; to
        apply.
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {scenarios.map((scenario) => (
          <ScenarioCard
            key={scenario.id}
            scenario={scenario}
            input={input}
            currentRate={currentRate}
            onApply={onApply}
            platform={platform}
          />
        ))}
      </div>
    </div>
  );
}

function ScenarioCard({
  scenario,
  input,
  currentRate,
  onApply,
}: {
  scenario: WhatIfScenario;
  input: EngagementInput;
  currentRate: number;
  onApply: (changes: Partial<EngagementInput>) => void;
  platform: Platform;
}) {
  const hypotheticalInput = { ...input, ...scenario.changes };
  const hypotheticalRate = calculateEngagementRate(hypotheticalInput);
  const diff = hypotheticalRate - currentRate;
  const isPositive = diff > 0;

  return (
    <Card className="flex flex-col justify-between">
      <div>
        <p className="font-semibold text-foreground">{scenario.label}</p>
        <p className="mt-1 text-sm text-muted">{scenario.description}</p>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-lg font-bold text-foreground">
            {formatPercent(hypotheticalRate)}
          </span>
          <span
            className={`text-sm font-medium ${isPositive ? 'text-emerald-700' : 'text-red-700'}`}
          >
            {isPositive ? '+' : ''}
            {diff.toFixed(2)}pp
          </span>
        </div>
      </div>
      <button
        type="button"
        onClick={() => onApply(scenario.changes)}
        className="mt-3 w-full rounded-lg border border-primary bg-primary/5 px-3 py-1.5 text-sm font-medium text-primary transition-colors hover:bg-primary/10"
      >
        Try this
      </button>
    </Card>
  );
}
