'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { NAV_GROUPS, MORE_LINKS } from './navConfig';

const navGroups = NAV_GROUPS;
const moreLinks = MORE_LINKS;

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
            aria-hidden="true"
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
            aria-hidden="true"
          >
            <line x1="3" y1="5" x2="17" y2="5" />
            <line x1="3" y1="10" x2="17" y2="10" />
            <line x1="3" y1="15" x2="17" y2="15" />
          </svg>
        )}
      </button>

      {open && (
        <nav className="absolute right-0 top-full z-50 mt-2 w-64 rounded-xl border border-border bg-white p-2 shadow-lg">
          {navGroups.map((group, i) => (
            <div key={group.label} className={i > 0 ? 'mt-1' : ''}>
              <span className="block px-4 pb-1 pt-2 text-xs font-semibold uppercase tracking-wider text-muted">
                {group.label}
              </span>
              {group.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-4 py-2.5 text-sm text-muted transition-colors hover:bg-surface-alt hover:text-foreground"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          ))}
          <div className="mx-3 my-1.5 border-t border-border/50" />
          <span className="block px-4 pb-1 pt-2 text-xs font-semibold uppercase tracking-wider text-muted">
            More
          </span>
          {moreLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-4 py-2.5 text-sm text-muted transition-colors hover:bg-surface-alt hover:text-foreground"
            >
              {link.name}
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
}
