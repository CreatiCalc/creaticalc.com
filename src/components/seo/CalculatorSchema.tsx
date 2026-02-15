import { SITE_NAME, SITE_URL } from '@/lib/siteConfig';

interface CalculatorSchemaProps {
  name: string;
  description: string;
  /** Absolute URL or relative path (e.g. "/youtube-money-calculator"). Paths are prefixed with SITE_URL. */
  url: string;
  datePublished?: string;
  dateModified?: string;
}

export default function CalculatorSchema({
  name,
  description,
  url,
  datePublished,
  dateModified,
}: CalculatorSchemaProps) {
  const fullUrl = url.startsWith('http') ? url : `${SITE_URL}${url}`;
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name,
    description,
    'url': fullUrl,
    'applicationCategory': 'UtilitiesApplication',
    'operatingSystem': 'Any',
    'inLanguage': 'en',
    'author': {
      '@type': 'Organization',
      'name': SITE_NAME,
      'url': SITE_URL,
    },
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD',
    },
    'potentialAction': {
      '@type': 'UseAction',
      'target': fullUrl,
    },
  };

  if (datePublished) schema.datePublished = datePublished;
  if (dateModified) schema.dateModified = dateModified;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
