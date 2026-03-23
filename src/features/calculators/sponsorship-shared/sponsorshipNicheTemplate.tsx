/**
 * Shared template for sponsorship rate calculator niche pages.
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
const SponsorshipCalculator = dynamic(
  () => import('@/features/calculators/sponsorship-shared/SponsorshipCalculator')
);
import CalculatorSkeleton from '@/features/calculators/shared/CalculatorSkeleton';
import { getSponsorshipNichePages, getSponsorshipNichePageData } from '@/lib/sponsorship-niches';
import NicheCrossLinks from '@/features/calculators/sponsorship-shared/NicheCrossLinks';
import type { SponsorshipPlatformConfig } from './sponsorshipConfigs';
import type { SponsorshipPlatform } from '@/lib/sponsorshipModel';

export interface RelatedLink {
  href: string;
  label: string;
  description: string;
}

export interface SponsorshipNicheConfig {
  /** Sponsorship-model platform slug, e.g. 'instagram', 'youtube' */
  platform: SponsorshipPlatform;
  /** The SponsorshipPlatformConfig for this platform */
  calculatorConfig: SponsorshipPlatformConfig;
  /** Display name, e.g. 'Instagram', 'X (Twitter)' */
  displayName: string;
  /** Hub page path, e.g. '/instagram', '/x' */
  hubPath: string;
  /** URL prefix, e.g. 'instagram-sponsorship-rate-calculator' */
  urlPrefix: string;
  /** Platform-specific related links (3 items) */
  relatedLinks: RelatedLink[];
}

interface NichePageProps {
  params: Promise<{ niche: string }>;
}

export function buildGenerateStaticParams(config: SponsorshipNicheConfig) {
  return function generateStaticParams() {
    return getSponsorshipNichePages(config.platform).map((n) => ({ niche: n.slug }));
  };
}

export function buildGenerateMetadata(config: SponsorshipNicheConfig) {
  return async function generateMetadata({ params }: NichePageProps): Promise<Metadata> {
    const { niche } = await params;
    const data = getSponsorshipNichePageData(config.platform, niche);
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

export function buildNicheSponsorshipPage(config: SponsorshipNicheConfig) {
  return async function NicheSponsorshipPage({ params }: NichePageProps) {
    const { niche } = await params;
    const data = getSponsorshipNichePageData(config.platform, niche);
    if (!data) notFound();

    const howItWorks = (
      <>
        <p>{data.howItWorks}</p>
        <h3 className="mt-6 text-lg font-semibold text-foreground">Related Tools</h3>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          {config.relatedLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="font-medium text-primary hover:underline">
                {link.label}
              </Link>{' '}
              &mdash; {link.description}
            </li>
          ))}
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
            { name: 'Sponsorship Rate', path: `/${config.urlPrefix}` },
            { name: data.name, path: `/${config.urlPrefix}/${data.slug}` },
          ]}
        >
          <Suspense fallback={<CalculatorSkeleton />}>
            <SponsorshipCalculator
              config={{ ...config.calculatorConfig, defaultIndustryId: data.industryId }}
            />
          </Suspense>

          <NicheCrossLinks
            currentPlatform={config.platform}
            nicheSlug={data.slug}
            nicheName={data.name}
          />
        </CalculatorLayout>
      </>
    );
  };
}
