interface AdSlotProps {
  slot: "header" | "sidebar" | "below-results";
  className?: string;
}

export default function AdSlot({ slot, className = "" }: AdSlotProps) {
  return (
    <div
      className={`flex items-center justify-center rounded-lg border border-dashed border-border bg-surface-alt text-sm text-muted ${className}`}
      data-ad-slot={slot}
    >
      <span className="px-4 py-3">Ad Space</span>
    </div>
  );
}
