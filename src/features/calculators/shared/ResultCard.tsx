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
      className={`relative overflow-hidden rounded-xl border p-5 transition-shadow ${
        highlight
          ? 'border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10 shadow-sm'
          : 'border-border bg-background'
      }`}
    >
      {highlight && (
        <div
          className="absolute inset-x-0 top-0 h-1"
          style={{ background: 'var(--gradient-brand)' }}
        />
      )}
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted">{label}</p>
        {badge && (
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
            {badge}
          </span>
        )}
      </div>
      <p
        className={`mt-2 font-mono text-3xl font-bold tracking-tight ${highlight ? 'text-primary' : 'text-foreground'}`}
        aria-live="polite"
        aria-atomic="true"
      >
        {value}
      </p>
      {comparison && <p className="mt-2 text-xs text-muted">{comparison}</p>}
    </div>
  );
}
