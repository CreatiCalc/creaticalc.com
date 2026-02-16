import { createOgImageResponse, OG_SIZE } from '@/lib/ogImageFactory';
import { getSponsorshipNichePageData } from '@/lib/sponsorship-niches';

export const alt = 'TikTok Sponsorship Rate Calculator by Niche';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ niche: string }> }) {
  const { niche } = await params;
  const data = getSponsorshipNichePageData('tiktok', niche);

  return createOgImageResponse({
    title: data?.ogTitle ?? 'TikTok Sponsorship Rate Calculator',
    subtitle: `Calculate ${data?.name ?? ''} sponsorship rates on TikTok`,
    stats: [
      { label: 'Platform', value: 'TikTok' },
      { label: 'Niche', value: data?.name ?? 'All' },
      { label: 'Price', value: 'Free' },
    ],
  });
}
