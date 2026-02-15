import { createOgImageResponse, OG_SIZE } from '@/lib/ogImageFactory';

export const runtime = 'edge';
export const alt = 'TikTok Sponsorship Rate Calculator — How Much to Charge in 2026';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default function Image() {
  return createOgImageResponse({
    title: 'TikTok Sponsorship Rate Calculator',
    subtitle: 'Find out how much to charge for sponsored TikTok content',
    stats: [
      { label: 'Video', value: '$400' },
      { label: 'Story', value: '$150' },
      { label: 'Live', value: '$300' },
    ],
  });
}
