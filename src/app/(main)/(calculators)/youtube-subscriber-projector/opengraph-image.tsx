import { createOgImageResponse, OG_SIZE } from '@/lib/ogImageFactory';

export const runtime = 'edge';
export const alt = 'YouTube Subscriber Growth Projector — Free Tool';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default function Image() {
  return createOgImageResponse({
    title: 'YouTube Subscriber Growth Projector',
    subtitle: "See when you'll hit 1K, 10K, 100K, and 1M subscribers",
    stats: [
      { label: 'Milestone', value: '1K Subs' },
      { label: 'Milestone', value: '100K Subs' },
      { label: 'Milestone', value: '1M Subs' },
    ],
  });
}
