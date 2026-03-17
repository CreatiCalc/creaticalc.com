import { createOgImageResponse, OG_SIZE } from '@/lib/ogImageFactory';

export const runtime = 'edge';
export const alt = 'Sponsorship Price Calculator — Free Tool for All Platforms';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default function Image() {
  return createOgImageResponse({
    title: 'Sponsorship Price Calculator',
    subtitle: 'Compare what creators charge across all 5 platforms — free tool',
    stats: [
      { label: 'Platforms', value: '5' },
      { label: 'Data', value: '2026' },
      { label: 'Price', value: 'Free' },
    ],
  });
}
