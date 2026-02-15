import type { FAQItem } from './types';
import CollapsibleSection from './CollapsibleSection';

interface FAQProps {
  items: FAQItem[];
}

export default function FAQ({ items }: FAQProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': items.map((item) => ({
      '@type': 'Question',
      'name': item.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': item.answer,
      },
    })),
  };

  return (
    <section className="mt-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <h2 className="mb-6 text-2xl font-bold">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {items.map((item, i) => (
          <CollapsibleSection key={i} title={item.question} variant="compact">
            <p className="text-sm leading-relaxed text-muted">{item.answer}</p>
          </CollapsibleSection>
        ))}
      </div>
    </section>
  );
}
