'use client';

import type { TwitterCalcMethod } from '@/lib/engagementModel';
import CalcMethodToggle from '@/features/calculators/shared/CalcMethodToggle';

const OPTIONS: { mode: TwitterCalcMethod; label: string; description: string }[] = [
  { mode: 'byFollowers', label: 'By Followers', description: 'interactions / followers' },
  { mode: 'byImpressions', label: 'By Impressions', description: 'interactions / impressions' },
];

interface Props {
  value: TwitterCalcMethod;
  onChange: (method: TwitterCalcMethod) => void;
}

export default function TwitterCalcMethodToggle({ value, onChange }: Props) {
  return <CalcMethodToggle value={value} onChange={onChange} options={OPTIONS} />;
}
