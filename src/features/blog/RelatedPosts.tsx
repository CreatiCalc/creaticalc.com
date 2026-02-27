import Link from 'next/link';
import type { BlogPostFrontmatter } from '@/lib/blog';
import { getAllPosts } from '@/lib/blog';

interface RelatedPostsProps {
  currentSlug: string;
  tags: string[];
}

export default function RelatedPosts({ currentSlug, tags }: RelatedPostsProps) {
  const allPosts = getAllPosts();

  const scored = allPosts
    .filter((p) => p.frontmatter.slug !== currentSlug)
    .map((p) => {
      const overlap = p.frontmatter.tags.filter((t) => tags.includes(t)).length;
      return { post: p.frontmatter, overlap };
    })
    .filter((s) => s.overlap > 0)
    .sort((a, b) => b.overlap - a.overlap)
    .slice(0, 3);

  if (scored.length === 0) return null;

  return (
    <section className="mt-8">
      <h2 className="mb-4 font-display text-lg font-semibold text-foreground">Related Articles</h2>
      <div className="grid gap-3 sm:grid-cols-3">
        {scored.map(({ post }: { post: BlogPostFrontmatter }) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="rounded-xl border border-border bg-white p-4 transition-colors hover:border-primary/30"
          >
            <p className="mb-1 text-sm font-medium text-foreground">{post.title}</p>
            <p className="text-xs text-muted">{post.readingTime} min read</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
