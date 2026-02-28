import { SITE_NAME, SITE_URL, SITE_LOGO } from '@/lib/siteConfig';

interface BlogPostSchemaProps {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  dateModified: string;
  tags: string[];
  readingTime: number;
  wordCount: number;
}

export default function BlogPostSchema({
  title,
  description,
  slug,
  datePublished,
  dateModified,
  tags,
  readingTime,
  wordCount,
}: BlogPostSchemaProps) {
  const url = `${SITE_URL}/blog/${slug}`;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': title,
    description,
    url,
    datePublished,
    dateModified,
    'inLanguage': 'en',
    'keywords': tags.join(', '),
    'image': `${SITE_URL}/blog/${slug}/opengraph-image`,
    'wordCount': wordCount,
    'timeRequired': `PT${readingTime}M`,
    'author': {
      '@type': 'Organization',
      'name': SITE_NAME,
      'url': SITE_URL,
      'logo': SITE_LOGO,
    },
    'publisher': {
      '@type': 'Organization',
      'name': SITE_NAME,
      'url': SITE_URL,
      'logo': {
        '@type': 'ImageObject',
        'url': SITE_LOGO,
      },
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
