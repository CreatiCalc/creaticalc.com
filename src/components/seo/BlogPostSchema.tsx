import { SITE_NAME, SITE_URL } from '@/lib/siteConfig';

interface BlogPostSchemaProps {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  dateModified: string;
  tags: string[];
}

export default function BlogPostSchema({
  title,
  description,
  slug,
  datePublished,
  dateModified,
  tags,
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
    'author': { '@id': `${SITE_URL}/#organization` },
    'publisher': {
      '@type': 'Organization',
      'name': SITE_NAME,
      'url': SITE_URL,
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
