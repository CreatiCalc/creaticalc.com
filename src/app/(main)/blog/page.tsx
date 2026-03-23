import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';
import { SITE_NAME, SITE_URL } from '@/lib/siteConfig';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import BlogCard from '@/features/blog/BlogCard';
import TagBadge from '@/features/blog/TagBadge';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Blog — Creator Economy Insights & Guides',
  description:
    'Data-driven guides on YouTube earnings, Instagram sponsorship rates, TikTok monetization, and engagement benchmarks for content creators.',
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title: `Blog — Creator Economy Insights & Guides | ${SITE_NAME}`,
    description:
      'Data-driven guides on YouTube earnings, Instagram sponsorship rates, TikTok monetization, and engagement benchmarks for content creators.',
    url: `${SITE_URL}/blog`,
    type: 'website',
  },
};

function CollectionPageSchema(posts: { title: string; slug: string }[]) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    'name': 'CreatiCalc Blog',
    'description': 'Creator economy insights and guides',
    'url': `${SITE_URL}/blog`,
    'publisher': {
      '@type': 'Organization',
      'name': SITE_NAME,
      'url': SITE_URL,
    },
    'mainEntity': {
      '@type': 'ItemList',
      'itemListElement': posts.map((p, i) => ({
        '@type': 'ListItem',
        'position': i + 1,
        'url': `${SITE_URL}/blog/${p.slug}`,
        'name': p.title,
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function BlogPage() {
  const posts = getAllPosts();
  const leadPost = posts[0];
  const gridPosts = posts.slice(1);

  const leadDate = leadPost
    ? new Date(`${leadPost.frontmatter.date}T00:00:00`).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : '';

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
        ]}
      />
      {CollectionPageSchema(posts.map((p) => p.frontmatter))}

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <Breadcrumbs
          items={[
            { name: 'Home', path: '/' },
            { name: 'Blog', path: '/blog' },
          ]}
        />

        {/* Header */}
        <header className="mb-10 pb-8">
          <h1 className="mb-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Creator Economy Insights & Guides
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Real numbers, real data. Sponsorship rates, CPM benchmarks, and monetization strategies
            that actually help you earn more as a creator.
          </p>
        </header>

        {/* Lead story */}
        {leadPost && (
          <Link
            href={`/blog/${leadPost.frontmatter.slug}`}
            className="group mb-12 block rounded-xl bg-surface p-6 ring-1 ring-border/50 transition-all duration-200 hover:shadow-md hover:ring-primary/40 sm:p-8"
          >
            <div className="mb-3 flex flex-wrap gap-1.5">
              {leadPost.frontmatter.tags.slice(0, 3).map((tag: string) => (
                <TagBadge key={tag} tag={tag} linked={false} />
              ))}
            </div>
            <h2 className="mb-3 font-display text-2xl font-bold leading-tight text-foreground transition-colors group-hover:text-primary sm:text-3xl">
              {leadPost.frontmatter.title}
            </h2>
            <p className="mb-4 max-w-2xl text-base leading-relaxed text-muted">
              {leadPost.frontmatter.description}
            </p>
            <div className="text-sm text-muted-light">
              <time dateTime={leadPost.frontmatter.date}>{leadDate}</time>
              <span className="mx-2" aria-hidden="true">
                &middot;
              </span>
              <span>{leadPost.frontmatter.readingTime} min read</span>
            </div>
          </Link>
        )}

        {/* All articles */}
        <h2 className="mb-6 font-display text-lg font-semibold text-foreground">More Articles</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          {gridPosts.map((post) => (
            <BlogCard key={post.frontmatter.slug} post={post.frontmatter} />
          ))}
        </div>
      </div>
    </>
  );
}
