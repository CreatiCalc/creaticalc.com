import { createBlogOgImageResponse, OG_SIZE } from '@/lib/ogImageFactory';

export const runtime = 'edge';
export const alt = 'CreatiCalc Blog — Creator Economy Insights & Guides';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default function Image() {
  return createBlogOgImageResponse({
    title: 'Creator Economy Insights & Guides',
    description:
      'Data-driven articles on YouTube earnings, sponsorship rates, engagement benchmarks, and monetization strategies for content creators.',
    readingTime: 0,
    tags: ['youtube', 'instagram', 'tiktok'],
  });
}
