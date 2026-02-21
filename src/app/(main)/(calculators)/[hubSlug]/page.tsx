import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPlatformHub, PLATFORM_HUBS } from '@/lib/platformHubData';
import type { PlatformHubSlug } from '@/lib/platforms';
import { getCalculatorsByPlatform } from '@/lib/calculatorRegistry';
import PlatformHubPage from '@/features/calculators/shared/PlatformHubPage';

/** Only render statically generated hub slugs — all others 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return PLATFORM_HUBS.map((h) => ({ hubSlug: h.slug }));
}

interface HubPageProps {
  params: Promise<{ hubSlug: string }>;
}

export async function generateMetadata({ params }: HubPageProps): Promise<Metadata> {
  const { hubSlug } = await params;
  const hub = getPlatformHub(hubSlug as PlatformHubSlug);
  if (!hub) return {};

  return {
    title: hub.title,
    description: hub.metaDescription,
    openGraph: {
      title: hub.ogTitle,
      description: hub.ogDescription,
      url: `/${hub.slug}`,
    },
    alternates: {
      canonical: `/${hub.slug}`,
    },
  };
}

export default async function HubPage({ params }: HubPageProps) {
  const { hubSlug } = await params;
  const hub = getPlatformHub(hubSlug as PlatformHubSlug);
  if (!hub) notFound();

  const calculators = getCalculatorsByPlatform(hub.platform);
  const otherHubs = PLATFORM_HUBS.filter((h) => h.slug !== hub.slug).map((h) => ({
    name: h.displayName,
    slug: h.slug,
    calculatorCount: getCalculatorsByPlatform(h.platform).length,
  }));

  return <PlatformHubPage hub={hub} calculators={calculators} otherHubs={otherHubs} />;
}
