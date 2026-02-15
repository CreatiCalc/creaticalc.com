import { createOgImageResponse, OG_SIZE } from '@/lib/ogImageFactory';

export const runtime = 'edge';
export const alt = 'Free TikTok Calculators — Engagement Rate & Sponsorship Tools';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default function Image() {
  return createOgImageResponse({
    title: 'TikTok Creator Calculators',
    subtitle: 'Engagement rate & sponsorship pricing — all free',
    stats: [
      { label: 'Avg ER', value: '4.9%' },
      { label: 'Calculators', value: '2' },
      { label: 'Sponsor CPM', value: '$5–$15' },
    ],
  });
}
