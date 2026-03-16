import { createOgImageResponse, OG_SIZE } from '@/lib/ogImageFactory';
import { getNichePageData } from '@/lib/nichePageData';

export const alt = 'YouTube Money Calculator by Niche';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ niche: string }> }) {
  const { niche: nicheSlug } = await params;
  const pageData = getNichePageData(nicheSlug);

  const title = pageData?.ogTitle ?? 'YouTube Money Calculator';

  return createOgImageResponse({
    title,
    subtitle: `See what ${pageData?.name ?? 'YouTube'} creators actually earn per 1,000 views`,
    stats: [
      { label: 'Niche', value: pageData?.name ?? 'YouTube' },
      { label: 'Metrics', value: 'CPM & RPM' },
      { label: 'Price', value: 'Free' },
    ],
  });
}
