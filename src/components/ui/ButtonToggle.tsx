'use client';

interface ButtonToggleOption<T extends string> {
  value: T;
  label: string;
  description?: string;
}

interface ButtonToggleProps<T extends string> {
  value: T;
  onChange: (value: T) => void;
  options: ButtonToggleOption<T>[];
  label?: string;
  ariaLabel: string;
  variant?: 'default' | 'pill';
  wrap?: boolean;
}

const defaultActive = 'bg-primary text-white';
const defaultInactive = 'border border-border bg-background text-foreground hover:border-primary';

const pillActive = 'border-primary bg-primary text-white';
const pillInactive =
  'border-border bg-surface text-muted hover:border-primary hover:text-foreground';

export default function ButtonToggle<T extends string>({
  value,
  onChange,
  options,
  label,
  ariaLabel,
  variant = 'default',
  wrap = false,
}: ButtonToggleProps<T>) {
  const isPill = variant === 'pill';
  const rounding = isPill ? 'rounded-full' : 'rounded-lg';
  const activeClass = isPill ? pillActive : defaultActive;
  const inactiveClass = isPill ? pillInactive : defaultInactive;
  const hasDescriptions = options.some((o) => o.description);

  return (
    <div className={label ? 'space-y-2' : undefined}>
      {label && <label className="text-sm font-medium text-foreground">{label}</label>}
      <div
        className={`flex gap-2${wrap ? ' flex-wrap' : ''}`}
        role="radiogroup"
        aria-label={ariaLabel}
      >
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={value === opt.value}
            onClick={() => onChange(opt.value)}
            className={`${hasDescriptions ? 'flex flex-col text-left' : ''} border ${rounding} px-3 py-1.5 text-sm font-medium transition-colors ${
              value === opt.value ? activeClass : inactiveClass
            }`}
          >
            {hasDescriptions ? (
              <>
                <span className="text-sm font-medium">{opt.label}</span>
                {opt.description && (
                  <span
                    className={`text-xs ${value === opt.value ? 'text-white/70' : 'text-muted'}`}
                  >
                    {opt.description}
                  </span>
                )}
              </>
            ) : (
              opt.label
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
