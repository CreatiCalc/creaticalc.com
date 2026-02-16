import { createOgImageResponse, OG_SIZE } from '@/lib/ogImageFactory';
import { getEngagementNichePageData } from '@/lib/engagement-niches';

export const alt = 'X (Twitter) Engagement Rate Calculator by Niche';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ niche: string }> }) {
  const { niche } = await params;
  const data = getEngagementNichePageData('twitter', niche);
  return createOgImageResponse({
    title: data?.ogTitle ?? 'X (Twitter) Engagement Rate Calculator',
    subtitle: `${data?.name ?? ''} engagement benchmarks on X (Twitter)`,
    stats: [
      { label: 'Platform', value: 'X (Twitter)' },
      { label: 'Niche', value: data?.name ?? 'All' },
      { label: 'Price', value: 'Free' },
    ],
  });
}
