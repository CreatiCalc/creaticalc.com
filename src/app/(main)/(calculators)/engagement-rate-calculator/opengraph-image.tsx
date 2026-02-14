import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Engagement Rate Calculator — Free Tool for Instagram & TikTok';
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
          Engagement Rate Calculator
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
          Calculate your engagement rate and compare against 2026 benchmarks
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
            <div style={{ fontSize: 16, color: '#64748b' }}>Instagram</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: '#0f172a' }}>3.2%</div>
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
            <div style={{ fontSize: 16, opacity: 0.8 }}>TikTok</div>
            <div style={{ fontSize: 24, fontWeight: 700 }}>5.4%</div>
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
            <div style={{ fontSize: 16, color: '#64748b' }}>Benchmark</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: '#0f172a' }}>By Niche</div>
          </div>
        </div>
      </div>
    </div>,
    { ...size }
  );
}
