'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled error:', error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mx-auto max-w-2xl px-4 py-12 text-center">
        <p className="text-gradient-brand text-6xl font-bold">Oops</p>
        <h2 className="mt-4 text-2xl font-bold">Something went wrong</h2>
        <p className="mt-3 text-muted">An unexpected error occurred. Please try again.</p>

        <div className="mt-10 flex justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <Link
            href="/"
            className="rounded-lg border border-border px-6 py-2.5 text-sm font-medium text-muted transition-colors hover:border-primary hover:text-primary"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
