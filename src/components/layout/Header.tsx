'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Logo from '@/components/brand/Logo';
import MobileNav from './MobileNav';
import NavDropdown from './NavDropdown';
import { NAV_GROUPS, MORE_LINKS } from './navConfig';

export default function Header() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (openIndex === null) return;

    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenIndex(null);
      }
    }

    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpenIndex(null);
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [openIndex]);

  function toggle(index: number) {
    setOpenIndex((prev) => (prev === index ? null : index));
  }

  const close = () => setOpenIndex(null);

  return (
    <header className="sticky top-0 z-40 border-b border-border/50 bg-white/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="transition-opacity hover:opacity-80">
          <Logo size="sm" />
        </Link>
        <nav
          className="hidden items-center gap-1 md:flex"
          ref={navRef}
          aria-label="Main navigation"
        >
          {NAV_GROUPS.map((group, i) => (
            <NavDropdown
              key={group.label}
              label={group.label}
              items={group.items}
              panelId={`nav-panel-${group.label.toLowerCase()}`}
              isOpen={openIndex === i}
              onToggle={() => toggle(i)}
              onClose={close}
            />
          ))}
          <NavDropdown
            label="More"
            items={MORE_LINKS}
            panelId="nav-panel-more"
            isOpen={openIndex === NAV_GROUPS.length}
            onToggle={() => toggle(NAV_GROUPS.length)}
            onClose={close}
            align="right"
          />
        </nav>
        <MobileNav />
      </div>
    </header>
  );
}
