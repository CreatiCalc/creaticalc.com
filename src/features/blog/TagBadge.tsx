interface TagBadgeProps {
  tag: string;
}

export default function TagBadge({ tag }: TagBadgeProps) {
  return (
    <span className="inline-block rounded-full bg-surface-alt px-2.5 py-0.5 text-xs font-medium text-muted">
      {tag}
    </span>
  );
}
