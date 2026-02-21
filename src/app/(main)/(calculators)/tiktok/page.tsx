import type { Metadata } from 'next';
import { getPlatformHub, PLATFORM_HUBS } from '@/lib/platformHubData';
import { getCalculatorsByPlatform } from '@/lib/calculatorRegistry';
import PlatformHubPage from '@/features/calculators/shared/PlatformHubPage';
import { Platform } from '@/lib/platforms';

const hub = getPlatformHub('tiktok')!;
const calculators = getCalculatorsByPlatform(Platform.TikTok);

export const metadata: Metadata = {
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

const otherHubs = PLATFORM_HUBS.filter((h) => h.slug !== hub.slug).map((h) => ({
  name: h.displayName,
  slug: h.slug,
  calculatorCount: getCalculatorsByPlatform(h.platform).length,
}));

export default function TikTokHubPage() {
  return <PlatformHubPage hub={hub} calculators={calculators} otherHubs={otherHubs} />;
}
