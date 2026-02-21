import type { MetadataRoute } from 'next';
import { getAllCalculators } from '@/lib/calculatorRegistry';
import { NICHE_PAGES } from '@/lib/nichePageData';
import { PLATFORM_HUBS } from '@/lib/platformHubData';
import { SITE_URL } from '@/lib/siteConfig';
import { SPONSORSHIP_NICHE_PAGES } from '@/lib/sponsorship-niches';
import { ENGAGEMENT_NICHE_PAGES } from '@/lib/engagement-niches';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;

  // ─── Auto-generated from registries ─────────────────────────────────────────

  const hubPages: MetadataRoute.Sitemap = PLATFORM_HUBS.map((h) => ({
    url: `${baseUrl}/${h.slug}`,
    lastModified: '2026-02-15',
    changeFrequency: 'monthly',
    priority: 0.9,
  }));

  const calculatorPages: MetadataRoute.Sitemap = getAllCalculators().map((c) => ({
    url: `${baseUrl}${c.href}`,
    lastModified: '2026-02-20',
    changeFrequency: 'weekly',
    priority: c.sitemapPriority ?? 0.9,
  }));

  const nichePages: MetadataRoute.Sitemap = NICHE_PAGES.map((n) => ({
    url: `${baseUrl}/youtube-money-calculator/${n.slug}`,
    lastModified: '2026-02-20',
    changeFrequency: 'monthly',
    priority: 0.5,
  }));

  const sponsorshipNichePages: MetadataRoute.Sitemap = SPONSORSHIP_NICHE_PAGES.map((n) => ({
    url: `${baseUrl}/${n.platform}-sponsorship-rate-calculator/${n.slug}`,
    lastModified: '2026-02-20',
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const engagementNichePages: MetadataRoute.Sitemap = ENGAGEMENT_NICHE_PAGES.map((n) => ({
    url: `${baseUrl}/${n.platform}-engagement-rate-calculator/${n.slug}`,
    lastModified: '2026-02-20',
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // ─── Static pages ───────────────────────────────────────────────────────────

  return [
    {
      url: baseUrl,
      lastModified: '2026-02-20',
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    ...hubPages,
    ...calculatorPages,
    {
      url: `${baseUrl}/glossary`,
      lastModified: '2026-02-20',
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: '2026-02-20',
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/methodology`,
      lastModified: '2026-02-20',
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: '2026-02-20',
      changeFrequency: 'yearly',
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
