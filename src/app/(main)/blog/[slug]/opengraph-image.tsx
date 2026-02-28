import { createBlogOgImageResponse, OG_SIZE } from '@/lib/ogImageFactory';
import { getAllSlugs, getPostBySlug } from '@/lib/blog';

export const alt = 'CreatiCalc Blog Post';
export const size = OG_SIZE;
export const contentType = 'image/png';

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  const title = post?.frontmatter.title ?? 'CreatiCalc Blog';
  const description = post?.frontmatter.description ?? 'Creator economy insights and guides.';
  const readingTime = post?.frontmatter.readingTime ?? 5;
  const tags = post?.frontmatter.tags ?? [];

  return createBlogOgImageResponse({ title, description, readingTime, tags });
}
