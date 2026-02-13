'use client';

import Card from '@/components/ui/Card';
import { formatPercent, type MultiFormulaResult } from '@/lib/engagementModel';

interface MultiFormulaDisplayProps {
  results: MultiFormulaResult;
}

export default function MultiFormulaDisplay({ results }: MultiFormulaDisplayProps) {
  const methods = [
    {
      label: 'By Followers',
      value: results.byFollowers,
      formula: 'interactions / followers',
      note: 'Industry standard',
    },
    {
      label: 'By Reach',
      value: results.byReach,
      formula: 'interactions / reach',
      note: 'Content performance',
    },
    {
      label: 'By Impressions',
      value: results.byImpressions,
      formula: 'interactions / impressions',
      note: 'Visibility efficiency',
    },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {methods.map((m) => (
        <Card key={m.label} className="text-center">
          <p className="text-xs font-medium text-muted">{m.label}</p>
          <p className="mt-1 text-2xl font-bold text-foreground">
            {m.value !== null ? formatPercent(m.value) : '—'}
          </p>
          <p className="mt-1 text-xs text-muted">{m.formula}</p>
          {m.value !== null ? (
            <p className="mt-0.5 text-xs text-primary">{m.note}</p>
          ) : (
            <p className="mt-0.5 text-xs text-muted">Enter data above</p>
          )}
        </Card>
      ))}
    </div>
  );
}
