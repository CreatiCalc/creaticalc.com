import { Platform } from '@/lib/platforms';
import { getAllCalculators } from '@/lib/calculatorRegistry';
import { PLATFORM_HUBS } from '@/lib/platformHubData';

export interface NavItem {
  name: string;
  href: string;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

// ─── Header Nav ─────────────────────────────────────────────────────────────────
// Auto-generated from calculator registry + platform hub data.
// Adding a new calculator automatically updates the nav.

export const NAV_GROUPS: NavGroup[] = PLATFORM_HUBS.map((hub) => ({
  label: hub.platform,
  items: [
    { name: `All ${hub.displayName} Tools`, href: `/${hub.slug}` },
    ...getAllCalculators()
      .filter((c) => c.platform === hub.platform)
      .map((c) => ({ name: c.navLabel, href: c.href })),
  ],
}));

const multiPlatformCalcs = getAllCalculators()
  .filter((c) => c.platform === Platform.Multi)
  .map((c) => ({ name: c.navLabel, href: c.href }));

export const MORE_LINKS: NavItem[] = [
  ...multiPlatformCalcs,
  { name: 'Glossary', href: '/glossary' },
  { name: 'About', href: '/about' },
];

// ─── Footer ─────────────────────────────────────────────────────────────────────
// Footer uses a different grouping than the header nav — kept here as the
// single source of truth for all site-wide link data.
// The YouTube, Engagement, and Sponsorship groups are auto-generated from the
// registry. The Company group is manual (static pages).

const allCalcs = getAllCalculators();

const youtubeOnlyCalcs = allCalcs
  .filter((c) => c.platform === Platform.YouTube && !c.slug.includes('sponsorship'))
  .map((c) => ({ name: c.navLabel, href: c.href }));

const engagementCalcs = allCalcs
  .filter(
    (c) =>
      c.platform !== Platform.YouTube &&
      c.slug.includes('engagement') &&
      !c.slug.includes('benchmarks'),
  )
  .map((c) =>
    c.platform === Platform.Multi
      ? { name: 'All Platforms', href: c.href }
      : { name: c.title.replace(' Engagement Rate Calculator', ''), href: c.href },
  );

const sponsorshipCalcs = allCalcs
  .filter((c) => c.slug.includes('sponsorship'))
  .map((c) =>
    c.platform === Platform.Multi
      ? { name: 'All Platforms', href: c.href }
      : { name: c.title.replace(' Sponsorship Rate Calculator', ''), href: c.href },
  );

export const FOOTER_GROUPS: NavGroup[] = [
  {
    label: Platform.YouTube,
    items: youtubeOnlyCalcs,
  },
  {
    label: 'Engagement Rates',
    items: [
      ...engagementCalcs,
      { name: 'Benchmarks 2026', href: '/engagement-rate-benchmarks' },
    ],
  },
  {
    label: 'Sponsorship Rates',
    items: sponsorshipCalcs,
  },
  {
    label: 'Company',
    items: [
      { name: 'About', href: '/about' },
      { name: 'Methodology', href: '/methodology' },
      { name: 'Glossary', href: '/glossary' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Contact', href: '/contact' },
    ],
  },
];
