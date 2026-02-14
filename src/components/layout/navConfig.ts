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
    items: [{ name: 'Engagement Rate', href: '/facebook-engagement-rate-calculator' }],
  },
  {
    label: 'X',
    items: [{ name: 'Engagement Rate', href: '/twitter-engagement-rate-calculator' }],
  },
];

export const MORE_LINKS: NavItem[] = [
  { name: 'Engagement Calculator', href: '/engagement-rate-calculator' },
  { name: 'Engagement Benchmarks', href: '/engagement-rate-benchmarks' },
  { name: 'About', href: '/about' },
];
