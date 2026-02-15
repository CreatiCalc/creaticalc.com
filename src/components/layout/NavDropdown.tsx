import Link from 'next/link';
import type { NavItem } from './navConfig';

interface NavDropdownProps {
  label: string;
  items: NavItem[];
  panelId: string;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  /** "left" aligns dropdown to the left edge, "right" to the right edge */
  align?: 'left' | 'right';
}

export default function NavDropdown({
  label,
  items,
  panelId,
  isOpen,
  onToggle,
  onClose,
  align = 'left',
}: NavDropdownProps) {
  return (
    <div className="relative">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-controls={panelId}
        className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-surface-alt hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
      >
        {label}
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
        >
          <path d="M3 5l3 3 3-3" />
        </svg>
      </button>
      {isOpen && (
        <div
          id={panelId}
          role="menu"
          className={`absolute top-full z-50 pt-1 ${align === 'right' ? 'right-0' : 'left-0'}`}
        >
          <div className="animate-dropdown-in min-w-56 rounded-xl border border-border bg-white p-1.5 shadow-lg">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                role="menuitem"
                onClick={onClose}
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
}
