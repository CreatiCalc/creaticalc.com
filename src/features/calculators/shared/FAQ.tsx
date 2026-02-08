import type { FAQItem } from "./types";

interface FAQProps {
  items: FAQItem[];
}

export default function FAQ({ items }: FAQProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
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
          <details
            key={i}
            className="group rounded-lg border border-border bg-white"
          >
            <summary className="cursor-pointer px-5 py-4 font-medium transition-colors hover:text-primary">
              {item.question}
            </summary>
            <p className="px-5 pb-4 text-sm leading-relaxed text-muted">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
