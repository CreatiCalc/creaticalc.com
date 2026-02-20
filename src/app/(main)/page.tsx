import type { Metadata } from 'next';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import CollapsibleSection from '@/features/calculators/shared/CollapsibleSection';
import { SITE_NAME, SITE_URL, SITE_LOGO, SITE_DESCRIPTION } from '@/lib/siteConfig';
import { getAllCalculators, PLATFORM_GRADIENTS } from '@/lib/calculatorRegistry';
import { PLATFORM_AVERAGES, YOUTUBE_ENGAGEMENT_RANGE } from '@/lib/engagementBenchmarks';
import { getSponsorshipBaseRate } from '@/lib/sponsorshipModel';
import { NICHES, SHORTS_RPM } from '@/lib/youtubeEarningsModel';

const platformComparison = [
  {
    name: 'YouTube',
    href: '/youtube',
    revenueModel: 'Ad revenue sharing (55%)',
    typicalEarnings: `$${Math.min(...NICHES.map((n) => n.rpm.low))}–$${Math.max(...NICHES.map((n) => n.rpm.high))} RPM`,
    engagementRate: `${YOUTUBE_ENGAGEMENT_RANGE.low}–${YOUTUBE_ENGAGEMENT_RANGE.high}%`,
    sponsorshipRate: (() => {
      const r = getSponsorshipBaseRate('youtube');
      return `$${r.low}–$${r.high} / 1K subs`;
    })(),
  },
  {
    name: 'Instagram',
    href: '/instagram',
    revenueModel: 'Sponsorships + bonuses',
    typicalEarnings: 'Sponsor-dependent',
    engagementRate: `${PLATFORM_AVERAGES.instagram}%`,
    sponsorshipRate: (() => {
      const r = getSponsorshipBaseRate('instagram');
      return `$${r.low}–$${r.high} / 1K followers`;
    })(),
  },
  {
    name: 'TikTok',
    href: '/tiktok',
    revenueModel: 'Creator Fund + sponsorships',
    typicalEarnings: `$${SHORTS_RPM.low}–$${SHORTS_RPM.high} / 1K views`,
    engagementRate: `${PLATFORM_AVERAGES.tiktok}%`,
    sponsorshipRate: (() => {
      const r = getSponsorshipBaseRate('tiktok');
      return `$${r.low}–$${r.high} / 1K followers`;
    })(),
  },
  {
    name: 'Facebook',
    href: '/facebook',
    revenueModel: 'In-stream ads + sponsorships',
    typicalEarnings: 'Varies by niche',
    engagementRate: `${PLATFORM_AVERAGES.facebook}%`,
    sponsorshipRate: (() => {
      const r = getSponsorshipBaseRate('facebook');
      return `$${r.low}–$${r.high} / 1K followers`;
    })(),
  },
  {
    name: 'X (Twitter)',
    href: '/x',
    revenueModel: 'Ads revenue sharing',
    typicalEarnings: 'Varies widely',
    engagementRate: `${PLATFORM_AVERAGES.twitter}%`,
    sponsorshipRate: (() => {
      const r = getSponsorshipBaseRate('twitter');
      return `$${r.low}–$${r.high} / 1K followers`;
    })(),
  },
];

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

const homeFaqItems = [
  {
    question: 'What is engagement rate and why does it matter?',
    answer:
      'Engagement rate measures how actively your audience interacts with your content, expressed as a percentage. It is calculated by dividing total interactions (likes, comments, saves, shares) by your follower count and multiplying by 100. Brands use engagement rate as the primary metric for evaluating creators for sponsorships — a high engagement rate signals an active, loyal audience.',
  },
  {
    question: 'How much do YouTubers earn per 1,000 views?',
    answer:
      'YouTubers typically earn between $1.50 and $45 per 1,000 views (CPM), depending on their content niche. After YouTube takes its 45% cut, creators keep $0.83 to $24.75 per 1,000 views (RPM). Finance and tech channels earn the most, while gaming and entertainment earn less. Use our YouTube Money Calculator for a personalized estimate.',
  },
  {
    question: 'Which social media platform pays creators the most?',
    answer:
      'YouTube pays the most per view through ad revenue sharing, with RPM ranging from $1 to $25+ depending on niche. Instagram and TikTok pay less through direct ad revenue but offer strong sponsorship income — Instagram sponsorship rates run $10–$25 per 1,000 followers, while TikTok rates are $5–$15 per 1,000 followers. YouTube Shorts pay $0.01–$0.07 per 1,000 views.',
  },
  {
    question: 'How much should I charge for a sponsored post?',
    answer:
      'Sponsorship rates depend on your platform, follower count, engagement rate, content niche, and deal type. On Instagram, the standard rate is $10–$25 per 1,000 followers for a basic feed post mention. On TikTok, rates are $5–$15 per 1,000 followers. On YouTube, integrations run $20–$50 per 1,000 subscribers. Use our Sponsorship Rate Calculators for YouTube, Instagram, TikTok, Facebook, and X for a personalized rate card.',
  },
  {
    question: 'What is a good engagement rate on Instagram?',
    answer:
      'A good Instagram engagement rate depends on your follower count. Nano creators (1K–10K) typically see 4–6%, micro (10K–50K) see 2–4%, mid-tier (50K–500K) see 1.5–3%, and mega accounts (1M+) see 0.5–1.5%. The platform average is about 0.98%. Anything above 3% is considered strong.',
  },
  {
    question: 'What is a good engagement rate on TikTok?',
    answer:
      'TikTok has the highest engagement rates of any major platform. Micro creators (1K–10K) typically see 8–12%, mid-tier (10K–100K) see 6–8%, and mega accounts (1M+) see 4–6%. The platform average is about 4.9%, roughly 5x higher than Instagram. Anything above 5% is solid on TikTok.',
  },
  {
    question: 'How do YouTube Shorts compare to long-form videos for earnings?',
    answer:
      'YouTube Shorts pay significantly less than long-form videos — roughly $0.01–$0.07 per 1,000 views compared to $1–$25+ for long-form content. However, Shorts can reach millions of viewers with less production effort. Many creators use Shorts to build subscribers who then watch higher-paying long-form content.',
  },
  {
    question: 'Are these calculators free to use?',
    answer:
      'Yes — every calculator on CreatiCalc is 100% free with no sign-up required. All calculations run in your browser, so your data never leaves your device. You get instant results with no paywalls or hidden fees.',
  },
  {
    question: 'How are your numbers calculated?',
    answer: (
      <>
        All our estimates are based on publicly available industry data, creator-reported earnings,
        and official platform documentation. We explain our data sources, formulas, update schedule,
        and assumptions in detail on our{' '}
        <Link href="/methodology" className="font-medium text-primary hover:underline">
          Methodology page
        </Link>
        .
      </>
    ),
  },
];

const calculators = getAllCalculators();

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      'name': SITE_NAME,
      'url': SITE_URL,
      'description': SITE_DESCRIPTION,
      'publisher': { '@id': `${SITE_URL}/#organization` },
    },
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      'name': SITE_NAME,
      'url': SITE_URL,
      'logo': SITE_LOGO,
      'description': SITE_DESCRIPTION,
      'sameAs': ['https://x.com/CreatiCalc'],
    },
    {
      '@type': 'ItemList',
      'itemListElement': calculators.map((calc, index) => ({
        '@type': 'ListItem',
        'position': index + 1,
        'item': {
          '@type': 'WebApplication',
          'name': calc.title,
          'url': `${SITE_URL}${calc.href}`,
          'description': calc.description,
        },
      })),
    },
  ],
};

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="hero-dots relative mb-24 py-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
          Free Calculators for <span className="text-gradient-vibrant">Content Creators</span>
        </h1>
        <p
          className="animate-fade-up mx-auto mt-6 max-w-2xl text-lg text-muted"
          style={{ animationDelay: '150ms' }}
        >
          Estimate earnings, calculate engagement rates, and find sponsorship pricing for YouTube,
          Instagram, TikTok, Facebook, and X — all free, no sign-up required.
        </p>
        <div
          className="animate-fade-up mt-8 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm text-muted"
          style={{ animationDelay: '300ms' }}
        >
          <span className="inline-block h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
          Choose a calculator below to get started
        </div>
      </section>

      <section className="mb-12 text-center">
        <p className="mx-auto max-w-3xl leading-relaxed text-muted">
          Calculate your{' '}
          <Link
            href="/engagement-rate-calculator"
            className="font-medium text-primary hover:underline"
          >
            engagement rate
          </Link>
          , estimate{' '}
          <Link
            href="/instagram-sponsorship-rate-calculator"
            className="font-medium text-primary hover:underline"
          >
            sponsorship pricing
          </Link>
          , compare against{' '}
          <Link
            href="/engagement-rate-benchmarks"
            className="font-medium text-primary hover:underline"
          >
            2026 industry benchmarks
          </Link>
          , project{' '}
          <Link
            href="/youtube-subscriber-projector"
            className="font-medium text-primary hover:underline"
          >
            subscriber growth
          </Link>
          , and estimate{' '}
          <Link
            href="/youtube-money-calculator"
            className="font-medium text-primary hover:underline"
          >
            YouTube ad revenue
          </Link>{' '}
          — across YouTube, Instagram, TikTok, Facebook, and X.
        </p>
      </section>

      <section className="grid gap-6 sm:grid-cols-2">
        {calculators.map((calc) => (
          <Link key={calc.href} href={calc.href} className="group">
            <Card className="relative h-full overflow-hidden transition-all duration-300 group-hover:scale-[1.02] group-hover:border-primary/50 group-hover:shadow-lg">
              {/* Platform gradient accent bar — slides in from left on hover */}
              <div
                className={`absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r transition-transform duration-300 group-hover:scale-x-100 ${PLATFORM_GRADIENTS[calc.platform] ?? ''}`}
              />
              <div className="flex items-center justify-between">
                <span className="inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                  {calc.platform}
                </span>
                <span className="rounded-full bg-surface-alt px-2 py-0.5 text-xs text-muted">
                  Free
                </span>
              </div>
              <h2 className="text-lg font-semibold transition-colors duration-200 group-hover:text-primary">
                {calc.cardTitle}
              </h2>
              <p className="mt-1 text-sm text-muted">{calc.description}</p>
              <p className="mt-3 flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100">
                Try it free
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M1 7h12M8 2l5 5-5 5" />
                </svg>
              </p>
            </Card>
          </Link>
        ))}
      </section>

      <section className="mt-20 text-center">
        <h2 className="text-2xl font-bold">Why CreatiCalc?</h2>
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          <div>
            <p className="text-gradient-brand text-3xl font-bold">5 Platforms</p>
            <p className="mt-1 text-sm text-muted">
              <Link href="/youtube" className="hover:text-primary hover:underline">
                YouTube
              </Link>
              ,{' '}
              <Link href="/instagram" className="hover:text-primary hover:underline">
                Instagram
              </Link>
              ,{' '}
              <Link href="/tiktok" className="hover:text-primary hover:underline">
                TikTok
              </Link>
              ,{' '}
              <Link href="/facebook" className="hover:text-primary hover:underline">
                Facebook
              </Link>{' '}
              &amp;{' '}
              <Link href="/x" className="hover:text-primary hover:underline">
                X
              </Link>{' '}
              in one place
            </p>
          </div>
          <div>
            <p className="text-gradient-brand text-3xl font-bold">2026 Data</p>
            <p className="mt-1 text-sm text-muted">
              Benchmarks updated with the latest industry rates
            </p>
          </div>
          <div>
            <p className="text-gradient-brand text-3xl font-bold">100% Free</p>
            <p className="mt-1 text-sm text-muted">
              No sign-up, no paywall — runs entirely in your browser
            </p>
          </div>
        </div>
        <p className="mt-6 text-sm text-muted">
          <Link href="/about" className="text-primary hover:underline">
            Learn more about CreatiCalc &rarr;
          </Link>
        </p>
      </section>

      <section className="mt-20">
        <h2 className="mb-4 text-center text-2xl font-bold">
          Creator Earnings &amp; Engagement at a Glance (2026)
        </h2>
        <p className="mx-auto mb-6 max-w-2xl text-center text-sm text-muted">
          How the five major platforms compare for creator monetization and audience engagement.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="py-2 pr-4 font-semibold">Platform</th>
                <th className="py-2 pr-4 font-semibold">Revenue Model</th>
                <th className="py-2 pr-4 font-semibold">Typical Earnings</th>
                <th className="py-2 pr-4 font-semibold">Avg. Engagement Rate</th>
                <th className="py-2 font-semibold">Sponsorship Rate</th>
              </tr>
            </thead>
            <tbody>
              {platformComparison.map((p) => (
                <tr key={p.name} className="border-b border-border/50">
                  <td className="py-2 pr-4 font-medium">
                    <Link href={p.href} className="hover:text-primary hover:underline">
                      {p.name}
                    </Link>
                  </td>
                  <td className="py-2 pr-4 text-muted">{p.revenueModel}</td>
                  <td className="py-2 pr-4 text-muted">{p.typicalEarnings}</td>
                  <td className="py-2 pr-4 text-muted">{p.engagementRate}</td>
                  <td className="py-2 text-muted">{p.sponsorshipRate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-20">
        <h2 className="mb-8 text-center text-2xl font-bold">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {homeFaqItems.map((item, i) => (
            <CollapsibleSection
              key={item.question}
              title={item.question}
              defaultOpen={i === 0}
              variant="compact"
            >
              <div className="text-muted">{item.answer}</div>
            </CollapsibleSection>
          ))}
        </div>
      </section>
    </div>
  );
}
