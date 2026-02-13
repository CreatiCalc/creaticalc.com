'use client';

interface SeasonalityToggleProps {
  enabled: boolean;
  onToggle: () => void;
}

export default function SeasonalityToggle({ enabled, onToggle }: SeasonalityToggleProps) {
  return (
    <div className="flex items-start gap-3">
      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        aria-label="Apply Seasonality"
        onClick={onToggle}
        className={`relative mt-0.5 h-5 w-9 shrink-0 cursor-pointer rounded-full transition-colors ${
          enabled ? 'bg-primary' : 'bg-muted-light'
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white transition-transform ${
            enabled ? 'translate-x-4' : 'translate-x-0'
          }`}
        />
      </button>
      <div>
        <p className="text-sm font-medium text-foreground">Apply Seasonality</p>
        <p className="text-xs text-muted">
          Model Q4 ad-rate peaks (Nov +30%, Dec +40%) and January dips (-20%)
        </p>
      </div>
    </div>
  );
}
