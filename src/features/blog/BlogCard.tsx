import Link from 'next/link';
import type { BlogPostFrontmatter } from '@/lib/blog';
import TagBadge from './TagBadge';

interface BlogCardProps {
  post: BlogPostFrontmatter;
}

export default function BlogCard({ post }: BlogCardProps) {
  const formattedDate = new Date(`${post.date}T00:00:00`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col rounded-xl bg-white p-5 shadow-sm ring-1 ring-border/50 transition-all duration-200 hover:shadow-md hover:ring-primary/40"
    >
      <div className="mb-3 flex flex-wrap gap-1.5">
        {post.tags.slice(0, 3).map((tag) => (
          <TagBadge key={tag} tag={tag} linked={false} />
        ))}
      </div>
      <h2 className="mb-2 font-display text-[0.95rem] font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
        {post.title}
      </h2>
      <p className="mb-3 flex-1 text-sm leading-relaxed text-muted line-clamp-2">
        {post.description}
      </p>
      <div className="text-xs text-muted-light">
        <time dateTime={post.date}>{formattedDate}</time>
        <span className="mx-1.5" aria-hidden="true">
          &middot;
        </span>
        <span>{post.readingTime} min read</span>
      </div>
    </Link>
  );
}
