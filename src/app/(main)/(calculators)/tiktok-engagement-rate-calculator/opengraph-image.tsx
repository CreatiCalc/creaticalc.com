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
      { label: 'Likes', value: '8,500' },
      { label: 'Rate', value: '5.4%' },
      { label: 'Shares', value: '320' },
    ],
  });
}
