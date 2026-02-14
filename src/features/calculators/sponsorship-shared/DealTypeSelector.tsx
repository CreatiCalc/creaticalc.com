'use client';

import type { DealType } from '@/lib/sponsorshipModel';
import { DEAL_TYPES } from '@/lib/sponsorshipModel';

interface DealTypeSelectorProps {
  value: DealType;
  onChange: (value: DealType) => void;
}

export default function DealTypeSelector({ value, onChange }: DealTypeSelectorProps) {
  return (
    <div>
      <p className="mb-2 text-sm font-medium text-foreground">Deal Type</p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {DEAL_TYPES.map((dt) => (
          <button
            key={dt.value}
            type="button"
            onClick={() => onChange(dt.value)}
            className={`rounded-lg border px-3 py-2 text-left transition-colors ${
              value === dt.value
                ? 'border-primary bg-primary/5 text-foreground'
                : 'border-border bg-background text-muted hover:border-primary/50'
            }`}
          >
            <span className="block text-sm font-medium">{dt.label}</span>
            <span className="block text-xs text-muted">{dt.description}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
