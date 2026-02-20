import type { Metadata } from 'next';
import Link from 'next/link';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import Breadcrumbs from '@/components/seo/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Methodology — How We Calculate Creator Earnings & Engagement',
  description:
    'Learn how CreatiCalc calculates YouTube earnings, engagement rates, and sponsorship pricing. Our data sources, formulas, update schedule, and model assumptions explained.',
  openGraph: {
    title: 'Methodology — How CreatiCalc Works',
    description:
      'Data sources, formulas, and assumptions behind CreatiCalc\'s creator earnings and engagement rate calculators.',
    url: '/methodology',
  },
  alternates: {
    canonical: '/methodology',
  },
};

const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Methodology', path: '/methodology' },
];

export default function MethodologyPage() {
  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />

      <div className="mx-auto max-w-4xl px-4 py-16">
        <Breadcrumbs items={breadcrumbs} />

        <header className="mb-16">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Our <span className="text-gradient-vibrant">Methodology</span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            Transparency is a core principle at CreatiCalc. This page explains where our data comes
            from, what formulas we use, how often we update, and what assumptions underlie our
            estimates.
          </p>
        </header>

        <section className="mb-16">
          <h2 className="text-2xl font-bold">YouTube Earnings Estimates</h2>
          <p className="mt-4 leading-relaxed text-muted">
            Our{' '}
            <Link href="/youtube-money-calculator" className="text-primary hover:underline">
              YouTube Money Calculator
            </Link>{' '}
            uses CPM (Cost Per Mille) ranges by content niche to project ad revenue. We source niche
            CPM data from:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-muted marker:text-primary">
            <li>
              <a
                href="https://support.google.com/youtube/answer/72857"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                YouTube Partner Program documentation
              </a>{' '}
              — confirms the 55/45 creator/YouTube revenue split and monetization requirements
            </li>
            <li>
              Advertising industry reports from{' '}
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
                href="https://www.emarketer.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                eMarketer
              </a>{' '}
              — for CPM ranges by vertical and seasonal ad-spend patterns
            </li>
            <li>
              Creator-reported earnings compiled from public disclosures on YouTube, Reddit, and
              creator economy publications
            </li>
            <li>
              Cross-referenced with tools like{' '}
              <a
                href="https://socialblade.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Social Blade
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
            </li>
          </ul>

          <h3 className="mt-8 text-lg font-semibold">The Earnings Formula</h3>
          <p className="mt-2 text-muted">
            For each month in the projection, we calculate:{' '}
            <code className="rounded bg-surface-alt px-1.5 py-0.5 text-xs font-mono">
              Monthly Revenue = (Daily Views × Days × Growth Factor) / 1,000 × RPM
            </code>
          </p>
          <p className="mt-2 text-muted">
            Where RPM = CPM × 0.55 (the creator&apos;s share after YouTube&apos;s 45% cut). We
            provide low, mid, and high estimates using the full CPM range for each niche.
          </p>

          <h3 className="mt-8 text-lg font-semibold">Seasonality Model</h3>
          <p className="mt-2 text-muted">
            When enabled, our seasonality toggle applies monthly multipliers to RPM based on
            real-world advertising cycles. Q4 (October–December) sees significantly higher ad spend
            due to holiday shopping, while January typically has the lowest rates as brand budgets
            reset. These multipliers are derived from annual digital ad-spend data published by
            eMarketer and IAB.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold">Engagement Rate Calculations</h2>
          <p className="mt-4 leading-relaxed text-muted">
            Our{' '}
            <Link href="/engagement-rate-calculator" className="text-primary hover:underline">
              engagement rate calculators
            </Link>{' '}
            use the standard formula adopted by brands and agencies:
          </p>
          <p className="mt-2 text-muted">
            <code className="rounded bg-surface-alt px-1.5 py-0.5 text-xs font-mono">
              Engagement Rate = (Total Interactions / Follower Count) × 100
            </code>
          </p>
          <p className="mt-4 text-muted">
            Platform-specific interactions include likes, comments, saves, and shares (Instagram);
            likes, comments, shares, and views (TikTok); reactions, comments, and shares (Facebook);
            and likes, replies, reposts, and bookmarks (X/Twitter).
          </p>
          <p className="mt-4 text-muted">
            Benchmark data for follower tiers and industries is informed by annual reports from{' '}
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
            ,{' '}
            <a
              href="https://www.socialinsider.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Social Insider
            </a>
            , and platform-published data.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold">Sponsorship Rate Estimates</h2>
          <p className="mt-4 leading-relaxed text-muted">
            Our{' '}
            <Link
              href="/instagram-sponsorship-rate-calculator"
              className="text-primary hover:underline"
            >
              sponsorship rate calculators
            </Link>{' '}
            estimate what creators can charge for branded content. Rates are calculated as:
          </p>
          <p className="mt-2 text-muted">
            <code className="rounded bg-surface-alt px-1.5 py-0.5 text-xs font-mono">
              Rate = Base Rate × (Followers / 1,000) × Engagement Multiplier × Niche Multiplier ×
              Content Type Multiplier × Deal Type Multiplier
            </code>
          </p>
          <p className="mt-4 text-muted">
            Base rates per 1,000 followers vary by platform and are informed by industry rate cards,
            creator survey data from{' '}
            <a
              href="https://influencermarketinghub.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Influencer Marketing Hub
            </a>
            , and publicly shared rate information from established creators. Multipliers account for
            higher engagement (which commands premium rates), high-value niches (like finance), and
            content formats that require more production effort.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold">Update Schedule</h2>
          <p className="mt-4 leading-relaxed text-muted">
            We review and update our benchmark data at the beginning of each year. The current data
            reflects 2026 industry conditions. Mid-year updates are made if significant platform
            changes occur (e.g., new monetization features, algorithm shifts, or major changes to ad
            policies).
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold">Limitations and Assumptions</h2>
          <p className="mt-4 leading-relaxed text-muted">
            All CreatiCalc results are estimates for informational purposes. Key assumptions and
            limitations:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-muted marker:text-primary">
            <li>
              <strong className="text-foreground">Ad revenue only:</strong> YouTube earnings
              estimates cover ad revenue. Actual creator income often includes sponsorships,
              merchandise, memberships, and other streams.
            </li>
            <li>
              <strong className="text-foreground">Average CPM ranges:</strong> CPM varies by
              audience geography, ad-blocker usage, video length, and real-time auction dynamics. Our
              ranges represent typical values, not guaranteed rates.
            </li>
            <li>
              <strong className="text-foreground">Engagement benchmarks are averages:</strong>{' '}
              Individual performance varies based on content quality, posting frequency, algorithm
              changes, and audience demographics.
            </li>
            <li>
              <strong className="text-foreground">Sponsorship rates are starting points:</strong>{' '}
              Actual brand deals depend on negotiation, exclusivity terms, usage rights, and
              creator-brand fit.
            </li>
            <li>
              <strong className="text-foreground">No financial advice:</strong> CreatiCalc provides
              estimates for planning purposes. We are not financial advisors and our tools should not
              be used as the sole basis for business decisions.
            </li>
          </ul>
        </section>

        <section className="text-center">
          <h2 className="text-2xl font-bold">Questions About Our Data?</h2>
          <p className="mt-4 text-muted">
            If you have questions about our methodology or want to suggest improvements, reach out
            via{' '}
            <a
              href="https://x.com/CreatiCalc"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              @CreatiCalc on X
            </a>
            .
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/youtube-money-calculator"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90"
            >
              Try the YouTube Calculator
            </Link>
            <Link
              href="/about"
              className="rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
            >
              About CreatiCalc
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
