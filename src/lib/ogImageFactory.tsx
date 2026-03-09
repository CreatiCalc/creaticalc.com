import { ImageResponse } from 'next/og';

export const OG_SIZE = { width: 1200, height: 630 };

interface OgStat {
  label: string;
  value: string;
}

interface OgImageConfig {
  title: string;
  subtitle: string;
  stats: [OgStat, OgStat, OgStat];
}

interface BlogOgImageConfig {
  title: string;
  description: string;
  readingTime: number;
  tags: string[];
}

/* ── shared sub-components (Satori JSX) ─────────────────────── */

const BRAND = ['#086059', '#06b6d4', '#d97706'] as const;

function BrandBars({ height = 32 }: { height?: number }) {
  const w = Math.round((height * 7) / 27);
  const r = Math.max(2, Math.round((height * 2) / 27));
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', height }}>
      <div
        style={{
          width: w,
          height: Math.round((height * 10) / 27),
          backgroundColor: BRAND[0],
          borderTopLeftRadius: r,
          borderTopRightRadius: r,
        }}
      />
      <div
        style={{
          width: w,
          height: Math.round((height * 19) / 27),
          backgroundColor: BRAND[1],
          borderTopLeftRadius: r,
          borderTopRightRadius: r,
        }}
      />
      <div
        style={{
          width: w,
          height,
          backgroundColor: BRAND[2],
          borderTopLeftRadius: r,
          borderTopRightRadius: r,
        }}
      />
    </div>
  );
}

function AccentStripe() {
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: 6,
        background: `linear-gradient(180deg, ${BRAND[0]} 0%, ${BRAND[1]} 50%, ${BRAND[2]} 100%)`,
      }}
    />
  );
}

function DecoBars() {
  return (
    <div
      style={{
        position: 'absolute',
        right: 72,
        bottom: 0,
        display: 'flex',
        alignItems: 'flex-end',
        gap: 10,
        opacity: 0.05,
      }}
    >
      <div
        style={{
          width: 44,
          height: 100,
          backgroundColor: '#fff',
          borderTopLeftRadius: 6,
          borderTopRightRadius: 6,
        }}
      />
      <div
        style={{
          width: 44,
          height: 200,
          backgroundColor: '#fff',
          borderTopLeftRadius: 6,
          borderTopRightRadius: 6,
        }}
      />
      <div
        style={{
          width: 44,
          height: 320,
          backgroundColor: '#fff',
          borderTopLeftRadius: 6,
          borderTopRightRadius: 6,
        }}
      />
    </div>
  );
}

function GradientLine() {
  return (
    <div
      style={{
        width: '100%',
        height: 2,
        background: `linear-gradient(90deg, ${BRAND[0]} 0%, ${BRAND[1]} 50%, ${BRAND[2]} 100%)`,
        borderRadius: 1,
      }}
    />
  );
}

/* ── Blog OG ────────────────────────────────────────────────── */

export function createBlogOgImageResponse({
  title,
  description,
  readingTime,
  tags,
}: BlogOgImageConfig): ImageResponse {
  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        backgroundColor: '#111827',
        fontFamily: 'sans-serif',
        position: 'relative',
      }}
    >
      <AccentStripe />
      <DecoBars />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '52px 72px 52px',
          flex: 1,
          position: 'relative',
        }}
      >
        {/* Logo row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 40 }}>
          <BrandBars height={28} />
          <div style={{ fontSize: 22, fontWeight: 700, color: BRAND[1] }}>CreatiCalc Blog</div>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: title.length > 50 ? 42 : 52,
            fontWeight: 700,
            color: '#ffffff',
            lineHeight: 1.15,
            marginBottom: 20,
            maxWidth: 900,
          }}
        >
          {title}
        </div>

        {/* Meta row — placed after title so it's safe from Twitter overlay */}
        {(readingTime > 0 || tags.length > 0) && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
            {readingTime > 0 && (
              <div style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)' }}>
                {`${readingTime} min read`}
              </div>
            )}
            {readingTime > 0 && tags.length > 0 && (
              <div style={{ fontSize: 16, color: 'rgba(255,255,255,0.2)' }}>·</div>
            )}
            <div style={{ display: 'flex', gap: 8 }}>
              {tags.slice(0, 3).map((tag) => (
                <div
                  key={tag}
                  style={{
                    fontSize: 14,
                    color: 'rgba(255,255,255,0.5)',
                    backgroundColor: 'rgba(255,255,255,0.08)',
                    padding: '4px 12px',
                    borderRadius: 6,
                  }}
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Description */}
        <div
          style={{
            fontSize: 22,
            color: 'rgba(255,255,255,0.55)',
            lineHeight: 1.5,
            maxWidth: 800,
          }}
        >
          {description}
        </div>

        {/* Spacer */}
        <div style={{ display: 'flex', flex: 1 }} />

        {/* Bottom accent line */}
        <GradientLine />
      </div>
    </div>,
    { ...OG_SIZE }
  );
}

/* ── Calculator / general OG ────────────────────────────────── */

export function createOgImageResponse({ title, subtitle, stats }: OgImageConfig): ImageResponse {
  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        backgroundColor: '#111827',
        fontFamily: 'sans-serif',
        position: 'relative',
      }}
    >
      <AccentStripe />
      <DecoBars />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '52px 72px',
          flex: 1,
          position: 'relative',
        }}
      >
        {/* Logo row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 40 }}>
          <BrandBars height={28} />
          <div style={{ fontSize: 22, fontWeight: 700, color: BRAND[1] }}>CreatiCalc</div>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: title.length > 40 ? 38 : 44,
            fontWeight: 700,
            color: '#ffffff',
            lineHeight: 1.2,
            marginBottom: 12,
            maxWidth: 900,
          }}
        >
          {title}
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 22,
            color: 'rgba(255,255,255,0.55)',
            lineHeight: 1.4,
            maxWidth: 800,
          }}
        >
          {subtitle}
        </div>

        {/* Spacer */}
        <div style={{ display: 'flex', flex: 1 }} />

        {/* Stats row */}
        <div style={{ display: 'flex', gap: 20, marginBottom: 32 }}>
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '18px 28px',
                borderRadius: 10,
                backgroundColor: 'rgba(255,255,255,0.05)',
                borderTop: `3px solid ${BRAND[i]}`,
                minWidth: 160,
              }}
            >
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', marginBottom: 6 }}>
                {stat.label}
              </div>
              <div style={{ fontSize: 26, fontWeight: 700, color: '#ffffff' }}>{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Bottom accent line */}
        <GradientLine />
      </div>
    </div>,
    { ...OG_SIZE }
  );
}
