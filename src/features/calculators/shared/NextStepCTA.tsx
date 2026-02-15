import Link from 'next/link';
import { getRelatedCalculators } from '@/lib/calculatorRegistry';

interface NextStepCTAProps {
  /** The slug of the current calculator (used to look up related calculators). */
  currentSlug: string;
}

export default function NextStepCTA({ currentSlug }: NextStepCTAProps) {
  const related = getRelatedCalculators(currentSlug);
  if (related.length === 0) return null;

  return (
    <div className="mt-8 rounded-xl border border-border bg-surface p-6">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">Next Step</h3>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {related.map((calc) => (
          <Link
            key={calc.href}
            href={calc.href}
            className="group flex items-center gap-3 rounded-lg border border-border bg-white px-4 py-3 transition-all hover:border-primary/50 hover:shadow-sm"
          >
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-foreground transition-colors group-hover:text-primary">
                {calc.cardTitle}
              </p>
              <p className="mt-0.5 truncate text-xs text-muted">{calc.description}</p>
            </div>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="shrink-0 text-muted transition-all group-hover:translate-x-0.5 group-hover:text-primary"
              aria-hidden="true"
            >
              <path d="M1 8h14M9 2l6 6-6 6" />
            </svg>
          </Link>
        ))}
      </div>
    </div>
  );
}
