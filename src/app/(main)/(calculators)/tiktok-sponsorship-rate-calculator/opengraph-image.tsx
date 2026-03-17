import { createOgImageResponse, OG_SIZE } from '@/lib/ogImageFactory';

export const runtime = 'edge';
export const alt = 'TikTok Sponsorship Price Calculator — How Much to Charge in 2026';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default function Image() {
  return createOgImageResponse({
    title: 'TikTok Sponsorship Price Calculator',
    subtitle: 'Get your personalized rate card — trusted by agencies',
    stats: [
      { label: 'Formats', value: '3' },
      { label: 'Data', value: '2026' },
      { label: 'Price', value: 'Free' },
    ],
  });
}
