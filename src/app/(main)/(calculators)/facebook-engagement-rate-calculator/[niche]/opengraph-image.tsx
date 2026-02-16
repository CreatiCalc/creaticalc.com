import { createOgImageResponse, OG_SIZE } from '@/lib/ogImageFactory';
import { getEngagementNichePageData } from '@/lib/engagement-niches';

export const alt = 'Facebook Engagement Rate Calculator by Niche';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ niche: string }> }) {
  const { niche } = await params;
  const data = getEngagementNichePageData('facebook', niche);
  return createOgImageResponse({
    title: data?.ogTitle ?? 'Facebook Engagement Rate Calculator',
    subtitle: `${data?.name ?? ''} engagement benchmarks on Facebook`,
    stats: [
      { label: 'Platform', value: 'Facebook' },
      { label: 'Niche', value: data?.name ?? 'All' },
      { label: 'Price', value: 'Free' },
    ],
  });
}
