'use client';

import { useId } from 'react';
import { useWheelStep } from './useWheelStep';

interface NumberInputProps {
  label: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
  placeholder?: string;
}

export default function NumberInput({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  placeholder,
}: NumberInputProps) {
  const id = useId();
  const inputRef = useWheelStep<HTMLInputElement>({
    onStep: (dir) => {
      const next = value + dir * step;
      onChange(Math.max(min ?? -Infinity, Math.min(next, max ?? Infinity)));
    },
  });

  return (
    <div className="space-y-1">
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </label>
      <input
        ref={inputRef}
        id={id}
        type="number"
        value={value}
        min={min}
        max={max}
        step="any"
        onChange={(e) => onChange(Number(e.target.value))}
        autoComplete="off"
        placeholder={placeholder}
        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
      />
    </div>
  );
}
