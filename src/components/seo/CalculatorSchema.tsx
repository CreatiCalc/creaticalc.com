import { SITE_URL } from '@/lib/siteConfig';

interface CalculatorSchemaProps {
  name: string;
  description: string;
  /** Absolute URL or relative path (e.g. "/youtube-money-calculator"). Paths are prefixed with SITE_URL. */
  url: string;
}

export default function CalculatorSchema({ name, description, url }: CalculatorSchemaProps) {
  const fullUrl = url.startsWith('http') ? url : `${SITE_URL}${url}`;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name,
    description,
    'url': fullUrl,
    'applicationCategory': 'UtilitiesApplication',
    'operatingSystem': 'Any',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
