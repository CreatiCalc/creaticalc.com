import type { Metadata } from 'next';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import { getAllCalculators, PLATFORM_GRADIENTS } from '@/lib/calculatorRegistry';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import { SITE_URL } from '@/lib/siteConfig';

export const metadata: Metadata = {
  title: 'About — Free Calculators for Content Creators',
  description:
    'CreatiCalc offers free calculators for YouTube, Instagram, TikTok, Facebook, and X creators. Estimate earnings, engagement rates, and sponsorship pricing.',
  openGraph: {
    title: 'About CreatiCalc — Free Calculators for Content Creators',
    description:
      'Free YouTube earnings, Instagram & TikTok engagement rate, and sponsorship rate calculators. Built for creators, powered by real benchmarks.',
    url: '/about',
  },
  alternates: {
    canonical: '/about',
  },
};

const calculators = getAllCalculators();

const faqItems = [
  {
    question: 'Is CreatiCalc really free?',
    answer:
      'Yes — every calculator on CreatiCalc is 100% free to use with no sign-up required. You get instant results with no paywalls or hidden fees.',
  },
  {
    question: 'How accurate are the calculator results?',
    answer:
      'Our calculators use real industry benchmarks and publicly available data from YouTube, Instagram, TikTok, Facebook, and X (Twitter). While no estimate is perfectly precise — actual results depend on factors like audience geography, ad-blocker usage, and seasonal trends — our tools give you a reliable range to plan around.',
  },
  {
    question: 'What platforms does CreatiCalc support?',
    answer:
      'CreatiCalc currently supports YouTube, Instagram, TikTok, Facebook, and X (Twitter). We offer earnings calculators (including YouTube Shorts), engagement rate calculators, sponsorship rate calculators, engagement benchmarks, and growth projectors — with more tools in development.',
  },
  {
    question: 'How often is the data updated?',
    answer:
      'We regularly review and update our CPM rates, engagement benchmarks, and growth models to reflect current industry conditions. Ad rates and platform algorithms change over time, so we aim to keep our data aligned with the latest trends.',
  },
  {
    question: 'Can I use CreatiCalc for brand deals and sponsorship pricing?',
    answer:
      'Yes. We have dedicated sponsorship rate calculators for YouTube, Instagram, TikTok, Facebook, and X (Twitter) that suggest rates based on your followers, engagement, content type, and niche. These are great starting points for negotiating brand deals and building your rate card.',
  },
  {
    question: 'Do I need to create an account?',
    answer:
      'No. All calculators work instantly in your browser with no account, no login, and no personal data collected. Just enter your numbers and get results.',
  },
];

const aboutBreadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
];

export default function AboutPage() {
  const aboutPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    'name': 'About CreatiCalc',
    'description':
      'CreatiCalc offers free calculators for YouTube, Instagram, TikTok, Facebook, and X creators.',
    'url': `${SITE_URL}/about`,
    'mainEntity': { '@id': `${SITE_URL}/#organization` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />
      <BreadcrumbSchema items={aboutBreadcrumbs} />

      <div className="mx-auto max-w-4xl px-4 py-16">
        <Breadcrumbs items={aboutBreadcrumbs} />
        {/* Hero */}
        <header className="mb-16">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            About <span className="text-gradient-vibrant">CreatiCalc</span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            CreatiCalc is a free suite of calculators built for content creators on YouTube,
            Instagram, TikTok, Facebook, and X (Twitter). Whether you&apos;re estimating your{' '}
            <Link href="/youtube-money-calculator" className="text-primary hover:underline">
              YouTube ad revenue
            </Link>
            , checking your{' '}
            <Link href="/engagement-rate-calculator" className="text-primary hover:underline">
              engagement rate
            </Link>
            , finding your{' '}
            <Link
              href="/instagram-sponsorship-rate-calculator"
              className="text-primary hover:underline"
            >
              sponsorship pricing
            </Link>
            , or projecting your{' '}
            <Link href="/youtube-subscriber-projector" className="text-primary hover:underline">
              subscriber growth
            </Link>{' '}
            — we give you instant, data-driven results based on real industry benchmarks.
          </p>
        </header>

        {/* What is CreatiCalc */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold">What Is CreatiCalc?</h2>
          <p className="mt-4 leading-relaxed text-muted">
            CreatiCalc is a collection of free online tools designed to help content creators make
            smarter decisions about their channels. From estimating{' '}
            <Link href="/youtube-money-calculator" className="text-primary hover:underline">
              how much money a YouTube channel makes
            </Link>{' '}
            to calculating{' '}
            <Link href="/engagement-rate-calculator" className="text-primary hover:underline">
              engagement rates on Instagram, TikTok, Facebook, and X
            </Link>
            , every tool is built to give you actionable numbers — fast, free, and without requiring
            an account.
          </p>
          <p className="mt-4 leading-relaxed text-muted">
            We believe creators deserve access to the same data that brands and agencies use. That
            means transparent calculations, real CPM and RPM data by niche, and tools that go beyond
            a single number to show you ranges, trends, and projections.
          </p>
        </section>

        {/* Our Calculators */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold">Our Free Creator Calculators</h2>
          <p className="mt-4 mb-6 leading-relaxed text-muted">
            Every calculator is free to use, works instantly in your browser, and requires no
            sign-up.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {calculators.map((calc) => (
              <Link key={calc.href} href={calc.href} className="group">
                <Card className="relative h-full overflow-hidden transition-all duration-200 group-hover:border-primary/50 group-hover:shadow-md">
                  <div
                    className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r opacity-0 transition-opacity duration-200 group-hover:opacity-100 ${PLATFORM_GRADIENTS[calc.platform] ?? ''}`}
                  />
                  <div className="flex items-center justify-between">
                    <span className="inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                      {calc.platform}
                    </span>
                    <span className="rounded-full bg-surface-alt px-2 py-0.5 text-xs text-muted">
                      Free
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold group-hover:text-primary">{calc.title}</h3>
                  <p className="mt-1 text-sm text-muted">{calc.aboutDescription}</p>
                  <p className="mt-3 text-sm font-medium text-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    Try it free &rarr;
                  </p>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Who is CreatiCalc For */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold">Who Is CreatiCalc For?</h2>
          <p className="mt-4 leading-relaxed text-muted">
            CreatiCalc is built for anyone creating content on social media — whether you&apos;re
            just starting out or managing a growing channel.
          </p>
          <ul className="mt-4 list-disc space-y-3 pl-5 text-muted marker:text-primary">
            <li>
              <strong className="text-foreground">New creators</strong> who want to understand{' '}
              <Link href="/youtube-money-calculator" className="text-primary hover:underline">
                how much money they could earn
              </Link>{' '}
              from YouTube, Instagram, or TikTok before going full-time.
            </li>
            <li>
              <strong className="text-foreground">Growing channels</strong> looking to{' '}
              <Link href="/engagement-rate-benchmarks" className="text-primary hover:underline">
                benchmark engagement rates
              </Link>
              , set realistic{' '}
              <Link href="/youtube-subscriber-projector" className="text-primary hover:underline">
                growth goals
              </Link>
              , and estimate future revenue.
            </li>
            <li>
              <strong className="text-foreground">Established creators</strong> who need data to
              negotiate{' '}
              <Link
                href="/instagram-sponsorship-rate-calculator"
                className="text-primary hover:underline"
              >
                sponsorship rates
              </Link>
              , plan content strategy, or compare performance across platforms.
            </li>
            <li>
              <strong className="text-foreground">Marketers and agencies</strong> evaluating creator
              partnerships and estimating influencer earnings for campaign planning.
            </li>
          </ul>
        </section>

        {/* Why Trust Our Calculators / Methodology */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold">Why Trust Our Calculators?</h2>
          <p className="mt-4 leading-relaxed text-muted">
            Every calculator on CreatiCalc is built on publicly available data and industry-standard
            benchmarks. Here&apos;s how we approach accuracy:
          </p>
          <div className="mt-6 space-y-6">
            <div>
              <h3 className="text-lg font-semibold">Real CPM and RPM Data</h3>
              <p className="mt-2 text-muted">
                Our YouTube earnings estimates are based on real CPM ranges across 10+ content
                niches, informed by{' '}
                <a
                  href="https://support.google.com/youtube/answer/72857"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  YouTube&apos;s official Partner Program documentation
                </a>
                , advertising industry benchmarks from{' '}
                <a
                  href="https://www.statista.com/topics/2019/youtube/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Statista
                </a>{' '}
                and{' '}
                <a
                  href="https://influencermarketinghub.com/youtube-money-calculator/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Influencer Marketing Hub
                </a>
                , and creator-reported earnings data. We show low, mid, and high estimates so you
                see a realistic range — not a single misleading number.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Transparent Methodology</h3>
              <p className="mt-2 text-muted">
                We don&apos;t hide behind a &quot;proprietary algorithm.&quot; Each calculator page
                includes a detailed &quot;How it works&quot; section that explains exactly what
                formulas we use, what data goes in, and how results are calculated. You can verify
                the math yourself.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Industry-Standard Engagement Benchmarks</h3>
              <p className="mt-2 text-muted">
                Our engagement rate calculators use the same formulas that brands and agencies rely
                on, with benchmark data informed by reports from{' '}
                <a
                  href="https://www.hypeauditor.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  HypeAuditor
                </a>
                ,{' '}
                <a
                  href="https://blog.hootsuite.com/calculate-engagement-rate/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Hootsuite
                </a>
                , and{' '}
                <a
                  href="https://www.socialinsider.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Social Insider
                </a>
                . We benchmark against industry averages so you can see where you stand compared to
                creators in your niche.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Seasonal and Geographic Adjustments</h3>
              <p className="mt-2 text-muted">
                Unlike basic calculators that give you a flat estimate, our tools account for
                real-world variables like seasonal ad rate fluctuations (Q4 pays more) and audience
                geography (US viewers earn more per view). These adjustments make our projections
                significantly more realistic.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
          <div className="mt-6 space-y-6">
            {faqItems.map((item) => (
              <div key={item.question}>
                <h3 className="text-lg font-semibold">{item.question}</h3>
                <p className="mt-2 text-muted">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <h2 className="text-2xl font-bold">Ready to Crunch the Numbers?</h2>
          <p className="mt-4 text-muted">
            Pick a calculator and get instant, free results — no sign-up required.
          </p>
          <div className="mt-8 grid gap-6 text-left sm:grid-cols-3 lg:grid-cols-5">
            {(
              [
                { name: 'YouTube', href: '/youtube' },
                { name: 'Instagram', href: '/instagram' },
                { name: 'TikTok', href: '/tiktok' },
                { name: 'Facebook', href: '/facebook' },
                { name: 'X (Twitter)', href: '/x' },
              ] as const
            ).map((platform) => (
              <div key={platform.name}>
                <Link
                  href={platform.href}
                  className="mb-3 block text-sm font-semibold uppercase tracking-wider text-muted hover:text-primary"
                >
                  {platform.name}
                </Link>
                <div className="flex flex-col gap-2">
                  {calculators
                    .filter((c) => c.platform === platform.name)
                    .map((calc) => (
                      <Link
                        key={calc.href}
                        href={calc.href}
                        className="text-sm font-medium text-primary hover:underline"
                      >
                        {calc.title}
                      </Link>
                    ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {calculators
              .filter((c) => c.platform === 'Multi-Platform')
              .map((calc) => (
                <Link
                  key={calc.href}
                  href={calc.href}
                  className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90"
                >
                  {calc.title}
                </Link>
              ))}
          </div>
        </section>
      </div>
    </>
  );
}
