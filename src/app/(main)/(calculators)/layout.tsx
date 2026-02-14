import Link from 'next/link';
import { getAllCalculators } from '@/lib/calculatorRegistry';

const relatedTools = getAllCalculators().map((c) => ({ name: c.cardTitle, href: c.href }));

export default function CalculatorsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <section className="border-t border-border bg-surface py-10">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="mb-4 text-lg font-semibold">More Creator Tools</h2>
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
            {relatedTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="rounded-lg border border-border bg-white px-4 py-3 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
              >
                {tool.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
