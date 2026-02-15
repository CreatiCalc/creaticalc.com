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

export function createOgImageResponse({ title, subtitle, stats }: OgImageConfig): ImageResponse {
  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: '#ffffff',
        fontFamily: 'sans-serif',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
        }}
      >
        <div
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: '#0d9488',
            marginBottom: 32,
          }}
        >
          CreatiCalc
        </div>
        <div
          style={{
            fontSize: 44,
            fontWeight: 700,
            color: '#1c1917',
            marginBottom: 16,
            textAlign: 'center',
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 24,
            color: '#64748b',
            textAlign: 'center',
            maxWidth: 800,
            marginBottom: 40,
          }}
        >
          {subtitle}
        </div>
        <div
          style={{
            display: 'flex',
            gap: 32,
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '16px 32px',
              borderRadius: 12,
              backgroundColor: '#fafaf9',
              border: '1px solid #e7e5e4',
            }}
          >
            <div style={{ fontSize: 16, color: '#64748b' }}>{stats[0].label}</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: '#1c1917' }}>{stats[0].value}</div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '16px 32px',
              borderRadius: 12,
              backgroundColor: '#0d9488',
              color: '#ffffff',
            }}
          >
            <div style={{ fontSize: 16, opacity: 0.8 }}>{stats[1].label}</div>
            <div style={{ fontSize: 24, fontWeight: 700 }}>{stats[1].value}</div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '16px 32px',
              borderRadius: 12,
              backgroundColor: '#fafaf9',
              border: '1px solid #e7e5e4',
            }}
          >
            <div style={{ fontSize: 16, color: '#64748b' }}>{stats[2].label}</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: '#1c1917' }}>{stats[2].value}</div>
          </div>
        </div>
      </div>
    </div>,
    { ...OG_SIZE }
  );
}
