import Link from 'next/link';

const relatedTools = [
  { name: 'YouTube Money Calculator', href: '/youtube-money-calculator' },
  { name: 'YouTube Shorts Calculator', href: '/youtube-shorts-money-calculator' },
  { name: 'Engagement Rate Calculator', href: '/engagement-rate-calculator' },
  { name: 'Instagram Engagement Rate', href: '/instagram-engagement-rate-calculator' },
  { name: 'TikTok Engagement Rate', href: '/tiktok-engagement-rate-calculator' },
  { name: 'Instagram Sponsorship Rate', href: '/instagram-sponsorship-rate-calculator' },
  { name: 'TikTok Sponsorship Rate', href: '/tiktok-sponsorship-rate-calculator' },
  { name: 'Engagement Benchmarks', href: '/engagement-rate-benchmarks' },
  { name: 'YouTube Growth Projector', href: '/youtube-subscriber-projector' },
];

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
