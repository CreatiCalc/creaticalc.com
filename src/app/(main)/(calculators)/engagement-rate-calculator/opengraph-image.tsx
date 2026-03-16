import { createOgImageResponse, OG_SIZE } from '@/lib/ogImageFactory';

export const runtime = 'edge';
export const alt = 'Engagement Rate Calculator — Free Tool for Instagram & TikTok';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default function Image() {
  return createOgImageResponse({
    title: 'Engagement Rate Calculator',
    subtitle: 'Calculate your engagement rate and compare against 2026 benchmarks',
    stats: [
      { label: 'Platforms', value: '5' },
      { label: 'Benchmarks', value: 'By Niche' },
      { label: 'Price', value: 'Free' },
    ],
  });
}
