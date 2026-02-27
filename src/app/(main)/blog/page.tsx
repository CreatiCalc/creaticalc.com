import type { Metadata } from 'next';
import { getAllPosts } from '@/lib/blog';
import { SITE_NAME, SITE_URL } from '@/lib/siteConfig';
import BlogCard from '@/features/blog/BlogCard';
import Link from 'next/link';

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

  return (
    <>
      {CollectionPageSchema(posts.map((p) => p.frontmatter))}

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted">
          <ol className="flex items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-primary">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-foreground">Blog</li>
          </ol>
        </nav>

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

        {/* Post grid — newest first, featured posts span 2 columns */}
        <div className="grid gap-5 sm:grid-cols-2">
          {posts.map((post) => (
            <BlogCard
              key={post.frontmatter.slug}
              post={post.frontmatter}
              featured={post.frontmatter.featured}
            />
          ))}
        </div>
      </div>
    </>
  );
}
