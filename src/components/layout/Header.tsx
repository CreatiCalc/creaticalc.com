import Link from 'next/link';
import MobileNav from './MobileNav';

const calculators = [
  { name: 'YouTube Money Calculator', href: '/youtube-money-calculator' },
  { name: 'Instagram Engagement', href: '/instagram-engagement-rate-calculator' },
  { name: 'TikTok Engagement', href: '/tiktok-engagement-rate-calculator' },
  { name: 'YouTube Growth Projector', href: '/youtube-subscriber-projector' },
];

export default function Header() {
  return (
    <header className="border-b border-border bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-bold text-primary">
          CreatiCalc
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
