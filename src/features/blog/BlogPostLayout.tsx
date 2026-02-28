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
      <header className="mb-8">
        <div className="mb-3 flex items-center gap-3 text-sm text-muted">
          <time dateTime={frontmatter.date}>{formattedDate}</time>
          {formattedUpdated && (
            <>
              <span aria-hidden="true">&middot;</span>
              <span>
                Updated <time dateTime={frontmatter.lastModified}>{formattedUpdated}</time>
              </span>
            </>
          )}
          <span aria-hidden="true">&middot;</span>
          <span>{frontmatter.readingTime} min read</span>
        </div>
        <h1 className="mb-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {frontmatter.title}
        </h1>
        <p className="mb-4 text-lg leading-relaxed text-muted">{frontmatter.description}</p>
        <div className="mb-6 flex flex-wrap gap-1.5">
          {frontmatter.tags.map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>
        <div className="h-px bg-gradient-to-r from-primary/40 via-secondary/20 to-transparent" />
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
