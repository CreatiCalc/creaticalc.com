'use client';

import type { InstagramContentType } from '@/lib/engagementModel';

interface InstagramContentTypeToggleProps {
  value: InstagramContentType;
  onChange: (type: InstagramContentType) => void;
}

const OPTIONS: { mode: InstagramContentType; label: string }[] = [
  { mode: 'mixed', label: 'Mixed' },
  { mode: 'feed', label: 'Feed Posts' },
  { mode: 'reels', label: 'Reels' },
  { mode: 'stories', label: 'Stories' },
];

export default function InstagramContentTypeToggle({
  value,
  onChange,
}: InstagramContentTypeToggleProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">Content Type</label>
      <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Content type">
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
                : 'border border-border bg-background text-foreground hover:border-primary'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
