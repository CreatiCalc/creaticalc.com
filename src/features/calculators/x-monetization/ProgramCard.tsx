import type { ProgramEligibility, RequirementCheck } from '@/lib/xMonetizationModel';

// ---------------------------------------------------------------------------
// Progress bar for numeric requirements
// ---------------------------------------------------------------------------

function ProgressBar({ current, target }: { current: number; target: number }) {
  const pct = Math.min((current / target) * 100, 100);
  const met = current >= target;

  const formatNum = (n: number) => {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
    return n.toLocaleString();
  };

  return (
    <div className="mt-1.5">
      <div className="flex items-center justify-between text-xs text-muted">
        <span>{formatNum(current)}</span>
        <span>{formatNum(target)}</span>
      </div>
      <div className="mt-0.5 h-1.5 w-full overflow-hidden rounded-full bg-stone-200">
        <div
          className={`h-full rounded-full transition-all ${met ? 'bg-emerald-500' : 'bg-amber-500'}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Single requirement row
// ---------------------------------------------------------------------------

function RequirementRow({ req }: { req: RequirementCheck }) {
  return (
    <div className="flex items-start gap-2.5 py-1.5">
      <span className="mt-0.5 flex-shrink-0" aria-hidden="true">
        {req.met ? (
          <svg className="h-4 w-4 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg className="h-4 w-4 text-red-400" viewBox="0 0 20 20" fill="currentColor">
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
        )}
      </span>
      <div className="min-w-0 flex-1">
        <span className={`text-sm ${req.met ? 'text-foreground' : 'text-foreground'}`}>
          {req.label}
        </span>
        {req.helpText && <p className="mt-0.5 text-xs text-muted">{req.helpText}</p>}
        {req.current !== undefined && req.target !== undefined && !req.met && (
          <ProgressBar current={req.current} target={req.target} />
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Program card
// ---------------------------------------------------------------------------

interface ProgramCardProps {
  program: ProgramEligibility;
}

function formatEarnings(low: number, high: number): string {
  const fmt = (n: number) => {
    if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}K`;
    return `$${n}`;
  };
  return `${fmt(low)} – ${fmt(high)}/mo`;
}

export default function ProgramCard({ program }: ProgramCardProps) {
  const metCount = program.requirements.filter((r) => r.met).length;
  const totalReqs = program.requirements.length;

  return (
    <div
      className={`overflow-hidden rounded-xl border transition-shadow ${
        program.eligible
          ? 'border-emerald-200 bg-emerald-50/50 shadow-sm'
          : 'border-border bg-background'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/50 px-5 py-3.5">
        <h3 className="font-semibold text-foreground">{program.programName}</h3>
        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
            program.eligible ? 'bg-emerald-100 text-emerald-700' : 'bg-stone-100 text-stone-600'
          }`}
        >
          {program.eligible ? 'Eligible' : `${metCount}/${totalReqs} met`}
        </span>
      </div>

      {/* Body */}
      <div className="px-5 py-4">
        <p className="text-sm text-muted">{program.description}</p>

        <div className="mt-4 space-y-0.5">
          {program.requirements.map((req, i) => (
            <RequirementRow key={i} req={req} />
          ))}
        </div>

        {/* Estimated earnings */}
        {program.estimatedMonthlyEarnings && (
          <div className="mt-4 rounded-lg bg-primary/5 px-4 py-2.5">
            <p className="text-xs font-medium text-muted">Estimated monthly earnings</p>
            <p className="font-mono text-sm font-bold text-primary">
              {formatEarnings(
                program.estimatedMonthlyEarnings.low,
                program.estimatedMonthlyEarnings.high
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
