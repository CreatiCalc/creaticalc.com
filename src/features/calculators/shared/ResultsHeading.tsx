interface ResultsHeadingProps {
  /** Override the default "Your Results" heading */
  title?: string;
}

export default function ResultsHeading({ title = 'Your Results' }: ResultsHeadingProps) {
  return (
    <div className="mt-8 mb-4 flex items-center gap-3">
      <div className="h-px flex-1 bg-border" />
      <h2 className="shrink-0 text-sm font-semibold tracking-wide text-muted uppercase">{title}</h2>
      <div className="h-px flex-1 bg-border" />
    </div>
  );
}
