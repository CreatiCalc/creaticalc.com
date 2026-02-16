import { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import CalculatorLayout from '@/features/calculators/shared/CalculatorLayout';
import CalculatorSchema from '@/components/seo/CalculatorSchema';
import EngagementCalculator from '@/features/calculators/engagement-shared/EngagementCalculator';
import { TWITTER_CONFIG } from '@/features/calculators/engagement-shared/platformConfigs';
import { getEngagementNichePages, getEngagementNichePageData } from '@/lib/engagement-niches';
import EngagementNicheCrossLinks from '@/features/calculators/engagement-shared/EngagementNicheCrossLinks';

interface NichePageProps {
  params: Promise<{ niche: string }>;
}

const PLATFORM = 'twitter' as const;

export function generateStaticParams() {
  return getEngagementNichePages(PLATFORM).map((n) => ({ niche: n.slug }));
}

export async function generateMetadata({ params }: NichePageProps): Promise<Metadata> {
  const { niche } = await params;
  const data = getEngagementNichePageData(PLATFORM, niche);
  if (!data) return {};

  return {
    title: data.title,
    description: data.metaDescription,
    openGraph: {
      title: data.ogTitle,
      description: data.ogDescription,
      url: `/twitter-engagement-rate-calculator/${data.slug}`,
    },
    alternates: {
      canonical: `/twitter-engagement-rate-calculator/${data.slug}`,
    },
  };
}

export default async function NicheEngagementPage({ params }: NichePageProps) {
  const { niche } = await params;
  const data = getEngagementNichePageData(PLATFORM, niche);
  if (!data) notFound();

  const howItWorks = (
    <>
      <p>{data.howItWorks}</p>
      <h3 className="mt-6 text-lg font-semibold text-foreground">Related Tools</h3>
      <ul className="mt-2 list-disc space-y-1 pl-5">
        <li>
          <Link
            href="/twitter-engagement-rate-calculator"
            className="font-medium text-primary hover:underline"
          >
            X (Twitter) Engagement Rate Calculator
          </Link>{' '}
          &mdash; calculate engagement across all niches
        </li>
        <li>
          <Link
            href={`/twitter-sponsorship-rate-calculator/${data.slug}`}
            className="font-medium text-primary hover:underline"
          >
            X (Twitter) {data.name} Sponsorship Rates
          </Link>{' '}
          &mdash; see what {data.name.toLowerCase()} creators charge for sponsorships
        </li>
        <li>
          <Link
            href="/engagement-rate-benchmarks"
            className="font-medium text-primary hover:underline"
          >
            Engagement Rate Benchmarks 2026
          </Link>{' '}
          &mdash; full benchmark data across all platforms and industries
        </li>
      </ul>
    </>
  );

  return (
    <>
      <CalculatorSchema
        name={data.ogTitle}
        description={data.metaDescription}
        url={`/twitter-engagement-rate-calculator/${data.slug}`}
        datePublished="2025-01-15"
        dateModified="2026-02-16"
      />
      <CalculatorLayout
        title={data.title}
        slug="twitter-engagement-rate-calculator"
        lastUpdated="February 2026"
        description={data.pageDescription}
        faq={data.faq}
        howItWorks={howItWorks}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'X (Twitter)', path: '/x' },
          { name: 'Engagement Rate', path: '/twitter-engagement-rate-calculator' },
          { name: data.name, path: `/twitter-engagement-rate-calculator/${data.slug}` },
        ]}
      >
        <Suspense>
          <EngagementCalculator
            config={{ ...TWITTER_CONFIG, defaultIndustryId: data.industryId }}
          />
        </Suspense>

        <EngagementNicheCrossLinks
          currentPlatform={PLATFORM}
          nicheSlug={data.slug}
          nicheName={data.name}
        />
      </CalculatorLayout>
    </>
  );
}
