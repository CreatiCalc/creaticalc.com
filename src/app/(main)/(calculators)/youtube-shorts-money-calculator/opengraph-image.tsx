import { createOgImageResponse, OG_SIZE } from '@/lib/ogImageFactory';

export const runtime = 'edge';
export const alt = 'YouTube Shorts Money Calculator — See What Shorts Really Pay';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default function Image() {
  return createOgImageResponse({
    title: 'YouTube Shorts Money Calculator',
    subtitle: 'Find out what your Shorts are really worth — 2026 RPM data',
    stats: [
      { label: 'Niches', value: '10+' },
      { label: 'Data', value: '2026 RPMs' },
      { label: 'Price', value: 'Free' },
    ],
  });
}
