import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'X (Twitter) Engagement Rate Calculator + Benchmarks 2026';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
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
            color: '#6d28d9',
            marginBottom: 32,
          }}
        >
          CreatiCalc
        </div>
        <div
          style={{
            fontSize: 44,
            fontWeight: 700,
            color: '#0f172a',
            marginBottom: 16,
            textAlign: 'center',
          }}
        >
          X (Twitter) Engagement Rate Calculator
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
          Calculate your X engagement rate and compare against benchmarks
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
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
            }}
          >
            <div style={{ fontSize: 16, color: '#64748b' }}>Likes</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: '#0f172a' }}>430</div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '16px 32px',
              borderRadius: 12,
              backgroundColor: '#6d28d9',
              color: '#ffffff',
            }}
          >
            <div style={{ fontSize: 16, opacity: 0.8 }}>Rate</div>
            <div style={{ fontSize: 24, fontWeight: 700 }}>1.8%</div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '16px 32px',
              borderRadius: 12,
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
            }}
          >
            <div style={{ fontSize: 16, color: '#64748b' }}>Reposts</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: '#0f172a' }}>52</div>
          </div>
        </div>
      </div>
    </div>,
    { ...size }
  );
}
