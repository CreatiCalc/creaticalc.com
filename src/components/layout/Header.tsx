import Link from 'next/link';
import Logo from '@/components/brand/Logo';
import HeaderNav from './HeaderNav';
import MobileNav from './MobileNavLazy';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/50 bg-white/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="transition-opacity hover:opacity-80">
          <Logo size="sm" />
        </Link>
        <HeaderNav />
        <MobileNav />
      </div>
    </header>
  );
}
