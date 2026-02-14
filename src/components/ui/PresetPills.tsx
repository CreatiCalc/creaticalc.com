'use client';

interface PresetOption<T extends string | number> {
  label: string;
  value: T;
}

interface PresetPillsProps<T extends string | number> {
  options: PresetOption<T>[];
  value: T;
  onChange: (value: T) => void;
  ariaLabel: string;
}

export default function PresetPills<T extends string | number>({
  options,
  value,
  onChange,
  ariaLabel,
}: PresetPillsProps<T>) {
  return (
    <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={ariaLabel}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          role="radio"
          aria-checked={value === option.value}
          onClick={() => onChange(option.value)}
          className={`rounded-full border px-3 py-1 text-sm transition-colors ${
            value === option.value
              ? 'border-primary bg-primary text-white'
              : 'border-border bg-surface text-muted hover:border-primary hover:text-foreground'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
