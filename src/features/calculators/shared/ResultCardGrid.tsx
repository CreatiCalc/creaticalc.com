'use client';

import { useState, type ReactNode, Children } from 'react';

interface ResultCardGridProps {
  /** Tab labels for mobile view (must match the number of children) */
  labels: string[];
  children: ReactNode;
}

/**
 * On mobile: renders a tab bar with one card visible at a time.
 * On desktop (sm+): renders the standard 3-column grid with all cards.
 */
export default function ResultCardGrid({ labels, children }: ResultCardGridProps) {
  const [activeTab, setActiveTab] = useState(1); // default to middle (usually "Monthly")
  const cards = Children.toArray(children);

  return (
    <>
      {/* Mobile: tab bar + single card */}
      <div className="sm:hidden">
        <div className="mb-3 flex rounded-lg border border-border bg-surface" role="tablist">
          {labels.map((label, i) => (
            <button
              key={label}
              type="button"
              role="tab"
              aria-selected={activeTab === i}
              onClick={() => setActiveTab(i)}
              className={`flex-1 rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                activeTab === i
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-muted hover:text-foreground'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        {cards[activeTab]}
      </div>

      {/* Desktop: standard grid */}
      <div className="hidden gap-4 sm:grid sm:grid-cols-3">{children}</div>
    </>
  );
}
