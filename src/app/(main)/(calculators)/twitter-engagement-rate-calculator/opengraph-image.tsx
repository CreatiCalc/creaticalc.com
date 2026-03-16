import { createOgImageResponse, OG_SIZE } from '@/lib/ogImageFactory';

export const runtime = 'edge';
export const alt = 'X (Twitter) Engagement Rate Calculator + Benchmarks 2026';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default function Image() {
  return createOgImageResponse({
    title: 'X (Twitter) Engagement Rate Calculator',
    subtitle: 'Calculate your X engagement rate and compare against benchmarks',
    stats: [
      { label: 'Metrics', value: '3 Formulas' },
      { label: 'Benchmarks', value: 'By Niche' },
      { label: 'Price', value: 'Free' },
    ],
  });
}
