'use client';

import type { ContentFormat } from '@/lib/youtubeEarningsModel';

interface ContentFormatToggleProps {
  value: ContentFormat;
  onChange: (format: ContentFormat) => void;
}

const OPTIONS: { mode: ContentFormat; label: string }[] = [
  { mode: 'longform', label: 'Long-form' },
  { mode: 'shorts', label: 'Shorts' },
];

export default function ContentFormatToggle({ value, onChange }: ContentFormatToggleProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">Content Format</label>
      <div className="flex gap-2" role="radiogroup" aria-label="Content format">
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
