import { createOgImageResponse, OG_SIZE } from '@/lib/ogImageFactory';

export const runtime = 'edge';
export const alt = 'YouTube Money Calculator — Check Your Earning Potential';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default function Image() {
  return createOgImageResponse({
    title: 'YouTube Money Calculator',
    subtitle: 'Find out what your channel is really worth — trusted by industry pros',
    stats: [
      { label: 'Niches', value: '10+' },
      { label: 'Data', value: '2026 CPMs' },
      { label: 'Price', value: 'Free' },
    ],
  });
}
