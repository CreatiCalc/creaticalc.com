'use client';

import type { GrowthInputMode } from '@/lib/subscriberGrowthModel';

interface GrowthInputModeToggleProps {
  value: GrowthInputMode;
  onChange: (mode: GrowthInputMode) => void;
}

const modes: { value: GrowthInputMode; label: string }[] = [
  { value: 'rate', label: 'Growth Rate (%)' },
  { value: 'flat', label: 'Monthly New Subs' },
];

export default function GrowthInputModeToggle({ value, onChange }: GrowthInputModeToggleProps) {
  return (
    <div className="flex gap-2">
      {modes.map((mode) => (
        <button
          key={mode.value}
          type="button"
          onClick={() => onChange(mode.value)}
          className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
            value === mode.value
              ? 'border-primary bg-primary text-white'
              : 'border-border bg-surface text-muted hover:border-primary hover:text-foreground'
          }`}
        >
          {mode.label}
        </button>
      ))}
    </div>
  );
}
