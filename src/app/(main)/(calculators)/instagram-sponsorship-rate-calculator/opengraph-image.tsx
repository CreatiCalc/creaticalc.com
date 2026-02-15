import { createOgImageResponse, OG_SIZE } from '@/lib/ogImageFactory';

export const runtime = 'edge';
export const alt = 'Instagram Sponsorship Rate Calculator — How Much to Charge in 2026';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default function Image() {
  return createOgImageResponse({
    title: 'Instagram Sponsorship Rate Calculator',
    subtitle: 'Find out how much to charge for sponsored Instagram content',
    stats: [
      { label: 'Post', value: '$500' },
      { label: 'Reel', value: '$750' },
      { label: 'Story', value: '$200' },
    ],
  });
}
