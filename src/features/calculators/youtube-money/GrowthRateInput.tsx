'use client';

const PRESETS = [0, 0.05, 0.1, 0.2] as const;

interface GrowthRateInputProps {
  value: number;
  onChange: (rate: number) => void;
}

export default function GrowthRateInput({ value, onChange }: GrowthRateInputProps) {
  const isPreset = PRESETS.includes(value as (typeof PRESETS)[number]);

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">Monthly Growth Rate</label>
      <div className="flex flex-wrap items-center gap-2">
        {PRESETS.map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => onChange(preset)}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              value === preset
                ? 'bg-primary text-white'
                : 'border border-border bg-background text-foreground hover:border-primary'
            }`}
          >
            {Math.round(preset * 100)}%
          </button>
        ))}
        <input
          type="number"
          min={0}
          max={100}
          step={1}
          value={isPreset ? '' : Math.round(value * 100)}
          onChange={(e) => {
            const pct = Number(e.target.value);
            if (!isNaN(pct) && pct >= 0 && pct <= 100) {
              onChange(pct / 100);
            }
          }}
          placeholder="Custom %"
          aria-label="Custom growth rate percentage"
          className="w-24 rounded-lg border border-border bg-background px-3 py-1.5 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>
    </div>
  );
}
