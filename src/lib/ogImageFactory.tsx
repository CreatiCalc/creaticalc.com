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
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, #0d9488 0%, #0891b2 50%, #22d3ee 100%)',
        fontFamily: 'sans-serif',
        padding: '60px',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          marginBottom: 40,
        }}
      >
        <div
          style={{
            fontSize: 24,
            fontWeight: 700,
            color: '#ffffff',
            opacity: 0.9,
          }}
        >
          CreatiCalc Blog
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            fontSize: 48,
            fontWeight: 700,
            color: '#ffffff',
            lineHeight: 1.2,
            marginBottom: 20,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 22,
            color: '#ffffff',
            opacity: 0.85,
            lineHeight: 1.4,
            maxWidth: 900,
          }}
        >
          {description}
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 20,
        }}
      >
        {readingTime > 0 && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 18,
              color: '#ffffff',
              opacity: 0.8,
            }}
          >
            {readingTime} min read
          </div>
        )}
        <div
          style={{
            display: 'flex',
            gap: 8,
          }}
        >
          {tags.slice(0, 3).map((tag) => (
            <div
              key={tag}
              style={{
                fontSize: 14,
                color: '#ffffff',
                backgroundColor: 'rgba(255,255,255,0.2)',
                padding: '4px 12px',
                borderRadius: 20,
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    </div>,
    { ...OG_SIZE }
  );
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
