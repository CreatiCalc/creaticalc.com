import type { TocHeading } from '@/lib/blog';

interface TableOfContentsProps {
  headings: TocHeading[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  if (headings.length < 3) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="mb-8 rounded-lg border border-border bg-surface-alt p-5"
    >
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted">
        In this article
      </h2>
      <ol className="space-y-1.5 text-sm">
        {headings.map((h) => (
          <li key={h.id} className={h.level === 3 ? 'ml-4' : ''}>
            <a href={`#${h.id}`} className="text-muted transition-colors hover:text-primary">
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
