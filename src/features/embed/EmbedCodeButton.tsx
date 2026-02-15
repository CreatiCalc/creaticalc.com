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
        className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-muted transition-all active:scale-[0.97] hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
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
      className="m-auto w-full max-w-lg overflow-visible rounded-2xl border border-border bg-background p-0 shadow-2xl backdrop:bg-foreground/50 backdrop:backdrop-blur-sm"
    >
      <div className="p-6">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
              <svg
                className="h-4.5 w-4.5 text-primary"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
            </div>
            <h2 className="font-display text-lg font-semibold text-foreground">
              Embed This Calculator
            </h2>
          </div>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label="Close dialog"
            className="rounded-lg p-1.5 text-muted-light transition-colors hover:bg-surface-alt hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Theme + Accent Color row */}
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
          {/* Theme toggle */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Theme</label>
            <div
              className="flex gap-1 rounded-full border border-border bg-surface p-1"
              role="radiogroup"
              aria-label="Embed theme"
            >
              <button
                type="button"
                role="radio"
                aria-checked={theme === 'light'}
                onClick={() => setTheme('light')}
                className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium transition-all active:scale-[0.97] ${
                  theme === 'light'
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-muted hover:text-foreground'
                }`}
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
                role="radio"
                aria-checked={theme === 'dark'}
                onClick={() => setTheme('dark')}
                className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium transition-all active:scale-[0.97] ${
                  theme === 'dark'
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-muted hover:text-foreground'
                }`}
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

          {/* Accent color */}
          <div className="min-w-0 flex-1 space-y-2">
            <label className="text-sm font-medium text-foreground">Accent Color</label>
            <div className="flex flex-wrap items-center gap-2">
              {colorOptions.map((opt) => (
                <button
                  key={opt.name}
                  type="button"
                  onClick={() => setColor(opt.name)}
                  className={`h-7 w-7 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 ${
                    color === opt.name
                      ? 'ring-2 ring-foreground ring-offset-2 ring-offset-background'
                      : 'hover:scale-110'
                  }`}
                  style={{ backgroundColor: opt.hex }}
                  aria-label={`${opt.name.charAt(0).toUpperCase() + opt.name.slice(1)} accent`}
                />
              ))}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setPickerOpen(!pickerOpen)}
                  className={`h-7 w-7 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 ${
                    !COLOR_PRESETS[color]
                      ? 'ring-2 ring-foreground ring-offset-2 ring-offset-background'
                      : 'hover:scale-110'
                  }`}
                  style={{
                    background: !COLOR_PRESETS[color]
                      ? `#${color}`
                      : 'conic-gradient(red, yellow, lime, aqua, blue, magenta, red)',
                  }}
                  aria-label="Custom accent color"
                />
                {pickerOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setPickerOpen(false)} />
                    <div className="absolute top-10 right-0 z-20 rounded-xl border border-border bg-background p-3 shadow-xl">
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
        </div>

        {/* Live preview */}
        <div className="mb-5">
          <label className="mb-2 block text-sm font-medium text-foreground">Preview</label>
          <div
            className="overflow-hidden rounded-xl border text-xs shadow-sm transition-colors"
            style={{
              background: isDark ? '#1c1917' : '#ffffff',
              borderColor: isDark ? '#44403c' : '#e7e5e4',
              color: isDark ? '#e7e5e4' : '#1c1917',
            }}
          >
            <div
              className="font-display px-4 pt-3 pb-2 font-semibold"
              style={{ fontSize: '0.8rem' }}
            >
              {calcTitle}
            </div>
            <div className="flex gap-2 px-4 pb-2">
              <div
                className="flex-1 rounded-lg px-2.5 py-2"
                style={{ background: isDark ? '#292524' : '#fafaf9' }}
              >
                <div
                  className="mb-1"
                  style={{ color: isDark ? '#a8a29e' : '#57534e', fontSize: '0.6rem' }}
                >
                  Daily Views
                </div>
                <div className="font-mono font-semibold" style={{ fontSize: '0.75rem' }}>
                  50,000
                </div>
              </div>
              <div
                className="relative flex-1 overflow-hidden rounded-lg border px-2.5 py-2"
                style={{
                  borderColor: `${resolvedColor}30`,
                  background: `${resolvedColor}08`,
                }}
              >
                <div
                  className="absolute inset-x-0 top-0 h-0.5"
                  style={{ background: resolvedColor }}
                  aria-hidden="true"
                />
                <div
                  className="mb-1"
                  style={{ color: isDark ? '#a8a29e' : '#57534e', fontSize: '0.6rem' }}
                >
                  Estimated Earnings
                </div>
                <div
                  className="font-mono font-bold"
                  style={{ color: resolvedColor, fontSize: '0.75rem' }}
                >
                  $120 — $340
                </div>
              </div>
            </div>
            <div
              className="flex items-center justify-center gap-1 border-t px-4 py-1.5"
              style={{ borderColor: isDark ? '#44403c' : '#e7e5e4' }}
            >
              <span style={{ color: isDark ? '#a8a29e' : '#57534e', fontSize: '0.6rem' }}>
                Powered by
              </span>
              <span style={{ color: resolvedColor, fontSize: '0.6rem', fontWeight: 600 }}>
                CreatiCalc
              </span>
            </div>
          </div>
        </div>

        {/* Height + auto-resize section */}
        <div className="mb-5 rounded-xl border border-border bg-surface/50 p-4">
          <div className="flex flex-wrap items-center gap-3">
            <label htmlFor="embed-height" className="text-sm font-medium text-foreground">
              Height
            </label>
            <div className="flex gap-1.5" role="radiogroup" aria-label="Embed height">
              {HEIGHT_PRESETS.map((h) => (
                <button
                  key={h}
                  type="button"
                  role="radio"
                  aria-checked={height === h}
                  onClick={() => setHeight(h)}
                  className={`rounded-full border px-3 py-1 text-xs font-medium transition-all active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${
                    height === h
                      ? 'border-primary bg-primary text-white'
                      : 'border-border bg-background text-muted hover:border-primary hover:text-foreground'
                  }`}
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
              className="w-20 rounded-lg border border-border bg-background px-2.5 py-1 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Auto-resize toggle */}
          <label className="mt-3 flex cursor-pointer items-center gap-2.5 border-t border-border pt-3">
            <button
              type="button"
              role="switch"
              aria-checked={includeAutoResize}
              onClick={() => setIncludeAutoResize(!includeAutoResize)}
              className={`relative h-5 w-9 shrink-0 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 ${
                includeAutoResize ? 'bg-primary' : 'bg-border'
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
                  includeAutoResize ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>
            <span className="text-sm text-foreground">Auto-resize script</span>
            <span
              className="group relative flex cursor-help items-center text-muted-light"
              aria-describedby="auto-resize-tooltip"
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
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              <span
                id="auto-resize-tooltip"
                role="tooltip"
                className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-2 w-52 -translate-x-1/2 rounded-lg border border-border bg-foreground px-3 py-2 text-xs leading-relaxed text-background opacity-0 shadow-lg transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
              >
                Adds a small script that automatically adjusts the iframe height to fit the
                calculator content, preventing scrollbars.
              </span>
            </span>
            <span className="flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-[0.65rem] font-medium leading-none text-primary">
              Recommended
            </span>
          </label>
        </div>

        {/* Embed code */}
        <div className="mb-4">
          <label className="mb-1.5 block text-sm font-medium text-foreground">Embed Code</label>
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="flex items-center justify-between border-b border-border bg-surface px-3 py-1.5">
              <span className="font-mono text-[0.65rem] tracking-wide text-muted-light">HTML</span>
              <button
                type="button"
                onClick={handleCopy}
                className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium transition-all active:scale-[0.97] ${
                  copied ? 'text-success' : 'text-primary hover:bg-primary/10'
                }`}
              >
                {copied ? (
                  <>
                    <svg
                      className="h-3 w-3"
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
                    Copied
                  </>
                ) : (
                  <>
                    <svg
                      className="h-3 w-3"
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
                    Copy
                  </>
                )}
              </button>
            </div>
            <textarea
              readOnly
              value={fullCode}
              rows={includeAutoResize ? 6 : 3}
              className="w-full resize-none bg-surface-alt px-3 py-2.5 font-mono text-xs leading-relaxed text-foreground focus:outline-none"
              onFocus={(e) => e.target.select()}
            />
          </div>
        </div>

        {/* Primary CTA button */}
        <button
          type="button"
          onClick={handleCopy}
          className={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 ${
            copied ? 'bg-success' : 'bg-primary hover:bg-primary-dark'
          }`}
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
              Copied to Clipboard!
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
