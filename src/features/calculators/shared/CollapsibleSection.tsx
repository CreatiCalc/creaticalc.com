'use client';

import { useRef, useCallback } from 'react';

interface CollapsibleSectionProps {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
  className?: string;
  /** HTML id attribute — useful for anchor links */
  id?: string;
  /** "default" uses rounded-xl shadow-sm semibold; "compact" uses rounded-lg no shadow medium */
  variant?: 'default' | 'compact';
  /** Short text shown next to the title when collapsed (hidden when open) */
  preview?: string;
}

const VARIANT_STYLES = {
  default: {
    details: 'rounded-xl border border-border bg-white shadow-sm',
    summary: 'px-6 py-4 font-semibold text-foreground',
    content: 'px-6 pb-6',
  },
  compact: {
    details: 'rounded-lg border border-border bg-white',
    summary: 'px-5 py-4 font-medium text-foreground',
    content: 'px-5 pb-4',
  },
};

const DURATION = 250; // ms — must match CSS transition duration

export default function CollapsibleSection({
  title,
  defaultOpen = false,
  children,
  className = '',
  id,
  variant = 'default',
  preview,
}: CollapsibleSectionProps) {
  const styles = VARIANT_STYLES[variant];
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const animatingRef = useRef(false);

  const handleClick = useCallback((e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const details = detailsRef.current;
    const content = contentRef.current;
    if (!details || !content || animatingRef.current) return;

    animatingRef.current = true;

    /** Run `fn` exactly once — via transitionend or safety timeout, whichever fires first. */
    function onceDone(fn: () => void) {
      let called = false;
      const run = () => {
        if (called) return;
        called = true;
        content!.removeEventListener('transitionend', run);
        fn();
      };
      content!.addEventListener('transitionend', run, { once: true });
      setTimeout(run, DURATION + 50);
    }

    if (details.open) {
      // Animate close: override to 0fr, then remove open when done
      content.style.gridTemplateRows = '0fr';
      onceDone(() => {
        details.removeAttribute('open');
        content.style.gridTemplateRows = '';
        animatingRef.current = false;
      });
    } else {
      // Open: set open attr, force 0fr, reflow, then animate to 1fr
      details.setAttribute('open', '');
      content.style.gridTemplateRows = '0fr';
      content.getBoundingClientRect(); // force reflow
      content.style.gridTemplateRows = '1fr';
      onceDone(() => {
        content.style.gridTemplateRows = '';
        animatingRef.current = false;
      });
    }
  }, []);

  return (
    <details
      ref={detailsRef}
      id={id}
      className={`group ${styles.details} ${className}`}
      open={defaultOpen}
    >
      <summary
        onClick={handleClick}
        className={`cursor-pointer list-none ${styles.summary} transition-colors hover:text-primary [&::-webkit-details-marker]:hidden`}
      >
        <span className="inline-flex items-center gap-2">
          {title}
          {preview && (
            <span className="text-xs font-normal text-muted transition-opacity group-open:opacity-0">
              — {preview}
            </span>
          )}
          <svg
            className="h-4 w-4 transition-transform group-open:rotate-180"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </summary>
      <div ref={contentRef} className="details-content">
        <div>
          <div className={styles.content}>{children}</div>
        </div>
      </div>
    </details>
  );
}
