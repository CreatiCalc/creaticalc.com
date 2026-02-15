import { createOgImageResponse, OG_SIZE } from '@/lib/ogImageFactory';

export const runtime = 'edge';
export const alt = 'Free Facebook Calculators — Engagement Rate & Sponsorship Tools';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default function Image() {
  return createOgImageResponse({
    title: 'Facebook Creator Calculators',
    subtitle: 'Engagement rate & sponsorship pricing — all free',
    stats: [
      { label: 'Avg ER', value: '0.065%' },
      { label: 'Calculators', value: '2' },
      { label: 'MAU', value: '3.07B' },
    ],
  });
}
