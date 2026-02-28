import Link from 'next/link';

interface TagBadgeProps {
  tag: string;
  linked?: boolean;
}

export default function TagBadge({ tag, linked = true }: TagBadgeProps) {
  const className =
    'inline-block rounded-full bg-surface-alt px-2.5 py-0.5 text-xs font-medium text-muted transition-colors hover:bg-primary/10 hover:text-primary';

  if (!linked) {
    return <span className={className}>{tag}</span>;
  }

  return (
    <Link href={`/blog/tag/${tag}`} className={className}>
      {tag}
    </Link>
  );
}
