'use client';

interface CalcMethodOption<T extends string> {
  mode: T;
  label: string;
  description: string;
}

interface CalcMethodToggleProps<T extends string> {
  value: T;
  onChange: (method: T) => void;
  options: CalcMethodOption<T>[];
  wrap?: boolean;
}

export default function CalcMethodToggle<T extends string>({
  value,
  onChange,
  options,
  wrap = false,
}: CalcMethodToggleProps<T>) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">Calculation Method</label>
      <div
        className={`flex gap-2${wrap ? ' flex-wrap' : ''}`}
        role="radiogroup"
        aria-label="Calculation method"
      >
        {options.map(({ mode, label, description }) => (
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
