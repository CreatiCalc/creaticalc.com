import type { ReactNode } from 'react';

interface ResultCardProps {
  label: string;
  value: ReactNode;
  comparison?: ReactNode;
  highlight?: boolean;
  badge?: string;
}

export default function ResultCard({
  label,
  value,
  comparison,
  highlight = false,
  badge,
}: ResultCardProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-lg border p-4 ${
        highlight ? 'border-primary/30 bg-primary/5' : 'border-border bg-background'
      }`}
    >
      {highlight && <div className="absolute inset-x-0 top-0 h-0.5 bg-primary" />}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted">{label}</p>
        {badge && (
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
            {badge}
          </span>
        )}
      </div>
      <p className={`mt-1 text-2xl font-bold ${highlight ? 'text-primary' : 'text-foreground'}`}>
        {value}
      </p>
      {comparison && <p className="mt-1 text-xs text-muted">{comparison}</p>}
    </div>
  );
}
