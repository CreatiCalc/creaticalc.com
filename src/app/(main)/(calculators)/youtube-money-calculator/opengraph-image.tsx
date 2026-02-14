import { createOgImageResponse, OG_SIZE } from '@/lib/ogImageFactory';

export const runtime = 'edge';
export const alt = 'YouTube Money Calculator — Estimate Your Earnings';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default function Image() {
  return createOgImageResponse({
    title: 'YouTube Money Calculator',
    subtitle: 'Estimate how much YouTubers make based on views, CPM, and content niche',
    stats: [
      { label: 'Daily', value: '$5 — $33' },
      { label: 'Monthly', value: '$152 — $1,007' },
      { label: 'Yearly', value: '$1,825 — $12,082' },
    ],
  });
}
