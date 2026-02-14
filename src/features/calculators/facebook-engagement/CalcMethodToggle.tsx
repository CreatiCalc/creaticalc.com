'use client';

import type { FacebookCalcMethod } from '@/lib/engagementModel';
import CalcMethodToggle from '@/features/calculators/shared/CalcMethodToggle';

const OPTIONS: { mode: FacebookCalcMethod; label: string; description: string }[] = [
  { mode: 'byFollowers', label: 'By Page Followers', description: 'interactions / followers' },
  { mode: 'byReach', label: 'By Post Reach', description: 'interactions / reach' },
];

interface Props {
  value: FacebookCalcMethod;
  onChange: (method: FacebookCalcMethod) => void;
}

export default function FacebookCalcMethodToggle({ value, onChange }: Props) {
  return <CalcMethodToggle value={value} onChange={onChange} options={OPTIONS} />;
}
