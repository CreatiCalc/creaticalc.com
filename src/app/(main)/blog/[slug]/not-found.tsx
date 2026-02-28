import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';

export default function BlogNotFound() {
  const recentPosts = getAllPosts().slice(0, 4);

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center">
      <p className="text-gradient-brand text-5xl font-bold">404</p>
      <h1 className="mt-4 text-2xl font-bold">Article Not Found</h1>
      <p className="mt-3 text-muted">This blog post doesn&apos;t exist or may have been moved.</p>

      {recentPosts.length > 0 && (
        <div className="mt-10">
          <h2 className="mb-4 text-lg font-semibold">Recent articles</h2>
          <div className="grid gap-3 text-left sm:grid-cols-2">
            {recentPosts.map((post) => (
              <Link
                key={post.frontmatter.slug}
                href={`/blog/${post.frontmatter.slug}`}
                className="rounded-lg border border-border bg-white px-4 py-3 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
              >
                {post.frontmatter.title}
              </Link>
            ))}
          </div>
        </div>
      )}

      <Link
        href="/blog"
        className="mt-10 inline-block rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary/90"
      >
        Browse All Articles
      </Link>
    </div>
  );
}
