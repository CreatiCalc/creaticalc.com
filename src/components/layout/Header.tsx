import Link from 'next/link';
import Logo from '@/components/brand/Logo';
import MobileNav from './MobileNav';

const calculators = [
  { name: 'YouTube Money Calculator', href: '/youtube-money-calculator' },
  { name: 'Instagram Engagement', href: '/instagram-engagement-rate-calculator' },
  { name: 'TikTok Engagement', href: '/tiktok-engagement-rate-calculator' },
  { name: 'YouTube Growth Projector', href: '/youtube-subscriber-projector' },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/50 bg-white/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="transition-opacity hover:opacity-80">
          <Logo size="sm" />
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {calculators.map((calc) => (
            <Link
              key={calc.href}
              href={calc.href}
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              {calc.name}
            </Link>
          ))}
        </nav>
        <MobileNav />
      </div>
    </header>
  );
}
