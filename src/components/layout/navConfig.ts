export interface NavItem {
  name: string;
  href: string;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export const NAV_GROUPS: NavGroup[] = [
  {
    label: 'YouTube',
    items: [
      { name: 'Money Calculator', href: '/youtube-money-calculator' },
      { name: 'Shorts Calculator', href: '/youtube-shorts-money-calculator' },
      { name: 'Growth Projector', href: '/youtube-subscriber-projector' },
      { name: 'Sponsorship Rate', href: '/youtube-sponsorship-rate-calculator' },
    ],
  },
  {
    label: 'Instagram',
    items: [
      { name: 'Engagement Rate', href: '/instagram-engagement-rate-calculator' },
      { name: 'Sponsorship Rate', href: '/instagram-sponsorship-rate-calculator' },
    ],
  },
  {
    label: 'TikTok',
    items: [
      { name: 'Engagement Rate', href: '/tiktok-engagement-rate-calculator' },
      { name: 'Sponsorship Rate', href: '/tiktok-sponsorship-rate-calculator' },
    ],
  },
  {
    label: 'Facebook',
    items: [
      { name: 'Engagement Rate', href: '/facebook-engagement-rate-calculator' },
      { name: 'Sponsorship Rate', href: '/facebook-sponsorship-rate-calculator' },
    ],
  },
  {
    label: 'X',
    items: [
      { name: 'Engagement Rate', href: '/twitter-engagement-rate-calculator' },
      { name: 'Sponsorship Rate', href: '/twitter-sponsorship-rate-calculator' },
    ],
  },
];

export const MORE_LINKS: NavItem[] = [
  { name: 'Engagement Calculator', href: '/engagement-rate-calculator' },
  { name: 'Engagement Benchmarks', href: '/engagement-rate-benchmarks' },
  { name: 'About', href: '/about' },
];

// Footer uses a different grouping than the header nav — kept here as the
// single source of truth for all site-wide link data.
export const FOOTER_GROUPS: NavGroup[] = [
  {
    label: 'YouTube',
    items: [
      { name: 'Money Calculator', href: '/youtube-money-calculator' },
      { name: 'Shorts Calculator', href: '/youtube-shorts-money-calculator' },
      { name: 'Growth Projector', href: '/youtube-subscriber-projector' },
      { name: 'Sponsorship Rate', href: '/youtube-sponsorship-rate-calculator' },
    ],
  },
  {
    label: 'Engagement Rates',
    items: [
      { name: 'Instagram', href: '/instagram-engagement-rate-calculator' },
      { name: 'TikTok', href: '/tiktok-engagement-rate-calculator' },
      { name: 'Facebook', href: '/facebook-engagement-rate-calculator' },
      { name: 'X (Twitter)', href: '/twitter-engagement-rate-calculator' },
      { name: 'All Platforms', href: '/engagement-rate-calculator' },
      { name: 'Benchmarks 2026', href: '/engagement-rate-benchmarks' },
    ],
  },
  {
    label: 'Sponsorship Rates',
    items: [
      { name: 'YouTube', href: '/youtube-sponsorship-rate-calculator' },
      { name: 'Instagram', href: '/instagram-sponsorship-rate-calculator' },
      { name: 'TikTok', href: '/tiktok-sponsorship-rate-calculator' },
      { name: 'Facebook', href: '/facebook-sponsorship-rate-calculator' },
      { name: 'X (Twitter)', href: '/twitter-sponsorship-rate-calculator' },
    ],
  },
  {
    label: 'Company',
    items: [
      { name: 'About', href: '/about' },
      { name: 'Privacy Policy', href: '/privacy' },
    ],
  },
];
