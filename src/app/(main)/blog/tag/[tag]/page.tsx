import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllTags, getPostsByTag, formatTagLabel } from '@/lib/blog';
import { SITE_NAME, SITE_URL } from '@/lib/siteConfig';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import BlogCard from '@/features/blog/BlogCard';

interface PageProps {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { tag } = await params;
  const posts = getPostsByTag(tag);
  if (posts.length === 0) return {};

  const label = formatTagLabel(tag);
  const title = `${label} Articles`;
  const description = `Browse ${posts.length} article${posts.length === 1 ? '' : 's'} about ${label} for content creators.`;
  const url = `${SITE_URL}/blog/tag/${tag}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url,
      type: 'website',
    },
    robots: { index: true, follow: true },
  };
}

export default async function TagPage({ params }: PageProps) {
  const { tag } = await params;
  const posts = getPostsByTag(tag);
  if (posts.length === 0) notFound();

  const label = formatTagLabel(tag);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
          { name: label, path: `/blog/tag/${tag}` },
        ]}
      />

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <Breadcrumbs
          items={[
            { name: 'Home', path: '/' },
            { name: 'Blog', path: '/blog' },
            { name: label, path: `/blog/tag/${tag}` },
          ]}
        />

        <header className="mb-10">
          <h1 className="mb-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {label}
          </h1>
          <p className="text-lg text-muted">
            {posts.length} article{posts.length === 1 ? '' : 's'} tagged with{' '}
            <span className="font-medium text-foreground">{label}</span>.
          </p>
        </header>

        <div className="grid gap-5 sm:grid-cols-2">
          {posts.map((post) => (
            <BlogCard key={post.frontmatter.slug} post={post.frontmatter} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/blog"
            className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            &larr; All articles
          </Link>
        </div>
      </div>
    </>
  );
}
