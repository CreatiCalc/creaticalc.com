'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Logo from '@/components/brand/Logo';
import MobileNav from './MobileNav';
import { NAV_GROUPS, MORE_LINKS } from './navConfig';

const navGroups = NAV_GROUPS;
const moreLinks = MORE_LINKS;

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

  // "More" uses a sentinel index after the navGroups
  const moreIndex = navGroups.length;

  return (
    <header className="sticky top-0 z-40 border-b border-border/50 bg-white/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="transition-opacity hover:opacity-80">
          <Logo size="sm" />
        </Link>
        <nav className="hidden items-center gap-1 md:flex" ref={navRef}>
          {navGroups.map((group, i) => {
            const panelId = `nav-panel-${group.label.toLowerCase()}`;
            return (
              <div key={group.label} className="relative">
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-expanded={openIndex === i}
                  aria-haspopup="menu"
                  aria-controls={panelId}
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
                    className={`transition-transform ${openIndex === i ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                  >
                    <path d="M3 5l3 3 3-3" />
                  </svg>
                </button>
                {openIndex === i && (
                  <div id={panelId} role="menu" className="absolute left-0 top-full z-50 pt-1">
                    <div className="min-w-56 rounded-xl border border-border bg-white p-1.5 shadow-lg">
                      {group.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          role="menuitem"
                          onClick={() => setOpenIndex(null)}
                          className="block rounded-lg px-4 py-2.5 text-sm text-muted transition-colors hover:bg-surface-alt hover:text-foreground"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          <div className="relative">
            <button
              type="button"
              onClick={() => toggle(moreIndex)}
              aria-expanded={openIndex === moreIndex}
              aria-haspopup="menu"
              aria-controls="nav-panel-more"
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
                className={`transition-transform ${openIndex === moreIndex ? 'rotate-180' : ''}`}
                aria-hidden="true"
              >
                <path d="M3 5l3 3 3-3" />
              </svg>
            </button>
            {openIndex === moreIndex && (
              <div id="nav-panel-more" role="menu" className="absolute right-0 top-full z-50 pt-1">
                <div className="min-w-56 rounded-xl border border-border bg-white p-1.5 shadow-lg">
                  {moreLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      role="menuitem"
                      onClick={() => setOpenIndex(null)}
                      className="block rounded-lg px-4 py-2.5 text-sm text-muted transition-colors hover:bg-surface-alt hover:text-foreground"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>
        <MobileNav />
      </div>
    </header>
  );
}
