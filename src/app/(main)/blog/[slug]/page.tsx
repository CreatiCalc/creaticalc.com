import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { getAllSlugs, getPostBySlug, extractHeadings } from '@/lib/blog';
import { SITE_NAME, SITE_URL } from '@/lib/siteConfig';
import BlogPostSchema from '@/components/seo/BlogPostSchema';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import BlogPostLayout from '@/features/blog/BlogPostLayout';
import TableOfContents from '@/features/blog/TableOfContents';
import { mdxComponents } from '@/features/blog/mdxComponents';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const { title, description, date, lastModified, tags } = post.frontmatter;
  const url = `${SITE_URL}/blog/${slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url,
      type: 'article',
      publishedTime: date,
      modifiedTime: lastModified,
      tags,
      images: [
        {
          url: `${SITE_URL}/blog/${slug}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { frontmatter, content } = post;
  const wordCount = content.split(/\s+/).filter(Boolean).length;
  const headings = extractHeadings(content);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
          { name: frontmatter.title, path: `/blog/${slug}` },
        ]}
      />
      <BlogPostSchema
        title={frontmatter.title}
        description={frontmatter.description}
        slug={frontmatter.slug}
        datePublished={frontmatter.date}
        dateModified={frontmatter.lastModified}
        tags={frontmatter.tags}
        readingTime={frontmatter.readingTime}
        wordCount={wordCount}
      />
      <BlogPostLayout frontmatter={frontmatter}>
        <TableOfContents headings={headings} />
        <MDXRemote
          source={content}
          components={mdxComponents}
          options={{
            mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug] },
          }}
        />
      </BlogPostLayout>
    </>
  );
}
