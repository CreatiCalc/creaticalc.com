import Link from 'next/link';
import { getAllCalculators } from '@/lib/calculatorRegistry';

/** Maps blog tags to calculator slugs. */
const TAG_CALCULATOR_MAP: Record<string, string[]> = {
  'youtube': ['youtube-money-calculator', 'youtube-shorts-money-calculator'],
  'earnings': ['youtube-money-calculator'],
  'cpm': ['youtube-money-calculator'],
  'rpm': ['youtube-money-calculator', 'youtube-shorts-money-calculator'],
  'instagram': ['instagram-engagement-rate-calculator', 'instagram-sponsorship-rate-calculator'],
  'tiktok': ['tiktok-engagement-rate-calculator', 'tiktok-sponsorship-rate-calculator'],
  'sponsorship': [
    'sponsorship-rate-calculator',
    'youtube-sponsorship-rate-calculator',
    'instagram-sponsorship-rate-calculator',
    'tiktok-sponsorship-rate-calculator',
  ],
  'rates': ['sponsorship-rate-calculator'],
  'engagement-rate': ['engagement-rate-calculator', 'engagement-rate-benchmarks'],
  'benchmarks': ['engagement-rate-benchmarks'],
  'brand-deals': ['sponsorship-rate-calculator'],
  'comparison': ['engagement-rate-benchmarks'],
};

interface RelatedCalculatorsProps {
  tags: string[];
}

export default function RelatedCalculators({ tags }: RelatedCalculatorsProps) {
  const allCalcs = getAllCalculators();

  const slugSet = new Set<string>();
  for (const tag of tags) {
    const slugs = TAG_CALCULATOR_MAP[tag];
    if (slugs) slugs.forEach((s) => slugSet.add(s));
  }

  const calcs = Array.from(slugSet)
    .map((slug) => allCalcs.find((c) => c.slug === slug))
    .filter(Boolean)
    .slice(0, 4);

  if (calcs.length === 0) return null;

  return (
    <section className="mt-12 rounded-2xl border border-border bg-surface p-6">
      <h2 className="mb-4 font-display text-lg font-semibold text-foreground">
        Try These Calculators
      </h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {calcs.map((c) => (
          <Link
            key={c!.slug}
            href={c!.href}
            className="flex items-center gap-3 rounded-xl border border-border bg-white px-4 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary/30 hover:text-primary"
          >
            <span className="text-primary">&rarr;</span>
            {c!.title}
          </Link>
        ))}
      </div>
    </section>
  );
}
