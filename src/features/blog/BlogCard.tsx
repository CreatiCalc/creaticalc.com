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
      className={`group flex flex-col rounded-2xl border border-border bg-white p-6 transition-all hover:border-primary/30 hover:shadow-md ${featured ? 'sm:col-span-2' : ''}`}
    >
      <div className="mb-3 flex items-center gap-3 text-sm text-muted">
        {featured && (
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
            Featured
          </span>
        )}
        <time dateTime={post.date}>{formattedDate}</time>
        <span aria-hidden="true">&middot;</span>
        <span>{post.readingTime} min read</span>
      </div>
      <h2 className="mb-2 font-display text-lg font-semibold text-foreground group-hover:text-primary">
        {post.title}
      </h2>
      <p className="mb-4 flex-1 text-sm leading-relaxed text-muted">{post.description}</p>
      <div className="flex flex-wrap gap-1.5">
        {post.tags.map((tag) => (
          <TagBadge key={tag} tag={tag} />
        ))}
      </div>
    </Link>
  );
}
