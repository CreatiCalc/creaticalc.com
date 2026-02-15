'use client';

import Slider from '@/components/ui/Slider';
import NumberInput from '@/components/ui/NumberInput';
import FollowerPresets from '@/features/calculators/engagement-shared/FollowerPresets';

const FOLLOWER_TICKS = [
  { value: 1000, label: '1K' },
  { value: 10000, label: '10K' },
  { value: 100000, label: '100K' },
  { value: 1000000, label: '1M' },
];

interface FollowerSliderInputProps {
  value: number;
  onChange: (value: number) => void;
  max?: number;
  label?: string;
}

function getTierHint(followers: number): string {
  if (followers >= 1_000_000) return 'Mega creator (1M+)';
  if (followers >= 100_000) return 'Macro creator (100K–1M)';
  if (followers >= 50_000) return 'Mid-tier creator (50K–100K)';
  if (followers >= 10_000) return 'Micro creator (10K–50K)';
  if (followers >= 1_000) return 'Nano creator (1K–10K)';
  return 'Growing account (<1K)';
}

export default function FollowerSliderInput({
  value,
  onChange,
  max = 5_000_000,
  label = 'Followers',
}: FollowerSliderInputProps) {
  return (
    <>
      <FollowerPresets current={value} onSelect={onChange} />
      <div className="grid gap-4 sm:grid-cols-2">
        <Slider
          label={label}
          value={value}
          min={100}
          max={max}
          step={100}
          logScale
          ticks={FOLLOWER_TICKS}
          onChange={onChange}
          formatValue={(v) => v.toLocaleString()}
        />
        <NumberInput
          label="Or enter exact follower count"
          value={value}
          min={0}
          max={max}
          step={100}
          onChange={(v) => onChange(Math.max(0, Math.min(v, max)))}
        />
      </div>
      <p className="mt-1 text-xs text-muted">{getTierHint(value)}</p>
    </>
  );
}
