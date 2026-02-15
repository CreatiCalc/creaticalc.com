import { createOgImageResponse, OG_SIZE } from '@/lib/ogImageFactory';
import { getNichePageData } from '@/lib/nichePageData';
import { getNiche } from '@/lib/youtubeEarningsModel';

export const alt = 'YouTube Money Calculator by Niche';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ niche: string }> }) {
  const { niche: nicheSlug } = await params;
  const pageData = getNichePageData(nicheSlug);
  const nicheData = pageData ? getNiche(pageData.nicheId) : null;

  const title = pageData?.ogTitle ?? 'YouTube Money Calculator';
  const cpmLow = nicheData?.cpm.low ?? 4;
  const cpmHigh = nicheData?.cpm.high ?? 18;
  const rpmLow = nicheData?.rpm.low ?? 2.2;
  const rpmHigh = nicheData?.rpm.high ?? 9.9;

  return createOgImageResponse({
    title,
    subtitle: `Estimate ${pageData?.name ?? 'YouTube'} channel earnings by views and CPM`,
    stats: [
      { label: 'CPM Range', value: `$${cpmLow} — $${cpmHigh}` },
      { label: 'RPM (Creator Earnings)', value: `$${rpmLow.toFixed(2)} — $${rpmHigh.toFixed(2)}` },
      { label: 'Revenue Share', value: '55%' },
    ],
  });
}
