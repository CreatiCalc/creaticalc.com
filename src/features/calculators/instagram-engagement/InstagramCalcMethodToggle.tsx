'use client';

import type { InstagramCalcMethod } from '@/lib/engagementModel';

interface InstagramCalcMethodToggleProps {
  value: InstagramCalcMethod;
  onChange: (method: InstagramCalcMethod) => void;
}

const OPTIONS: { mode: InstagramCalcMethod; label: string; description: string }[] = [
  { mode: 'byFollowers', label: 'By Followers', description: 'interactions / followers' },
  { mode: 'byReach', label: 'By Reach', description: 'interactions / reach' },
  { mode: 'byImpressions', label: 'By Impressions', description: 'interactions / impressions' },
];

export default function InstagramCalcMethodToggle({
  value,
  onChange,
}: InstagramCalcMethodToggleProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">Calculation Method</label>
      <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Calculation method">
        {OPTIONS.map(({ mode, label, description }) => (
          <button
            key={mode}
            type="button"
            role="radio"
            aria-checked={value === mode}
            onClick={() => onChange(mode)}
            className={`flex flex-col rounded-lg px-3 py-1.5 text-left transition-colors ${
              value === mode
                ? 'bg-primary text-white'
                : 'border border-border bg-white text-foreground hover:border-primary'
            }`}
          >
            <span className="text-sm font-medium">{label}</span>
            <span className={`text-xs ${value === mode ? 'text-white/70' : 'text-muted'}`}>
              {description}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
