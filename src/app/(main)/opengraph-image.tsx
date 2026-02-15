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
        background: 'linear-gradient(135deg, #0d9488 0%, #0891b2 40%, #22d3ee 100%)',
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
        {/* Icon: three ascending bars + sparkle */}
        <svg
          width="80"
          height="80"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="4" y="20" width="6" height="10" rx="3" fill="white" fillOpacity="0.9" />
          <rect x="13" y="12" width="6" height="18" rx="3" fill="white" fillOpacity="0.9" />
          <rect x="22" y="4" width="6" height="26" rx="3" fill="white" fillOpacity="0.9" />
          <path d="M29 0 L30.5 2 L32 3.5 L30.5 5 L29 7 L27.5 5 L26 3.5 L27.5 2Z" fill="#d97706" />
        </svg>
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: '#ffffff',
            marginTop: 24,
            marginBottom: 16,
          }}
        >
          CreatiCalc
        </div>
        <div
          style={{
            fontSize: 28,
            fontWeight: 500,
            color: 'rgba(255,255,255,0.9)',
            textAlign: 'center',
            maxWidth: 800,
          }}
        >
          Free Calculators for Content Creators
        </div>
        <div
          style={{
            fontSize: 20,
            color: 'rgba(255,255,255,0.7)',
            textAlign: 'center',
            maxWidth: 700,
            marginTop: 12,
          }}
        >
          Estimate earnings, calculate engagement rates, find sponsorship pricing, and project
          growth
        </div>
      </div>
    </div>,
    { ...size }
  );
}
