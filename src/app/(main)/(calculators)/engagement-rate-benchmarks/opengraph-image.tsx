import { createOgImageResponse, OG_SIZE } from '@/lib/ogImageFactory';

export const runtime = 'edge';
export const alt = 'Engagement Rate Benchmarks 2026 — Instagram & TikTok';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default function Image() {
  return createOgImageResponse({
    title: 'Engagement Rate Benchmarks 2026',
    subtitle: 'Average rates by follower tier, industry, and platform',
    stats: [
      { label: 'Nano', value: '4.2%' },
      { label: 'Micro', value: '2.8%' },
      { label: 'Macro', value: '1.5%' },
    ],
  });
}
