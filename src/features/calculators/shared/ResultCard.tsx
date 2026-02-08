interface ResultCardProps {
  label: string;
  value: string;
  comparison?: string;
  highlight?: boolean;
}

export default function ResultCard({
  label,
  value,
  comparison,
  highlight = false,
}: ResultCardProps) {
  return (
    <div
      className={`rounded-lg border p-4 ${
        highlight
          ? "border-primary/30 bg-primary/5"
          : "border-border bg-white"
      }`}
    >
      <p className="text-sm text-muted">{label}</p>
      <p
        className={`mt-1 text-2xl font-bold ${
          highlight ? "text-primary" : "text-foreground"
        }`}
      >
        {value}
      </p>
      {comparison && (
        <p className="mt-1 text-xs text-muted">{comparison}</p>
      )}
    </div>
  );
}
