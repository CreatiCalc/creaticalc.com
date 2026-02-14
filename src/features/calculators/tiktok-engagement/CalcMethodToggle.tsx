'use client';

import type { TikTokCalcMethod } from '@/lib/engagementModel';
import CalcMethodToggle from '@/features/calculators/shared/CalcMethodToggle';

const OPTIONS: { mode: TikTokCalcMethod; label: string; description: string }[] = [
  { mode: 'byFollowers', label: 'By Followers', description: 'interactions / followers' },
  { mode: 'byViews', label: 'By Views', description: 'interactions / views' },
];

interface Props {
  value: TikTokCalcMethod;
  onChange: (method: TikTokCalcMethod) => void;
}

export default function TikTokCalcMethodToggle({ value, onChange }: Props) {
  return <CalcMethodToggle value={value} onChange={onChange} options={OPTIONS} />;
}
