import Link from 'next/link';
import Logo from '@/components/brand/Logo';

const footerGroups = [
  {
    label: 'YouTube',
    links: [
      { name: 'Money Calculator', href: '/youtube-money-calculator' },
      { name: 'Shorts Calculator', href: '/youtube-shorts-money-calculator' },
      { name: 'Growth Projector', href: '/youtube-subscriber-projector' },
    ],
  },
  {
    label: 'Instagram',
    links: [
      { name: 'Engagement Rate', href: '/instagram-engagement-rate-calculator' },
      { name: 'Sponsorship Rate', href: '/instagram-sponsorship-rate-calculator' },
    ],
  },
  {
    label: 'TikTok',
    links: [
      { name: 'Engagement Rate', href: '/tiktok-engagement-rate-calculator' },
      { name: 'Sponsorship Rate', href: '/tiktok-sponsorship-rate-calculator' },
    ],
  },
  {
    label: 'More',
    links: [
      { name: 'Engagement Calculator', href: '/engagement-rate-calculator' },
      { name: 'Engagement Benchmarks', href: '/engagement-rate-benchmarks' },
    ],
  },
  {
    label: 'Company',
    links: [
      { name: 'About', href: '/about' },
      { name: 'Privacy Policy', href: '/privacy' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface py-12">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-8 text-center sm:grid-cols-2 sm:text-left md:grid-cols-3 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr_1fr]">
          <div className="sm:col-span-2 md:col-span-3 lg:col-span-1">
            <Logo size="sm" />
            <p className="mt-3 text-sm text-muted">
              Free calculators for content creators. Estimate earnings, track engagement, and
              project growth.
            </p>
          </div>
          {footerGroups.map((group) => (
            <div key={group.label}>
              <p className="mb-3 font-semibold">{group.label}</p>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted transition-colors hover:text-foreground"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-8 max-w-6xl border-t border-border px-4 pt-6">
        <p className="mx-auto max-w-3xl text-center text-xs leading-relaxed text-muted/70">
          <strong>Disclaimer:</strong> All calculators on CreatiCalc provide estimates for
          informational purposes only. Results are based on publicly available data and industry
          averages and should not be considered financial, business, or professional advice. Actual
          earnings, engagement rates, and growth will vary. CreatiCalc is not affiliated with
          YouTube, Instagram, TikTok, or any other platform.
        </p>
        <p className="mt-4 text-center text-sm text-muted">
          &copy; {new Date().getFullYear()} CreatiCalc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
