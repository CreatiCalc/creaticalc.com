'use client';

import { useId, useCallback } from 'react';
import { useWheelStep } from './useWheelStep';

interface TickMark {
  value: number;
  label: string;
}

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  formatValue?: (value: number) => string;
  logScale?: boolean;
  ticks?: TickMark[];
}

const INTERNAL_MAX = 1000;

/** When min is 0, log-scale math needs a positive floor to avoid NaN from log(0). */
function logMin(min: number): number {
  return min > 0 ? min : 1;
}

function valueToPosition(value: number, min: number, max: number): number {
  if (value <= 0) return 0;
  const m = logMin(min);
  if (value <= m) return 1;
  if (value >= max) return INTERNAL_MAX;
  return Math.round((Math.log(value / m) / Math.log(max / m)) * (INTERNAL_MAX - 1)) + 1;
}

function positionToValue(pos: number, min: number, max: number, step: number): number {
  if (pos <= 0) return min;
  const m = logMin(min);
  const raw = m * Math.pow(max / m, (pos - 1) / (INTERNAL_MAX - 1));
  return Math.round(raw / step) * step;
}

function tickPosition(value: number, min: number, max: number): number {
  if (value <= 0) return 0;
  const m = logMin(min);
  const pos = (Math.log(value / m) / Math.log(max / m)) * (INTERNAL_MAX - 1) + 1;
  return (pos / INTERNAL_MAX) * 100;
}

export default function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  formatValue,
  logScale = false,
  ticks,
}: SliderProps) {
  const id = useId();
  const displayValue = formatValue ? formatValue(value) : value.toLocaleString();

  const wrapperRef = useWheelStep<HTMLDivElement>({
    onStep: (dir) => {
      if (logScale) {
        const pos = valueToPosition(value, min, max);
        const nextPos = Math.max(0, Math.min(pos + dir * 5, INTERNAL_MAX));
        onChange(positionToValue(nextPos, min, max, step));
      } else {
        onChange(Math.max(min, Math.min(value + dir * step, max)));
      }
    },
  });

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = Number(e.target.value);
      if (logScale) {
        onChange(positionToValue(raw, min, max, step));
      } else {
        onChange(raw);
      }
    },
    [logScale, min, max, step, onChange]
  );

  const sliderMin = logScale ? 0 : min;
  const sliderMax = logScale ? INTERNAL_MAX : max;
  const sliderStep = logScale ? 1 : step;
  const sliderValue = logScale ? valueToPosition(value, min, max) : value;

  return (
    <div ref={wrapperRef} className="space-y-2">
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="text-sm font-medium text-foreground">
          {label}
        </label>
        <span className="text-sm font-semibold text-primary">{displayValue}</span>
      </div>
      <input
        id={id}
        type="range"
        min={sliderMin}
        max={sliderMax}
        step={sliderStep}
        value={sliderValue}
        onChange={handleChange}
        autoComplete="off"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-valuetext={displayValue}
        className="w-full cursor-pointer accent-primary"
      />
      {logScale && ticks && ticks.length > 0 && (
        <div className="relative h-4">
          {ticks.map((tick) => {
            const pct = tickPosition(tick.value, min, max);
            return (
              <span
                key={tick.value}
                className="absolute -translate-x-1/2 text-[10px] text-muted"
                style={{ left: `${pct}%` }}
              >
                {tick.label}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}
