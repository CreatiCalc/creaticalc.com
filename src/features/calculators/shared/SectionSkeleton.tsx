export default function SectionSkeleton() {
  return (
    <div className="space-y-3 py-2">
      <div className="h-4 w-3/4 animate-pulse rounded bg-surface-alt" />
      <div className="h-4 w-1/2 animate-pulse rounded bg-surface-alt" />
      <div className="h-4 w-2/3 animate-pulse rounded bg-surface-alt" />
    </div>
  );
}
