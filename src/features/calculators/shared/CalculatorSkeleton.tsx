/**
 * Lightweight skeleton shown as Suspense fallback while calculator JS hydrates.
 * Mirrors the layout of input card + result cards so the page doesn't shift on load.
 */
export default function CalculatorSkeleton() {
  return (
    <div className="space-y-6" aria-busy="true" aria-label="Loading calculator…">
      {/* Input card skeleton */}
      <div className="rounded-xl border border-border bg-white p-6">
        <div className="space-y-4">
          <div className="h-5 w-40 animate-pulse rounded bg-surface-alt" />
          <div className="h-10 w-full animate-pulse rounded-lg bg-surface-alt" />
          <div className="h-5 w-32 animate-pulse rounded bg-surface-alt" />
          <div className="h-10 w-full animate-pulse rounded-lg bg-surface-alt" />
        </div>
      </div>

      {/* Result cards skeleton (3-column grid on desktop, single on mobile) */}
      <div className="grid gap-4 sm:grid-cols-3">
        {Array.from({ length: 3 }, (_, i) => (
          <div key={i} className="rounded-xl border border-border bg-background p-5">
            <div className="h-4 w-20 animate-pulse rounded bg-surface-alt" />
            <div className="mt-3 h-8 w-28 animate-pulse rounded bg-surface-alt" />
          </div>
        ))}
      </div>
    </div>
  );
}
