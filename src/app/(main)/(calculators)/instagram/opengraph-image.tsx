import { createOgImageResponse, OG_SIZE } from '@/lib/ogImageFactory';

export const runtime = 'edge';
export const alt = 'Free Instagram Calculators — Engagement Rate & Sponsorship Tools';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default function Image() {
  return createOgImageResponse({
    title: 'Instagram Creator Calculators',
    subtitle: 'Engagement rate & sponsorship pricing — all free',
    stats: [
      { label: 'Avg ER', value: '0.98%' },
      { label: 'Calculators', value: '2' },
      { label: 'Sponsor CPM', value: '$10–$25' },
    ],
  });
}
