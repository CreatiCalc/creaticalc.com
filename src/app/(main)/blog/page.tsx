import type { Metadata } from 'next';
import { getAllPosts } from '@/lib/blog';
import { SITE_NAME, SITE_URL } from '@/lib/siteConfig';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import BlogCard from '@/features/blog/BlogCard';

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
  const featuredPosts = posts.filter((p) => p.frontmatter.featured);
  const otherPosts = posts.filter((p) => !p.frontmatter.featured);

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

        {/* Hero */}
        <header className="mb-10">
          <h1 className="mb-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Creator Economy Insights & Guides
          </h1>
          <p className="text-lg text-muted">
            Data-driven articles on YouTube earnings, sponsorship rates, engagement benchmarks, and
            monetization strategies for content creators.
          </p>
        </header>

        {/* Featured posts */}
        {featuredPosts.length > 0 && (
          <>
            <div className="grid gap-5 sm:grid-cols-2">
              {featuredPosts.map((post) => (
                <BlogCard key={post.frontmatter.slug} post={post.frontmatter} featured />
              ))}
            </div>
            <hr className="my-8 border-border" />
          </>
        )}

        {/* All other posts */}
        <h2 className="mb-5 font-display text-xl font-semibold text-foreground">Latest Articles</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          {otherPosts.map((post) => (
            <BlogCard key={post.frontmatter.slug} post={post.frontmatter} />
          ))}
        </div>
      </div>
    </>
  );
}
