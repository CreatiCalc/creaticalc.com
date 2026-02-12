import Link from 'next/link';
import Logo from '@/components/brand/Logo';
import MobileNav from './MobileNav';

const navGroups = [
  {
    label: 'YouTube',
    items: [
      { name: 'Money Calculator', href: '/youtube-money-calculator' },
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
];

const moreLinks = [
  { name: 'Engagement Calculator', href: '/engagement-rate-calculator' },
  { name: 'Engagement Benchmarks', href: '/engagement-rate-benchmarks' },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/50 bg-white/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="transition-opacity hover:opacity-80">
          <Logo size="sm" />
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {navGroups.map((group) => (
            <div key={group.label} className="group relative">
              <button
                type="button"
                className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-surface-alt hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
              >
                {group.label}
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform group-hover:rotate-180 group-focus-within:rotate-180"
                  aria-hidden="true"
                >
                  <path d="M3 5l3 3 3-3" />
                </svg>
              </button>
              <div className="invisible absolute left-0 top-full z-50 pt-1 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                <div className="min-w-48 rounded-xl border border-border bg-white p-1.5 shadow-lg">
                  {group.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block rounded-lg px-4 py-2.5 text-sm text-muted transition-colors hover:bg-surface-alt hover:text-foreground"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
          <div className="group relative">
            <button
              type="button"
              className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-surface-alt hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
            >
              More
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform group-hover:rotate-180 group-focus-within:rotate-180"
                aria-hidden="true"
              >
                <path d="M3 5l3 3 3-3" />
              </svg>
            </button>
            <div className="invisible absolute right-0 top-full z-50 pt-1 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div className="min-w-48 rounded-xl border border-border bg-white p-1.5 shadow-lg">
                {moreLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block rounded-lg px-4 py-2.5 text-sm text-muted transition-colors hover:bg-surface-alt hover:text-foreground"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>
        <MobileNav />
      </div>
    </header>
  );
}
