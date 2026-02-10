import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'CreatiCalc — Free Calculators for Content Creators';
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
            fontSize: 48,
            fontWeight: 700,
            color: '#6d28d9',
            marginBottom: 24,
          }}
        >
          CreatiCalc
        </div>
        <div
          style={{
            fontSize: 36,
            fontWeight: 600,
            color: '#0f172a',
            marginBottom: 16,
            textAlign: 'center',
          }}
        >
          Free Calculators for Content Creators
        </div>
        <div
          style={{
            fontSize: 22,
            color: '#64748b',
            textAlign: 'center',
            maxWidth: 800,
          }}
        >
          Estimate YouTube earnings, calculate engagement rates, and project subscriber growth
        </div>
      </div>
    </div>,
    { ...size }
  );
}
