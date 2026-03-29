import type { BlogPostFrontmatter } from '@/lib/blog';
import Link from 'next/link';
import AdSlot from '@/components/layout/AdSlot';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import BlogShareButtons from './BlogShareButtons';
import TagBadge, { getTagAccent } from './TagBadge';
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

  const accentColor = getTagAccent(frontmatter.tags);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Breadcrumbs
        items={[
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
          { name: frontmatter.title, path: `/blog/${frontmatter.slug}` },
        ]}
      />

      {/* Header — colored left accent based on primary topic */}
      <header className={`mb-10 border-l-4 ${accentColor} pl-6 sm:pl-8`}>
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
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-light">
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
      </header>

      {/* Top ad */}
      <AdSlot slot="header" className="mb-8" />

      {/* Article content */}
      <article className="prose prose-stone max-w-none prose-headings:scroll-mt-20 [&>p:first-of-type]:text-lg [&>p:first-of-type]:leading-relaxed [&>p:first-of-type]:text-foreground">
        {children}
      </article>

      {/* Methodology attribution */}
      <p className="mt-8 border-t border-border pt-4 text-xs text-muted">
        Benchmark data comes from our aggregated research across industry reports and platform
        analytics.{' '}
        <Link href="/methodology" className="text-primary hover:text-primary-dark">
          See our methodology
        </Link>
        .
      </p>

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
