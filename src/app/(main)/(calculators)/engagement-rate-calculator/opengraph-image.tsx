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
      { label: 'Instagram', value: '3.2%' },
      { label: 'TikTok', value: '5.4%' },
      { label: 'Benchmark', value: 'By Niche' },
    ],
  });
}
