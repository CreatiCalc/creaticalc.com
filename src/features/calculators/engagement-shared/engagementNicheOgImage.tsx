/**
 * Shared OG image builder for engagement niche pages.
 * Each platform's [niche]/opengraph-image.tsx re-exports from here.
 */
import { createOgImageResponse, OG_SIZE } from '@/lib/ogImageFactory';
import { getEngagementNichePageData } from '@/lib/engagement-niches';
import type { Platform } from '@/lib/engagementBenchmarks';

export { OG_SIZE };

export function buildNicheOgImage(platform: Platform, displayName: string) {
  return async function Image({ params }: { params: Promise<{ niche: string }> }) {
    const { niche } = await params;
    const data = getEngagementNichePageData(platform, niche);
    return createOgImageResponse({
      title: data?.ogTitle ?? `${displayName} Engagement Rate Calculator`,
      subtitle: `${data?.name ?? ''} engagement benchmarks on ${displayName}`,
      stats: [
        { label: 'Platform', value: displayName },
        { label: 'Niche', value: data?.name ?? 'All' },
        { label: 'Price', value: 'Free' },
      ],
    });
  };
}
