import { createOgImageResponse, OG_SIZE } from '@/lib/ogImageFactory';

export const runtime = 'edge';
export const alt = 'Sponsorship Rate Calculator — Free Tool for All Platforms';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default function Image() {
  return createOgImageResponse({
    title: 'Sponsorship Rate Calculator',
    subtitle: 'Compare sponsorship rates across Instagram, TikTok, YouTube, Facebook & X',
    stats: [
      { label: 'YouTube', value: '$20–50/1K' },
      { label: 'Instagram', value: '$10–25/1K' },
      { label: 'Platforms', value: '5' },
    ],
  });
}
