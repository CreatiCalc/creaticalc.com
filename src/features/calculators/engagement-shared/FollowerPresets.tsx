'use client';

interface FollowerPresetsProps {
  current: number;
  onSelect: (value: number) => void;
}

const PRESETS = [
  { label: '1K', value: 1_000 },
  { label: '10K', value: 10_000 },
  { label: '50K', value: 50_000 },
  { label: '100K', value: 100_000 },
  { label: '500K', value: 500_000 },
  { label: '1M', value: 1_000_000 },
];

export default function FollowerPresets({ current, onSelect }: FollowerPresetsProps) {
  return (
    <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Quick follower presets">
      {PRESETS.map((preset) => (
        <button
          key={preset.value}
          type="button"
          role="radio"
          aria-checked={current === preset.value}
          onClick={() => onSelect(preset.value)}
          className={`rounded-full border px-3 py-1 text-sm transition-colors ${
            current === preset.value
              ? 'border-primary bg-primary text-white'
              : 'border-border bg-surface text-muted hover:border-primary hover:text-foreground'
          }`}
        >
          {preset.label}
        </button>
      ))}
    </div>
  );
}
