import { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import CalculatorLayout from '@/features/calculators/shared/CalculatorLayout';
import CalculatorSchema from '@/components/seo/CalculatorSchema';
import SponsorshipCalculator from '@/features/calculators/sponsorship-shared/SponsorshipCalculator';
import { YOUTUBE_SPONSORSHIP_CONFIG } from '@/features/calculators/sponsorship-shared/sponsorshipConfigs';
import { getSponsorshipNichePages, getSponsorshipNichePageData } from '@/lib/sponsorship-niches';
import NicheCrossLinks from '@/features/calculators/sponsorship-shared/NicheCrossLinks';

interface NichePageProps {
  params: Promise<{ niche: string }>;
}

const PLATFORM = 'youtube' as const;

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
      url: `/youtube-sponsorship-rate-calculator/${data.slug}`,
    },
    alternates: {
      canonical: `/youtube-sponsorship-rate-calculator/${data.slug}`,
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
            href="/youtube-sponsorship-rate-calculator"
            className="font-medium text-primary hover:underline"
          >
            YouTube Sponsorship Rate Calculator
          </Link>{' '}
          &mdash; calculate rates across all niches
        </li>
        <li>
          <Link
            href="/youtube-money-calculator"
            className="font-medium text-primary hover:underline"
          >
            YouTube Money Calculator
          </Link>{' '}
          &mdash; estimate your YouTube ad revenue
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
        url={`/youtube-sponsorship-rate-calculator/${data.slug}`}
        datePublished="2025-01-15"
        dateModified="2026-02-16"
      />
      <CalculatorLayout
        title={data.title}
        slug="youtube-sponsorship-rate-calculator"
        lastUpdated="February 2026"
        description={data.pageDescription}
        faq={data.faq}
        howItWorks={howItWorks}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'YouTube', path: '/youtube' },
          { name: 'Sponsorship Rate', path: '/youtube-sponsorship-rate-calculator' },
          { name: data.name, path: `/youtube-sponsorship-rate-calculator/${data.slug}` },
        ]}
      >
        <Suspense>
          <SponsorshipCalculator
            config={{ ...YOUTUBE_SPONSORSHIP_CONFIG, defaultIndustryId: data.industryId }}
          />
        </Suspense>

        <NicheCrossLinks currentPlatform={PLATFORM} nicheSlug={data.slug} nicheName={data.name} />
      </CalculatorLayout>
    </>
  );
}
