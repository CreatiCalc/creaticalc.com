import { createOgImageResponse, OG_SIZE } from '@/lib/ogImageFactory';

export const runtime = 'edge';
export const alt = 'Facebook Engagement Rate Calculator + Page Benchmarks 2026';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default function Image() {
  return createOgImageResponse({
    title: 'Facebook Engagement Rate Calculator',
    subtitle: 'Measure your Facebook page engagement and compare against benchmarks',
    stats: [
      { label: 'Reactions', value: '245' },
      { label: 'Rate', value: '1.2%' },
      { label: 'Shares', value: '18' },
    ],
  });
}
