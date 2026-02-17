import Link from 'next/link';
import { JetBrains_Mono } from 'next/font/google';
import { getAllCalculators } from '@/lib/calculatorRegistry';

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  display: 'optional',
  weight: ['400'],
});

const relatedTools = getAllCalculators().map((c) => ({ name: c.cardTitle, href: c.href }));

export default function CalculatorsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={jetbrainsMono.variable}>
      {children}
      <section className="border-t border-border bg-surface py-10">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="mb-4 text-lg font-semibold">More Creator Tools</h2>
          <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-4">
            {relatedTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="rounded-lg border border-border bg-white px-3 py-2.5 text-xs font-medium leading-snug transition-colors hover:border-primary hover:text-primary sm:px-4 sm:py-3 sm:text-sm"
              >
                {tool.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
