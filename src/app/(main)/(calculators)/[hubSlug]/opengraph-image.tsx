import { createOgImageResponse, OG_SIZE } from '@/lib/ogImageFactory';
import { getPlatformHub } from '@/lib/platformHubData';
import type { PlatformHubSlug } from '@/lib/platforms';

export const runtime = 'edge';
export const alt = 'Free Creator Calculators — Earnings, Engagement & Sponsorship Tools';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ hubSlug: string }> }) {
  const { hubSlug } = await params;
  const hub = getPlatformHub(hubSlug as PlatformHubSlug)!;

  return createOgImageResponse({
    title: hub.ogImage.title,
    subtitle: hub.ogImage.subtitle,
    stats: hub.ogImage.stats,
  });
}
