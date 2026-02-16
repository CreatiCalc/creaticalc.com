import { createOgImageResponse, OG_SIZE } from '@/lib/ogImageFactory';
import { getEngagementNichePageData } from '@/lib/engagement-niches';

export const alt = 'TikTok Engagement Rate Calculator by Niche';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ niche: string }> }) {
  const { niche } = await params;
  const data = getEngagementNichePageData('tiktok', niche);
  return createOgImageResponse({
    title: data?.ogTitle ?? 'TikTok Engagement Rate Calculator',
    subtitle: `${data?.name ?? ''} engagement benchmarks on TikTok`,
    stats: [
      { label: 'Platform', value: 'TikTok' },
      { label: 'Niche', value: data?.name ?? 'All' },
      { label: 'Price', value: 'Free' },
    ],
  });
}
