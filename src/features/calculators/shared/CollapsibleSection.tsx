interface CollapsibleSectionProps {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
  className?: string;
}

export default function CollapsibleSection({
  title,
  defaultOpen = false,
  children,
  className = '',
}: CollapsibleSectionProps) {
  return (
    <details
      className={`group rounded-xl border border-border bg-white shadow-sm ${className}`}
      open={defaultOpen}
    >
      <summary className="cursor-pointer list-none px-6 py-4 font-semibold text-foreground transition-colors hover:text-primary [&::-webkit-details-marker]:hidden">
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
      <div className="px-6 pb-6">{children}</div>
    </details>
  );
}
