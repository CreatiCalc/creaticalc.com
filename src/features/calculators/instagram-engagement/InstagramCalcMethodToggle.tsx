'use client';

import type { InstagramCalcMethod } from '@/lib/engagementModel';
import CalcMethodToggle from '@/features/calculators/shared/CalcMethodToggle';

const OPTIONS: { mode: InstagramCalcMethod; label: string; description: string }[] = [
  { mode: 'byFollowers', label: 'By Followers', description: 'interactions / followers' },
  { mode: 'byReach', label: 'By Reach', description: 'interactions / reach' },
  { mode: 'byImpressions', label: 'By Impressions', description: 'interactions / impressions' },
];

interface Props {
  value: InstagramCalcMethod;
  onChange: (method: InstagramCalcMethod) => void;
}

export default function InstagramCalcMethodToggle({ value, onChange }: Props) {
  return <CalcMethodToggle value={value} onChange={onChange} options={OPTIONS} wrap />;
}
