import type { Metadata } from 'next';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import { SITE_NAME, SITE_URL, SITE_LOGO, SITE_DESCRIPTION } from '@/lib/siteConfig';

const title = `${SITE_NAME} — Free Calculators for Content Creators`;

export const metadata: Metadata = {
  title: { absolute: title },
  description: SITE_DESCRIPTION,
  openGraph: {
    title,
    description: SITE_DESCRIPTION,
    url: '/',
  },
  alternates: {
    canonical: '/',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      'name': SITE_NAME,
      'url': SITE_URL,
      'description': SITE_DESCRIPTION,
    },
    {
      '@type': 'Organization',
      'name': SITE_NAME,
      'url': SITE_URL,
      'logo': SITE_LOGO,
      'description': SITE_DESCRIPTION,
    },
  ],
};

const calculators = [
  {
    title: 'YouTube Money Calculator',
    description: 'Estimate how much YouTubers earn based on views, CPM, and niche.',
    href: '/youtube-money-calculator',
    platform: 'YouTube',
  },
  {
    title: 'YouTube Shorts Calculator',
    description:
      'Estimate how much YouTube Shorts pay per 1,000 views. See projected Shorts revenue with real RPM data.',
    href: '/youtube-shorts-money-calculator',
    platform: 'YouTube',
  },
  {
    title: 'YouTube Subscriber Projector',
    description: "Project your YouTube subscriber growth and see when you'll hit milestones.",
    href: '/youtube-subscriber-projector',
    platform: 'YouTube',
  },
  {
    title: 'Instagram Engagement Rate',
    description: 'Calculate your Instagram engagement rate and see how you compare.',
    href: '/instagram-engagement-rate-calculator',
    platform: 'Instagram',
  },
  {
    title: 'Instagram Sponsorship Rate',
    description:
      'Calculate how much to charge for sponsored Instagram posts, Reels, Stories, and carousels.',
    href: '/instagram-sponsorship-rate-calculator',
    platform: 'Instagram',
  },
  {
    title: 'TikTok Engagement Rate',
    description: 'Measure your TikTok engagement rate with views, likes, and shares.',
    href: '/tiktok-engagement-rate-calculator',
    platform: 'TikTok',
  },
  {
    title: 'TikTok Sponsorship Rate',
    description: 'Find out how much to charge for sponsored TikTok videos, Stories, and Lives.',
    href: '/tiktok-sponsorship-rate-calculator',
    platform: 'TikTok',
  },
  {
    title: 'Facebook Engagement Rate',
    description:
      'Calculate your Facebook Page engagement rate using reactions, comments, and shares. Compare against page benchmarks.',
    href: '/facebook-engagement-rate-calculator',
    platform: 'Facebook',
  },
  {
    title: 'X (Twitter) Engagement Rate',
    description:
      'Measure your X engagement rate with likes, replies, reposts, and bookmarks. Compare against benchmarks.',
    href: '/twitter-engagement-rate-calculator',
    platform: 'X',
  },
  {
    title: 'Engagement Rate Calculator',
    description:
      'Calculate your engagement rate on Instagram or TikTok. Compare against 2026 industry benchmarks.',
    href: '/engagement-rate-calculator',
    platform: 'Multi-Platform',
  },
  {
    title: 'Engagement Rate Benchmarks',
    description:
      'See average engagement rates by follower tier, industry, and platform for Instagram and TikTok.',
    href: '/engagement-rate-benchmarks',
    platform: 'Multi-Platform',
  },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="relative mb-20 text-center">
        {/* Decorative gradient orb */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-3xl"
          style={{ background: 'var(--gradient-brand-vibrant)' }}
          aria-hidden="true"
        />
        <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
          Free Calculators for <span className="text-gradient-vibrant">Content Creators</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">
          Estimate your YouTube earnings, calculate engagement rates, find your sponsorship pricing
          on Instagram and TikTok, and project your subscriber growth — all for free.
        </p>
        <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm text-muted">
          <span className="inline-block h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
          Choose a calculator below to get started
        </div>
      </section>

      <section className="grid gap-6 sm:grid-cols-2">
        {calculators.map((calc) => (
          <Link key={calc.href} href={calc.href} className="group">
            <Card className="relative h-full overflow-hidden transition-all duration-200 group-hover:border-primary/50 group-hover:shadow-md">
              {/* Gradient accent bar on hover */}
              <div
                className="absolute inset-x-0 top-0 h-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                style={{ background: 'var(--gradient-brand)' }}
              />
              <span className="mb-2 inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                {calc.platform}
              </span>
              <h2 className="text-lg font-semibold group-hover:text-primary">{calc.title}</h2>
              <p className="mt-1 text-sm text-muted">{calc.description}</p>
              <p className="mt-3 text-sm font-medium text-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                Try it free &rarr;
              </p>
            </Card>
          </Link>
        ))}
      </section>

      <section className="mt-20 text-center">
        <h2 className="text-2xl font-bold">Why CreatiCalc?</h2>
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          <div>
            <p className="text-gradient-brand text-3xl font-bold">100%</p>
            <p className="mt-1 text-sm text-muted">Free to use, no sign-up required</p>
          </div>
          <div>
            <p className="text-gradient-brand text-3xl font-bold">Instant</p>
            <p className="mt-1 text-sm text-muted">Results calculated in real-time</p>
          </div>
          <div>
            <p className="text-gradient-brand text-3xl font-bold">Accurate</p>
            <p className="mt-1 text-sm text-muted">Based on real industry benchmarks</p>
          </div>
        </div>
        <p className="mt-6 text-sm text-muted">
          <Link href="/about" className="text-primary hover:underline">
            Learn more about CreatiCalc &rarr;
          </Link>
        </p>
      </section>
    </div>
  );
}
