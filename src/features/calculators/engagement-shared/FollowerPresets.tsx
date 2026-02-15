'use client';

import PresetPills from '@/components/ui/PresetPills';

interface FollowerPresetsProps {
  current: number;
  onSelect: (value: number) => void;
}

const PRESETS = [
  { label: '1K', value: 1_000 },
  { label: '10K', value: 10_000 },
  { label: '50K', value: 50_000 },
  { label: '100K', value: 100_000 },
  { label: '500K', value: 500_000 },
  { label: '1M', value: 1_000_000 },
];

export default function FollowerPresets({ current, onSelect }: FollowerPresetsProps) {
  return (
    <PresetPills
      options={PRESETS}
      value={current}
      onChange={onSelect}
      ariaLabel="Quick follower presets"
    />
  );
}
