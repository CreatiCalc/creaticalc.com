'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Drawer } from 'vaul';
import { NAV_GROUPS, MORE_LINKS } from './navConfig';
import { Platform } from '@/lib/platforms';

const PLATFORM_DOTS: Record<string, string> = {
  [Platform.YouTube]: 'bg-red-500',
  [Platform.Instagram]: 'bg-pink-500',
  [Platform.TikTok]: 'bg-cyan-500',
  [Platform.Facebook]: 'bg-blue-500',
  [Platform.X]: 'bg-sky-500',
};

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const pathname = usePathname();

  return (
    <Drawer.Root open={open} onOpenChange={setOpen}>
      {/* Trigger — hamburger button, only visible on mobile */}
      <Drawer.Trigger asChild>
        <button
          type="button"
          aria-label="Open navigation menu"
          className="flex h-10 w-10 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface-alt hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 md:hidden"
        >
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
        </button>
      </Drawer.Trigger>

      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-50 bg-black/40" />
        <Drawer.Content
          className="fixed inset-x-0 bottom-0 z-50 flex max-h-[85dvh] flex-col rounded-t-2xl border-t border-border bg-white shadow-xl focus:outline-none"
          aria-label="Mobile navigation"
        >
          <Drawer.Title className="sr-only">Navigation menu</Drawer.Title>

          {/* Handle */}
          <div className="flex justify-center pb-1 pt-3">
            <div className="h-1.5 w-10 rounded-full bg-border" />
          </div>

          {/* Scrollable nav body */}
          <nav className="flex-1 overflow-y-auto overscroll-contain px-3 pb-8">
            {NAV_GROUPS.map((group) => {
              const isExpanded = expandedSection === group.label;
              return (
                <div key={group.label} className="border-b border-border/40">
                  <button
                    type="button"
                    aria-expanded={isExpanded}
                    onClick={() => setExpandedSection(isExpanded ? null : group.label)}
                    className="flex w-full items-center gap-2.5 px-2 py-3 text-sm font-semibold text-foreground"
                  >
                    <span
                      className={`inline-block h-2 w-2 shrink-0 rounded-full ${PLATFORM_DOTS[group.label] ?? 'bg-muted'}`}
                    />
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
                      className={`ml-auto text-muted transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                      aria-hidden="true"
                    >
                      <path d="M3 4.5 6 7.5 9 4.5" />
                    </svg>
                  </button>

                  <div
                    className="grid transition-[grid-template-rows] duration-250 ease-out"
                    style={{ gridTemplateRows: isExpanded ? '1fr' : '0fr' }}
                  >
                    <div className="overflow-hidden">
                      <div className="space-y-0.5 pb-2 pl-2">
                        {group.items.map((item) => (
                          <Drawer.Close key={item.href} asChild>
                            <Link
                              href={item.href}
                              aria-current={pathname === item.href ? 'page' : undefined}
                              className={`block rounded-lg px-4 py-2.5 text-sm transition-colors ${
                                pathname === item.href
                                  ? 'bg-primary/8 font-medium text-primary'
                                  : 'text-muted hover:bg-surface-alt hover:text-foreground'
                              }`}
                            >
                              {item.name}
                            </Link>
                          </Drawer.Close>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* More section */}
            <div className="mt-3 space-y-0.5 px-2">
              <span className="block px-2 pb-1 text-xs font-semibold uppercase tracking-wider text-muted-light">
                More
              </span>
              {MORE_LINKS.map((link) => (
                <Drawer.Close key={link.href} asChild>
                  <Link
                    href={link.href}
                    aria-current={pathname === link.href ? 'page' : undefined}
                    className={`block rounded-lg px-4 py-2.5 text-sm transition-colors ${
                      pathname === link.href
                        ? 'bg-primary/8 font-medium text-primary'
                        : 'text-muted hover:bg-surface-alt hover:text-foreground'
                    }`}
                  >
                    {link.name}
                  </Link>
                </Drawer.Close>
              ))}
            </div>
          </nav>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
