import { createOgImageResponse, OG_SIZE } from '@/lib/ogImageFactory';

export const runtime = 'edge';
export const alt = 'Instagram Engagement Rate Calculator + Industry Benchmarks 2026';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default function Image() {
  return createOgImageResponse({
    title: 'Instagram Engagement Rate Calculator',
    subtitle: 'Calculate your IG engagement rate and compare against industry benchmarks',
    stats: [
      { label: 'Metrics', value: '3 Formulas' },
      { label: 'Benchmarks', value: 'By Niche' },
      { label: 'Price', value: 'Free' },
    ],
  });
}
