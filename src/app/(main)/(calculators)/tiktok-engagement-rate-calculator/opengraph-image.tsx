import { createOgImageResponse, OG_SIZE } from '@/lib/ogImageFactory';

export const runtime = 'edge';
export const alt = 'TikTok Engagement Rate Calculator + Industry Benchmarks 2026';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default function Image() {
  return createOgImageResponse({
    title: 'TikTok Engagement Rate Calculator',
    subtitle: 'Measure your TikTok engagement and compare against benchmarks',
    stats: [
      { label: 'Metrics', value: '3 Formulas' },
      { label: 'Benchmarks', value: 'By Niche' },
      { label: 'Price', value: 'Free' },
    ],
  });
}
