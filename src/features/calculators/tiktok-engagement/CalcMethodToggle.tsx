'use client';

import type { TikTokCalcMethod } from '@/lib/engagementModel';

interface CalcMethodToggleProps {
  value: TikTokCalcMethod;
  onChange: (method: TikTokCalcMethod) => void;
}

const OPTIONS: { mode: TikTokCalcMethod; label: string; description: string }[] = [
  { mode: 'byFollowers', label: 'By Followers', description: 'interactions / followers' },
  { mode: 'byViews', label: 'By Views', description: 'interactions / views' },
];

export default function CalcMethodToggle({ value, onChange }: CalcMethodToggleProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">Calculation Method</label>
      <div className="flex gap-2" role="radiogroup" aria-label="Calculation method">
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
                : 'border border-border bg-background text-foreground hover:border-primary'
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
