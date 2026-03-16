import { SITE_URL } from '@/lib/siteConfig';

export interface ItemListEntry {
  name: string;
  /** Absolute URL or relative path (prefixed with SITE_URL). */
  url: string;
  description?: string;
}

interface ItemListSchemaProps {
  items: ItemListEntry[];
}

export default function ItemListSchema({ items }: ItemListSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'item': {
        '@type': 'WebApplication',
        'name': item.name,
        'url': item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
        'applicationCategory': 'UtilitiesApplication',
        'operatingSystem': 'Any',
        'offers': {
          '@type': 'Offer',
          'price': '0',
          'priceCurrency': 'USD',
        },
        ...(item.description ? { description: item.description } : {}),
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
