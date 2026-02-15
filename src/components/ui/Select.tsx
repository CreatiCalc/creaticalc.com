'use client';

import { useId } from 'react';

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  label: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  /** Fallback accessible label when the visible label is insufficient for screen readers */
  ariaLabel?: string;
  disabled?: boolean;
}

export default function Select({
  label,
  value,
  options,
  onChange,
  ariaLabel,
  disabled,
}: SelectProps) {
  const id = useId();

  return (
    <div className="space-y-1">
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete="off"
        aria-label={ariaLabel}
        disabled={disabled}
        className={`w-full rounded-lg border border-border bg-background px-3 py-2 text-sm transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20${disabled ? ' cursor-not-allowed opacity-50' : ''}`}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
