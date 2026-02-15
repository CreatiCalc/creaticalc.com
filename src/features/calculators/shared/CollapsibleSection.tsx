interface CollapsibleSectionProps {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
  className?: string;
  /** "default" uses rounded-xl shadow-sm semibold; "compact" uses rounded-lg no shadow medium */
  variant?: 'default' | 'compact';
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

export default function CollapsibleSection({
  title,
  defaultOpen = false,
  children,
  className = '',
  variant = 'default',
}: CollapsibleSectionProps) {
  const styles = VARIANT_STYLES[variant];
  return (
    <details className={`group ${styles.details} ${className}`} open={defaultOpen}>
      <summary
        className={`cursor-pointer list-none ${styles.summary} transition-colors hover:text-primary [&::-webkit-details-marker]:hidden`}
      >
        <span className="inline-flex items-center gap-2">
          {title}
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
      <div className="details-content">
        <div>
          <div className={styles.content}>{children}</div>
        </div>
      </div>
    </details>
  );
}
