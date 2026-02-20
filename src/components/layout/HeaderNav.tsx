'use client';

import { useState, useCallback, useRef } from 'react';
import { usePathname } from 'next/navigation';
import NavDropdown from './NavDropdown';
import { NAV_GROUPS, MORE_LINKS } from './navConfig';
import useClickOutside from '@/components/ui/useClickOutside';
import useEscapeKey from '@/components/ui/useEscapeKey';

export default function HeaderNav() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  const close = useCallback(() => setOpenIndex(null), []);

  useClickOutside(navRef, close, openIndex !== null);
  useEscapeKey(close, openIndex !== null);

  function toggle(index: number) {
    setOpenIndex((prev) => (prev === index ? null : index));
  }

  return (
    <nav className="hidden items-center gap-1 md:flex" ref={navRef} aria-label="Main navigation">
      {NAV_GROUPS.map((group, i) => (
        <NavDropdown
          key={group.label}
          label={group.label}
          items={group.items}
          panelId={`nav-panel-${group.label.toLowerCase()}`}
          isOpen={openIndex === i}
          onToggle={() => toggle(i)}
          onClose={close}
          pathname={pathname}
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
        pathname={pathname}
      />
    </nav>
  );
}
