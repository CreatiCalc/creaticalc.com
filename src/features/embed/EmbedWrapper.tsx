'use client';

import { useEffect, useRef, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { EmbedContext } from '@/lib/embedContext';
import { SITE_URL } from '@/lib/siteConfig';

const COLOR_PRESETS: Record<string, { primary: string; primaryDark: string }> = {
  purple: { primary: '#7c3aed', primaryDark: '#5b21b6' },
  blue: { primary: '#2563eb', primaryDark: '#1d4ed8' },
  green: { primary: '#059669', primaryDark: '#047857' },
  red: { primary: '#dc2626', primaryDark: '#b91c1c' },
  pink: { primary: '#db2777', primaryDark: '#be185d' },
  orange: { primary: '#ea580c', primaryDark: '#c2410c' },
  teal: { primary: '#0d9488', primaryDark: '#0f766e' },
};

function resolveColor(param: string | null): { primary: string; primaryDark: string } | null {
  if (!param) return null;
  if (COLOR_PRESETS[param]) return COLOR_PRESETS[param];
  // Accept raw hex (with or without #)
  const hex = param.replace(/^#/, '');
  if (/^[0-9a-fA-F]{6}$/.test(hex)) {
    // Darken by ~20% for the dark variant
    const r = Math.round(parseInt(hex.slice(0, 2), 16) * 0.8);
    const g = Math.round(parseInt(hex.slice(2, 4), 16) * 0.8);
    const b = Math.round(parseInt(hex.slice(4, 6), 16) * 0.8);
    return {
      primary: `#${hex}`,
      primaryDark: `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`,
    };
  }
  return null;
}

interface EmbedWrapperProps {
  title: string;
  canonicalPath: string;
  children: React.ReactNode;
}

export default function EmbedWrapper({ title, canonicalPath, children }: EmbedWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const theme = searchParams.get('theme');
  const colorParam = searchParams.get('color');

  const colorOverrides = useMemo(() => resolveColor(colorParam), [colorParam]);

  const style = useMemo(() => {
    if (!colorOverrides) return undefined;
    return {
      '--color-primary': colorOverrides.primary,
      '--color-primary-dark': colorOverrides.primaryDark,
    } as React.CSSProperties;
  }, [colorOverrides]);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const height = entry.borderBoxSize?.[0]?.blockSize ?? entry.contentRect.height;
        window.parent.postMessage({ type: 'creaticalc-resize', height }, '*');
      }
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <EmbedContext.Provider value={true}>
      <div ref={containerRef} className={theme === 'dark' ? 'embed-dark' : undefined} style={style}>
        <div className="mx-auto max-w-4xl px-4 py-4">
          <h1 className="mb-4 text-xl font-bold text-foreground">{title}</h1>
          {children}
          <div className="mt-6 border-t border-border pt-3 text-center text-xs text-muted">
            Powered by{' '}
            <a
              href={`${SITE_URL}${canonicalPath}?utm_source=embed&utm_medium=widget`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary hover:underline"
            >
              CreatiCalc
            </a>
          </div>
        </div>
      </div>
    </EmbedContext.Provider>
  );
}

export { COLOR_PRESETS };
