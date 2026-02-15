import { createOgImageResponse, OG_SIZE } from '@/lib/ogImageFactory';

export const runtime = 'edge';
export const alt = 'YouTube Shorts Money Calculator — How Much Do Shorts Pay?';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default function Image() {
  return createOgImageResponse({
    title: 'YouTube Shorts Money Calculator',
    subtitle: 'Estimate how much YouTube Shorts pay per 1,000 views',
    stats: [
      { label: 'Shorts RPM', value: '$0.01 — $0.07' },
      { label: 'Per 1M Views', value: '$20 — $80' },
      { label: 'Revenue Share', value: '45%' },
    ],
  });
}
