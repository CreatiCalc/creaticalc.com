import type { BlogPostFrontmatter } from '@/lib/blog';
import AdSlot from '@/components/layout/AdSlot';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import BlogShareButtons from './BlogShareButtons';
import TagBadge from './TagBadge';
import RelatedCalculators from './RelatedCalculators';
import RelatedPosts from './RelatedPosts';

interface BlogPostLayoutProps {
  frontmatter: BlogPostFrontmatter;
  children: React.ReactNode;
}

export default function BlogPostLayout({ frontmatter, children }: BlogPostLayoutProps) {
  const formattedDate = new Date(`${frontmatter.date}T00:00:00`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const wasUpdated = frontmatter.lastModified !== frontmatter.date;
  const formattedUpdated = wasUpdated
    ? new Date(`${frontmatter.lastModified}T00:00:00`).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Breadcrumbs
        items={[
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
          { name: frontmatter.title, path: `/blog/${frontmatter.slug}` },
        ]}
      />

      {/* Hero */}
      <header className="relative mb-10 overflow-hidden rounded-2xl bg-gradient-to-br from-primary/[0.07] via-secondary/[0.04] to-accent/[0.06] px-6 py-8 sm:px-8 sm:py-10">
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/[0.06] blur-3xl" />
        <div className="absolute -bottom-12 -left-12 h-36 w-36 rounded-full bg-accent/[0.08] blur-3xl" />
        <div className="relative">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            {frontmatter.tags.map((tag) => (
              <TagBadge key={tag} tag={tag} />
            ))}
          </div>
          <h1 className="mb-4 font-display text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
            {frontmatter.title}
          </h1>
          <p className="mb-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {frontmatter.description}
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted">
            <span className="inline-flex items-center gap-1.5">
              <svg
                className="h-4 w-4 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <time dateTime={frontmatter.date}>{formattedDate}</time>
            </span>
            {formattedUpdated && (
              <span className="inline-flex items-center gap-1.5">
                <svg
                  className="h-4 w-4 text-accent"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Updated <time dateTime={frontmatter.lastModified}>{formattedUpdated}</time>
              </span>
            )}
            <span className="inline-flex items-center gap-1.5">
              <svg
                className="h-4 w-4 text-secondary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {frontmatter.readingTime} min read
            </span>
          </div>
        </div>
      </header>

      {/* Top ad */}
      <AdSlot slot="header" className="mb-8" />

      {/* Article content */}
      <article className="prose prose-stone max-w-none prose-headings:scroll-mt-20">
        {children}
      </article>

      {/* Share */}
      <BlogShareButtons slug={frontmatter.slug} title={frontmatter.title} />

      {/* Bottom ad */}
      <AdSlot slot="below-results" className="mt-8" />

      {/* Related sections */}
      <RelatedCalculators tags={frontmatter.tags} />
      <RelatedPosts currentSlug={frontmatter.slug} tags={frontmatter.tags} />
    </div>
  );
}
