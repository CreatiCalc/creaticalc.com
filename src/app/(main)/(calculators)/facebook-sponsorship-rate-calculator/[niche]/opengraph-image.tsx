import { createOgImageResponse, OG_SIZE } from '@/lib/ogImageFactory';
import { getSponsorshipNichePageData } from '@/lib/sponsorship-niches';

export const alt = 'Facebook Sponsorship Rate Calculator by Niche';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ niche: string }> }) {
  const { niche } = await params;
  const data = getSponsorshipNichePageData('facebook', niche);

  return createOgImageResponse({
    title: data?.ogTitle ?? 'Facebook Sponsorship Rate Calculator',
    subtitle: `Calculate ${data?.name ?? ''} sponsorship rates on Facebook`,
    stats: [
      { label: 'Platform', value: 'Facebook' },
      { label: 'Niche', value: data?.name ?? 'All' },
      { label: 'Price', value: 'Free' },
    ],
  });
}
