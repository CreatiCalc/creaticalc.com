/**
 * Shared OG image builder for sponsorship niche pages.
 */
import { createOgImageResponse, OG_SIZE } from '@/lib/ogImageFactory';
import { getSponsorshipNichePageData } from '@/lib/sponsorship-niches';
import type { SponsorshipPlatform } from '@/lib/sponsorshipModel';

export { OG_SIZE };

export function buildNicheOgImage(platform: SponsorshipPlatform, displayName: string) {
  return async function Image({ params }: { params: Promise<{ niche: string }> }) {
    const { niche } = await params;
    const data = getSponsorshipNichePageData(platform, niche);
    return createOgImageResponse({
      title: data?.ogTitle ?? `${displayName} Sponsorship Rate Calculator`,
      subtitle: `Calculate ${data?.name ?? ''} sponsorship rates on ${displayName}`,
      stats: [
        { label: 'Platform', value: displayName },
        { label: 'Niche', value: data?.name ?? 'All' },
        { label: 'Price', value: 'Free' },
      ],
    });
  };
}
