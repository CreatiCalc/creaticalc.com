import { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import CalculatorLayout from '@/features/calculators/shared/CalculatorLayout';
import CalculatorSchema from '@/components/seo/CalculatorSchema';
import SponsorshipCalculator from '@/features/calculators/sponsorship-shared/SponsorshipCalculator';
import CalculatorSkeleton from '@/features/calculators/shared/CalculatorSkeleton';
import { FACEBOOK_SPONSORSHIP_CONFIG } from '@/features/calculators/sponsorship-shared/sponsorshipConfigs';
import { getSponsorshipNichePages, getSponsorshipNichePageData } from '@/lib/sponsorship-niches';
import NicheCrossLinks from '@/features/calculators/sponsorship-shared/NicheCrossLinks';

interface NichePageProps {
  params: Promise<{ niche: string }>;
}

const PLATFORM = 'facebook' as const;

export function generateStaticParams() {
  return getSponsorshipNichePages(PLATFORM).map((n) => ({ niche: n.slug }));
}

export async function generateMetadata({ params }: NichePageProps): Promise<Metadata> {
  const { niche } = await params;
  const data = getSponsorshipNichePageData(PLATFORM, niche);
  if (!data) return {};

  return {
    title: data.title,
    description: data.metaDescription,
    openGraph: {
      title: data.ogTitle,
      description: data.ogDescription,
      url: `/facebook-sponsorship-rate-calculator/${data.slug}`,
    },
    alternates: {
      canonical: `/facebook-sponsorship-rate-calculator/${data.slug}`,
    },
  };
}

export default async function NicheSponsorshipPage({ params }: NichePageProps) {
  const { niche } = await params;
  const data = getSponsorshipNichePageData(PLATFORM, niche);
  if (!data) notFound();

  const howItWorks = (
    <>
      <p>{data.howItWorks}</p>
      <h3 className="mt-6 text-lg font-semibold text-foreground">Related Tools</h3>
      <ul className="mt-2 list-disc space-y-1 pl-5">
        <li>
          <Link
            href="/facebook-sponsorship-rate-calculator"
            className="font-medium text-primary hover:underline"
          >
            Facebook Sponsorship Rate Calculator
          </Link>{' '}
          &mdash; calculate rates across all niches
        </li>
        <li>
          <Link
            href="/facebook-engagement-rate-calculator"
            className="font-medium text-primary hover:underline"
          >
            Facebook Engagement Rate Calculator
          </Link>{' '}
          &mdash; measure your engagement rate
        </li>
        <li>
          <Link
            href="/instagram-sponsorship-rate-calculator"
            className="font-medium text-primary hover:underline"
          >
            Instagram Sponsorship Rate Calculator
          </Link>{' '}
          &mdash; compare sponsorship rates across platforms
        </li>
      </ul>
    </>
  );

  return (
    <>
      <CalculatorSchema
        name={data.ogTitle}
        description={data.metaDescription}
        url={`/facebook-sponsorship-rate-calculator/${data.slug}`}
        datePublished="2025-01-15"
        dateModified="2026-02-16"
      />
      <CalculatorLayout
        title={data.title}
        slug="facebook-sponsorship-rate-calculator"
        lastUpdated="February 2026"
        description={data.pageDescription}
        faq={data.faq}
        howItWorks={howItWorks}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Facebook', path: '/facebook' },
          { name: 'Sponsorship Rate', path: '/facebook-sponsorship-rate-calculator' },
          { name: data.name, path: `/facebook-sponsorship-rate-calculator/${data.slug}` },
        ]}
      >
        <Suspense fallback={<CalculatorSkeleton />}>
          <SponsorshipCalculator
            config={{ ...FACEBOOK_SPONSORSHIP_CONFIG, defaultIndustryId: data.industryId }}
          />
        </Suspense>

        <NicheCrossLinks currentPlatform={PLATFORM} nicheSlug={data.slug} nicheName={data.name} />
      </CalculatorLayout>
    </>
  );
}
