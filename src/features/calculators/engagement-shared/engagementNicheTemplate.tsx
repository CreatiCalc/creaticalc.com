/**
 * Shared template for engagement rate calculator niche pages.
 *
 * Each platform's [niche]/page.tsx calls these builders to avoid
 * ~100 lines of duplicated boilerplate per platform.
 */
import { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import CalculatorLayout from '@/features/calculators/shared/CalculatorLayout';
import CalculatorSchema from '@/components/seo/CalculatorSchema';
import dynamic from 'next/dynamic';
const EngagementCalculator = dynamic(
  () => import('@/features/calculators/engagement-shared/EngagementCalculator')
);
import CalculatorSkeleton from '@/features/calculators/shared/CalculatorSkeleton';
import { getEngagementNichePages, getEngagementNichePageData } from '@/lib/engagement-niches';
import EngagementNicheCrossLinks from '@/features/calculators/engagement-shared/EngagementNicheCrossLinks';
import type { EngagementPlatformConfig } from './platformConfigs';
import type { Platform } from '@/lib/engagementBenchmarks';

export interface EngagementNicheConfig {
  /** Engagement-model platform slug, e.g. 'instagram' */
  platform: Platform;
  /** The EngagementPlatformConfig for this platform */
  calculatorConfig: EngagementPlatformConfig;
  /** Display name, e.g. 'Instagram', 'X (Twitter)' */
  displayName: string;
  /** Hub page path, e.g. '/instagram', '/x' */
  hubPath: string;
  /** URL prefix, e.g. 'instagram-engagement-rate-calculator' */
  urlPrefix: string;
  /** Sponsorship URL prefix, e.g. 'instagram-sponsorship-rate-calculator' */
  sponsorshipUrlPrefix: string;
}

interface NichePageProps {
  params: Promise<{ niche: string }>;
}

export function buildGenerateStaticParams(config: EngagementNicheConfig) {
  return function generateStaticParams() {
    return getEngagementNichePages(config.platform).map((n) => ({ niche: n.slug }));
  };
}

export function buildGenerateMetadata(config: EngagementNicheConfig) {
  return async function generateMetadata({ params }: NichePageProps): Promise<Metadata> {
    const { niche } = await params;
    const data = getEngagementNichePageData(config.platform, niche);
    if (!data) return {};

    return {
      title: data.title,
      description: data.metaDescription,
      openGraph: {
        title: data.ogTitle,
        description: data.ogDescription,
        url: `/${config.urlPrefix}/${data.slug}`,
      },
      alternates: {
        canonical: `/${config.urlPrefix}/${data.slug}`,
      },
    };
  };
}

export function buildNicheEngagementPage(config: EngagementNicheConfig) {
  return async function NicheEngagementPage({ params }: NichePageProps) {
    const { niche } = await params;
    const data = getEngagementNichePageData(config.platform, niche);
    if (!data) notFound();

    const howItWorks = (
      <>
        <p>{data.howItWorks}</p>
        <h3 className="mt-6 text-lg font-semibold text-foreground">Related Tools</h3>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>
            <Link
              href={`/${config.urlPrefix}`}
              className="font-medium text-primary hover:underline"
            >
              {config.displayName} Engagement Rate Calculator
            </Link>{' '}
            &mdash; calculate engagement across all niches
          </li>
          <li>
            <Link
              href={`/${config.sponsorshipUrlPrefix}/${data.slug}`}
              className="font-medium text-primary hover:underline"
            >
              {config.displayName} {data.name} Sponsorship Rates
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
          url={`/${config.urlPrefix}/${data.slug}`}
          datePublished="2025-01-15"
          dateModified="2026-02-16"
        />
        <CalculatorLayout
          title={data.title}
          slug={config.urlPrefix}
          lastUpdated="February 2026"
          description={data.pageDescription}
          faq={data.faq}
          howItWorks={howItWorks}
          breadcrumbs={[
            { name: 'Home', path: '/' },
            { name: config.displayName, path: config.hubPath },
            { name: 'Engagement Rate', path: `/${config.urlPrefix}` },
            { name: data.name, path: `/${config.urlPrefix}/${data.slug}` },
          ]}
        >
          <Suspense fallback={<CalculatorSkeleton />}>
            <EngagementCalculator
              config={{ ...config.calculatorConfig, defaultIndustryId: data.industryId }}
            />
          </Suspense>

          <EngagementNicheCrossLinks
            currentPlatform={config.platform}
            nicheSlug={data.slug}
            nicheName={data.name}
          />
        </CalculatorLayout>
      </>
    );
  };
}
