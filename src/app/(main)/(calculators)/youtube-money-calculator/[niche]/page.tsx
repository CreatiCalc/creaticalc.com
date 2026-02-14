import { Suspense } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CalculatorLayout from '@/features/calculators/shared/CalculatorLayout';
import CalculatorSchema from '@/components/seo/CalculatorSchema';
import { YouTubeMoneyCalculator } from '@/features/calculators/youtube-money';
import { getNiche } from '@/lib/youtubeEarningsModel';
import { NICHE_PAGES, getNichePageData } from '@/lib/nichePageData';

interface NichePageProps {
  params: Promise<{ niche: string }>;
}

export function generateStaticParams() {
  return NICHE_PAGES.map((n) => ({ niche: n.slug }));
}

export async function generateMetadata({ params }: NichePageProps): Promise<Metadata> {
  const { niche } = await params;
  const data = getNichePageData(niche);
  if (!data) return {};

  return {
    title: data.title,
    description: data.metaDescription,
    openGraph: {
      title: data.ogTitle,
      description: data.ogDescription,
      url: `/youtube-money-calculator/${data.slug}`,
    },
    alternates: {
      canonical: `/youtube-money-calculator/${data.slug}`,
    },
  };
}

export default async function NicheCalculatorPage({ params }: NichePageProps) {
  const { niche } = await params;
  const data = getNichePageData(niche);
  if (!data) notFound();

  const nicheInfo = getNiche(data.nicheId);

  const howItWorks = (
    <>
      <p>{data.howItWorks}</p>
      <p className="mt-3">
        The formula: your projected monthly views (daily views &times; days in month &times; growth
        factor) are divided by 1,000 and multiplied by the {data.name} RPM ($
        {nicheInfo.rpm.low.toFixed(2)}
        &ndash;${nicheInfo.rpm.high.toFixed(2)} per 1,000 views). If seasonality is enabled, each
        month uses a different RPM multiplier based on real advertising cycles. The 12-month chart
        shows the range between low and high estimates, with the mid estimate as a trend line.
      </p>
      <p className="mt-3">
        Keep in mind that these are estimates based on ad revenue alone. Many successful {data.name}{' '}
        creators earn significantly more through brand sponsorships, affiliate marketing, and other
        revenue streams.
      </p>
    </>
  );

  return (
    <>
      <CalculatorSchema
        name={data.ogTitle}
        description={data.metaDescription}
        url={`/youtube-money-calculator/${data.slug}`}
      />
      <CalculatorLayout
        title={data.ogTitle}
        description={data.pageDescription}
        faq={data.faq}
        howItWorks={howItWorks}
      >
        <Suspense>
          <YouTubeMoneyCalculator defaultOverrides={{ nicheId: data.nicheId }} hideNicheSelector />
        </Suspense>
      </CalculatorLayout>
    </>
  );
}
