import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { getAllSlugs, getPostBySlug } from '@/lib/blog';
import { SITE_NAME, SITE_URL } from '@/lib/siteConfig';
import BlogPostSchema from '@/components/seo/BlogPostSchema';
import BlogPostLayout from '@/features/blog/BlogPostLayout';
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
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { frontmatter, content } = post;

  return (
    <>
      <BlogPostSchema
        title={frontmatter.title}
        description={frontmatter.description}
        slug={frontmatter.slug}
        datePublished={frontmatter.date}
        dateModified={frontmatter.lastModified}
        tags={frontmatter.tags}
      />
      <BlogPostLayout frontmatter={frontmatter}>
        <MDXRemote
          source={content}
          components={mdxComponents}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        />
      </BlogPostLayout>
    </>
  );
}
