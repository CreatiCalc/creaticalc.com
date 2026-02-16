import type { MetadataRoute } from 'next';
import { NICHE_PAGES } from '@/lib/nichePageData';
import { SITE_URL } from '@/lib/siteConfig';
import { SPONSORSHIP_NICHE_PAGES } from '@/lib/sponsorship-niches';
import { ENGAGEMENT_NICHE_PAGES } from '@/lib/engagement-niches';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;

  const nichePages: MetadataRoute.Sitemap = NICHE_PAGES.map((n) => ({
    url: `${baseUrl}/youtube-money-calculator/${n.slug}`,
    lastModified: '2026-02-12',
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const sponsorshipNichePages: MetadataRoute.Sitemap = SPONSORSHIP_NICHE_PAGES.map((n) => ({
    url: `${baseUrl}/${n.platform}-sponsorship-rate-calculator/${n.slug}`,
    lastModified: '2026-02-16',
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const engagementNichePages: MetadataRoute.Sitemap = ENGAGEMENT_NICHE_PAGES.map((n) => ({
    url: `${baseUrl}/${n.platform}-engagement-rate-calculator/${n.slug}`,
    lastModified: '2026-02-16',
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: '2026-02-15',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // Platform hub pages
    {
      url: `${baseUrl}/youtube`,
      lastModified: '2026-02-15',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/instagram`,
      lastModified: '2026-02-15',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tiktok`,
      lastModified: '2026-02-15',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/facebook`,
      lastModified: '2026-02-15',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/x`,
      lastModified: '2026-02-15',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // Individual calculators
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
      url: `${baseUrl}/youtube-sponsorship-rate-calculator`,
      lastModified: '2026-02-14',
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/facebook-sponsorship-rate-calculator`,
      lastModified: '2026-02-14',
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/twitter-sponsorship-rate-calculator`,
      lastModified: '2026-02-14',
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/engagement-rate-benchmarks`,
      lastModified: '2026-02-14',
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/glossary`,
      lastModified: '2026-02-16',
      changeFrequency: 'monthly',
      priority: 0.6,
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
    ...sponsorshipNichePages,
    ...engagementNichePages,
  ];
}
