import { createOgImageResponse, OG_SIZE } from '@/lib/ogImageFactory';

export const runtime = 'edge';
export const alt = 'Free YouTube Calculators — Earnings, Growth & Sponsorship Tools';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default function Image() {
  return createOgImageResponse({
    title: 'YouTube Creator Calculators',
    subtitle: 'Earnings, growth, sponsorships & Shorts — all free',
    stats: [
      { label: 'Avg CPM', value: '$5–$18' },
      { label: 'Calculators', value: '4' },
      { label: 'Revenue Split', value: '55%' },
    ],
  });
}
