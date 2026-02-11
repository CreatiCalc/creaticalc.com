'use client';

import type { InputMode } from './useCalculatorState';

interface InputModeToggleProps {
  value: InputMode;
  onChange: (mode: InputMode) => void;
}

const OPTIONS: { mode: InputMode; label: string }[] = [
  { mode: 'daily', label: 'Daily Views' },
  { mode: 'perVideo', label: 'Per Video' },
];

export default function InputModeToggle({ value, onChange }: InputModeToggleProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">Input Mode</label>
      <div className="flex gap-2" role="radiogroup" aria-label="View input mode">
        {OPTIONS.map(({ mode, label }) => (
          <button
            key={mode}
            type="button"
            role="radio"
            aria-checked={value === mode}
            onClick={() => onChange(mode)}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              value === mode
                ? 'bg-primary text-white'
                : 'border border-border bg-white text-foreground hover:border-primary'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
