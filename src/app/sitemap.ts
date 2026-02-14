import type { MetadataRoute } from 'next';
import { NICHE_PAGES } from '@/lib/nichePageData';
import { SITE_URL } from '@/lib/siteConfig';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;

  const nichePages: MetadataRoute.Sitemap = NICHE_PAGES.map((n) => ({
    url: `${baseUrl}/youtube-money-calculator/${n.slug}`,
    lastModified: '2026-02-12',
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: '2026-02-14',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/youtube-money-calculator`,
      lastModified: '2026-02-14',
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/youtube-shorts-money-calculator`,
      lastModified: '2026-02-14',
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/youtube-subscriber-projector`,
      lastModified: '2026-02-14',
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/engagement-rate-calculator`,
      lastModified: '2026-02-14',
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/instagram-engagement-rate-calculator`,
      lastModified: '2026-02-14',
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tiktok-engagement-rate-calculator`,
      lastModified: '2026-02-14',
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/instagram-sponsorship-rate-calculator`,
      lastModified: '2026-02-14',
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tiktok-sponsorship-rate-calculator`,
      lastModified: '2026-02-14',
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/facebook-engagement-rate-calculator`,
      lastModified: '2026-02-14',
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/twitter-engagement-rate-calculator`,
      lastModified: '2026-02-14',
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/engagement-rate-benchmarks`,
      lastModified: '2026-02-14',
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: '2026-02-14',
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: '2026-02-14',
      changeFrequency: 'yearly',
      priority: 0.1,
    },
    ...nichePages,
  ];
}
