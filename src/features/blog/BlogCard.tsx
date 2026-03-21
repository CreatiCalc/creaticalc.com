import Link from 'next/link';
import type { BlogPostFrontmatter } from '@/lib/blog';
import TagBadge from './TagBadge';

interface BlogCardProps {
  post: BlogPostFrontmatter;
  featured?: boolean;
}

export default function BlogCard({ post, featured }: BlogCardProps) {
  const formattedDate = new Date(`${post.date}T00:00:00`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-white transition-all hover:border-primary/40 hover:shadow-lg ${featured ? 'sm:col-span-2' : ''}`}
    >
      {/* Gradient accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-primary via-secondary to-accent" />

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex items-center gap-3 text-sm text-muted">
          {featured && (
            <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-accent">
              Featured
            </span>
          )}
          <time dateTime={post.date}>{formattedDate}</time>
          <span aria-hidden="true">&middot;</span>
          <span>{post.readingTime} min read</span>
        </div>
        <h2 className="mb-2 font-display text-lg font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
          {post.title}
        </h2>
        <p className="mb-4 flex-1 text-sm leading-relaxed text-muted">{post.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <TagBadge key={tag} tag={tag} linked={false} />
            ))}
          </div>
          <span className="inline-flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
            Read
            <svg
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
