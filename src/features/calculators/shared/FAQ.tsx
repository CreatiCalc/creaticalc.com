import type { FAQItem } from './types';
import CollapsibleSection from './CollapsibleSection';

interface FAQProps {
  items: FAQItem[];
}

export default function FAQ({ items }: FAQProps) {
  return (
    <section className="mt-12">
      <h2 className="mb-6 text-2xl font-bold">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {items.map((item, i) => (
          <CollapsibleSection key={i} title={item.question} variant="compact">
            <div className="text-sm leading-relaxed text-muted">{item.answer}</div>
          </CollapsibleSection>
        ))}
      </div>
    </section>
  );
}
