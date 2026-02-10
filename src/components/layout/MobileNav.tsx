'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const calculators = [
  { name: 'YouTube Money Calculator', href: '/youtube-money-calculator' },
  { name: 'Instagram Engagement', href: '/instagram-engagement-rate-calculator' },
  { name: 'TikTok Engagement', href: '/tiktok-engagement-rate-calculator' },
  { name: 'YouTube Growth Projector', href: '/youtube-subscriber-projector' },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <div className="relative md:hidden" ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label="Toggle navigation menu"
        aria-expanded={open}
        className="flex h-10 w-10 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface-alt hover:text-foreground"
      >
        {open ? (
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <line x1="4" y1="4" x2="16" y2="16" />
            <line x1="16" y1="4" x2="4" y2="16" />
          </svg>
        ) : (
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <line x1="3" y1="5" x2="17" y2="5" />
            <line x1="3" y1="10" x2="17" y2="10" />
            <line x1="3" y1="15" x2="17" y2="15" />
          </svg>
        )}
      </button>

      {open && (
        <nav className="absolute right-0 top-full z-50 mt-2 w-64 rounded-xl border border-border bg-white p-2 shadow-lg">
          {calculators.map((calc) => (
            <Link
              key={calc.href}
              href={calc.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-4 py-3 text-sm text-muted transition-colors hover:bg-surface-alt hover:text-foreground"
            >
              {calc.name}
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
}
