import Link from 'next/link';
import Card from '@/components/ui/Card';

const calculators = [
  {
    title: 'YouTube Money Calculator',
    description: 'Estimate how much YouTubers earn based on views, CPM, and niche.',
    href: '/youtube-money-calculator',
  },
  {
    title: 'Instagram Engagement Rate',
    description: 'Calculate your Instagram engagement rate and see how you compare.',
    href: '/instagram-engagement-rate-calculator',
  },
  {
    title: 'TikTok Engagement Rate',
    description: 'Measure your TikTok engagement rate with views, likes, and shares.',
    href: '/tiktok-engagement-rate-calculator',
  },
  {
    title: 'YouTube Subscriber Projector',
    description: "Project your YouTube subscriber growth and see when you'll hit milestones.",
    href: '/youtube-subscriber-projector',
  },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <section className="mb-16 text-center">
        <h1 className="text-4xl font-bold md:text-5xl">
          Free Calculators for <span className="text-primary">Content Creators</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
          Estimate your YouTube earnings, calculate engagement rates on Instagram and TikTok, and
          project your subscriber growth — all for free.
        </p>
      </section>

      <section className="grid gap-6 sm:grid-cols-2">
        {calculators.map((calc) => (
          <Link key={calc.href} href={calc.href} className="group">
            <Card className="h-full transition-colors group-hover:border-primary">
              <h2 className="text-lg font-semibold group-hover:text-primary">{calc.title}</h2>
              <p className="mt-1 text-sm text-muted">{calc.description}</p>
            </Card>
          </Link>
        ))}
      </section>

      <section className="mt-16 text-center">
        <h2 className="text-2xl font-bold">Why CreatiCalc?</h2>
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          <div>
            <p className="text-3xl font-bold text-primary">100%</p>
            <p className="mt-1 text-sm text-muted">Free to use, no sign-up required</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-primary">Instant</p>
            <p className="mt-1 text-sm text-muted">Results calculated in real-time</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-primary">Accurate</p>
            <p className="mt-1 text-sm text-muted">Based on real industry benchmarks</p>
          </div>
        </div>
      </section>
    </div>
  );
}
