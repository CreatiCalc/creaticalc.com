interface ResultsHeadingProps {
  /** Override the default "Your Results" heading */
  title?: string;
  /** Optional trust/freshness note shown below the heading */
  subtitle?: string;
}

export default function ResultsHeading({ title = 'Your Results', subtitle }: ResultsHeadingProps) {
  return (
    <div className="mt-8 mb-4">
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <h2 className="shrink-0 text-sm font-semibold tracking-wide text-muted uppercase">
          {title}
        </h2>
        <div className="h-px flex-1 bg-border" />
      </div>
      {subtitle && <p className="mt-1 text-center text-xs text-muted">{subtitle}</p>}
    </div>
  );
}
