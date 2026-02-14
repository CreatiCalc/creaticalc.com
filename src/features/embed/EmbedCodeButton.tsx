'use client';

import { useState, useRef, useCallback, useMemo } from 'react';
import { HexColorPicker } from 'react-colorful';
import { SITE_URL } from '@/lib/siteConfig';
import { getCalculatorBySlug } from '@/lib/calculatorRegistry';
import { COLOR_PRESETS } from './EmbedWrapper';

interface EmbedCodeButtonProps {
  slug: string;
}

export function EmbedCodeButton({ slug }: EmbedCodeButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-muted transition-colors hover:border-primary hover:text-primary"
      >
        <svg
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
        Embed
      </button>
      {open && <EmbedCodeDialog slug={slug} onClose={() => setOpen(false)} />}
    </>
  );
}

const colorOptions = Object.entries(COLOR_PRESETS).map(([name, { primary }]) => ({
  name,
  hex: primary,
}));

const HEIGHT_PRESETS = [400, 600, 800];

interface EmbedCodeDialogProps {
  slug: string;
  onClose: () => void;
}

function EmbedCodeDialog({ slug, onClose }: EmbedCodeDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [color, setColor] = useState('purple');
  const [height, setHeight] = useState(600);
  const [copied, setCopied] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [includeAutoResize, setIncludeAutoResize] = useState(true);

  const calcTitle = getCalculatorBySlug(slug)?.title ?? 'Calculator';

  const resolvedColor = useMemo(() => {
    if (COLOR_PRESETS[color]) return COLOR_PRESETS[color].primary;
    return `#${color}`;
  }, [color]);

  const isDark = theme === 'dark';

  const params = new URLSearchParams();
  if (theme === 'dark') params.set('theme', 'dark');
  if (color !== 'purple') params.set('color', color);
  const qs = params.toString();
  const embedUrl = `${SITE_URL}/embed/${slug}${qs ? `?${qs}` : ''}`;

  const iframeCode = `<iframe src="${embedUrl}" width="100%" height="${height}" style="border:none;border-radius:8px;" loading="lazy" title="CreatiCalc"></iframe>`;

  const autoResizeScript = `\n<script>
window.addEventListener('message', function(e) {
  if (e.data && e.data.type === 'creaticalc-resize') {
    var iframe = document.querySelector('iframe[src*="creaticalc.com/embed"]');
    if (iframe) iframe.style.height = e.data.height + 'px';
  }
});
</script>`;

  const fullCode = includeAutoResize ? iframeCode + autoResizeScript : iframeCode;

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(fullCode);
    } catch {
      const input = document.createElement('textarea');
      input.value = fullCode;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [fullCode]);

  const setDialogRef = useCallback((node: HTMLDialogElement | null) => {
    (dialogRef as React.MutableRefObject<HTMLDialogElement | null>).current = node;
    if (node && !node.open) {
      node.showModal();
    }
  }, []);

  return (
    <dialog
      ref={setDialogRef}
      onClose={onClose}
      className="m-auto w-full max-w-lg rounded-xl border border-border bg-background p-0 shadow-xl backdrop:bg-foreground/40"
    >
      <div className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Embed This Calculator</h2>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label="Close dialog"
            className="rounded-lg p-1 text-muted hover:bg-surface hover:text-foreground"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Theme toggle with sun/moon icons */}
        <div className="mb-4 flex items-center gap-4">
          <label className="text-sm font-medium text-foreground">Theme</label>
          <div className="flex gap-1 rounded-lg border border-border p-0.5">
            <button
              type="button"
              onClick={() => setTheme('light')}
              className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1 text-sm font-medium transition-colors ${
                theme === 'light' ? 'text-white' : 'text-muted hover:text-foreground'
              }`}
              style={theme === 'light' ? { background: resolvedColor } : undefined}
            >
              <svg
                className="h-3.5 w-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
              Light
            </button>
            <button
              type="button"
              onClick={() => setTheme('dark')}
              className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1 text-sm font-medium transition-colors ${
                theme === 'dark' ? 'text-white' : 'text-muted hover:text-foreground'
              }`}
              style={theme === 'dark' ? { background: resolvedColor } : undefined}
            >
              <svg
                className="h-3.5 w-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
              Dark
            </button>
          </div>
        </div>

        {/* Color swatches + custom picker */}
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium text-foreground">Accent Color</label>
          <div className="flex flex-wrap gap-2">
            {colorOptions.map((opt) => (
              <button
                key={opt.name}
                type="button"
                onClick={() => setColor(opt.name)}
                className={`h-8 w-8 rounded-full border-2 transition-transform ${
                  color === opt.name ? 'scale-110 border-foreground' : 'border-transparent'
                }`}
                style={{ backgroundColor: opt.hex }}
                title={opt.name.charAt(0).toUpperCase() + opt.name.slice(1)}
              />
            ))}
            <div className="relative">
              <button
                type="button"
                onClick={() => setPickerOpen(!pickerOpen)}
                className={`h-8 w-8 rounded-full border-2 transition-transform ${
                  !COLOR_PRESETS[color]
                    ? 'scale-110 border-foreground'
                    : 'border-border hover:border-muted'
                }`}
                style={{
                  background: !COLOR_PRESETS[color]
                    ? `#${color}`
                    : 'conic-gradient(red, yellow, lime, aqua, blue, magenta, red)',
                }}
                title="Custom color"
              />
              {pickerOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setPickerOpen(false)} />
                  <div className="absolute top-10 right-0 z-20 rounded-lg border border-border bg-background p-3 shadow-xl">
                    <HexColorPicker
                      color={COLOR_PRESETS[color]?.primary ?? `#${color}`}
                      onChange={(hex) => setColor(hex.replace('#', ''))}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Live preview */}
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium text-foreground">Preview</label>
          <div
            className="overflow-hidden rounded-lg border text-xs transition-colors"
            style={{
              background: isDark ? '#0f172a' : '#ffffff',
              borderColor: isDark ? '#334155' : '#e2e8f0',
              color: isDark ? '#e2e8f0' : '#0f172a',
            }}
          >
            <div className="px-4 pt-3 pb-2 font-bold" style={{ fontSize: '0.8rem' }}>
              {calcTitle}
            </div>
            <div className="flex gap-2 px-4 pb-2">
              <div
                className="flex-1 rounded-md px-2 py-1.5"
                style={{ background: isDark ? '#1e293b' : '#f8fafc' }}
              >
                <div
                  className="mb-1"
                  style={{ color: isDark ? '#94a3b8' : '#475569', fontSize: '0.65rem' }}
                >
                  Daily Views
                </div>
                <div className="font-semibold" style={{ fontSize: '0.75rem' }}>
                  50,000
                </div>
              </div>
              <div
                className="flex-1 rounded-md border px-2 py-1.5"
                style={{
                  borderColor: `${resolvedColor}30`,
                  background: `${resolvedColor}08`,
                }}
              >
                <div className="relative mb-1 overflow-hidden rounded-sm" style={{ height: 2 }}>
                  <div className="absolute inset-0" style={{ background: resolvedColor }} />
                </div>
                <div
                  className="mb-0.5"
                  style={{ color: isDark ? '#94a3b8' : '#475569', fontSize: '0.65rem' }}
                >
                  Estimated Earnings
                </div>
                <div className="font-bold" style={{ color: resolvedColor, fontSize: '0.75rem' }}>
                  $120 — $340
                </div>
              </div>
            </div>
            <div
              className="flex items-center justify-center gap-1 border-t px-4 py-1.5"
              style={{ borderColor: isDark ? '#334155' : '#e2e8f0' }}
            >
              <span style={{ color: isDark ? '#94a3b8' : '#475569', fontSize: '0.6rem' }}>
                Powered by
              </span>
              <span style={{ color: resolvedColor, fontSize: '0.6rem', fontWeight: 500 }}>
                CreatiCalc
              </span>
            </div>
          </div>
        </div>

        {/* Height with presets */}
        <div className="mb-4 flex items-center gap-3">
          <label htmlFor="embed-height" className="text-sm font-medium text-foreground">
            Height
          </label>
          <div className="flex gap-1">
            {HEIGHT_PRESETS.map((h) => (
              <button
                key={h}
                type="button"
                onClick={() => setHeight(h)}
                className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                  height === h
                    ? 'text-white'
                    : 'border border-border text-muted hover:text-foreground'
                }`}
                style={height === h ? { background: resolvedColor } : undefined}
              >
                {h}px
              </button>
            ))}
          </div>
          <input
            id="embed-height"
            type="number"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value) || 600)}
            min={300}
            max={1200}
            className="w-20 rounded-lg border border-border bg-surface px-2.5 py-1 text-sm text-foreground"
          />
        </div>

        {/* Auto-resize toggle */}
        <label className="mb-4 flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            checked={includeAutoResize}
            onChange={(e) => setIncludeAutoResize(e.target.checked)}
            className="h-4 w-4 rounded accent-primary"
          />
          <span className="text-sm font-medium text-foreground">Include auto-resize script</span>
          <span className="text-xs text-muted">(recommended)</span>
        </label>

        {/* Embed code */}
        <div className="mb-3">
          <label className="mb-1 block text-sm font-medium text-foreground">Embed Code</label>
          <textarea
            readOnly
            value={fullCode}
            rows={includeAutoResize ? 6 : 3}
            className="w-full rounded-lg border border-border bg-surface px-3 py-2 font-mono text-xs text-foreground"
            onFocus={(e) => e.target.select()}
          />
        </div>

        {/* Copy button with checkmark */}
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors"
          style={{ background: copied ? '#10b981' : resolvedColor }}
        >
          {copied ? (
            <>
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              Copy Embed Code
            </>
          )}
        </button>
      </div>
    </dialog>
  );
}
