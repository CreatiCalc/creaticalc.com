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
      { label: 'Likes', value: '1,240' },
      { label: 'Rate', value: '3.2%' },
      { label: 'Saves', value: '86' },
    ],
  });
}
