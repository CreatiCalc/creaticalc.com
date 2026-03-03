import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'CreatiCalc — Free Calculators for Content Creators';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  const barH = 64;
  const w = Math.round((barH * 7) / 27);
  const r = Math.max(2, Math.round((barH * 2) / 27));

  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: '#111827',
        fontFamily: 'sans-serif',
        position: 'relative',
      }}
    >
      {/* Subtle radial glow */}
      <div
        style={{
          position: 'absolute',
          width: 800,
          height: 800,
          borderRadius: 400,
          background: 'radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)',
          top: -100,
          left: 200,
        }}
      />

      {/* Decorative background bars — right */}
      <div
        style={{
          position: 'absolute',
          right: 120,
          bottom: 0,
          display: 'flex',
          alignItems: 'flex-end',
          gap: 12,
          opacity: 0.04,
        }}
      >
        <div
          style={{
            width: 52,
            height: 120,
            backgroundColor: '#fff',
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
          }}
        />
        <div
          style={{
            width: 52,
            height: 240,
            backgroundColor: '#fff',
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
          }}
        />
        <div
          style={{
            width: 52,
            height: 380,
            backgroundColor: '#fff',
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
          }}
        />
      </div>

      {/* Decorative background bars — left */}
      <div
        style={{
          position: 'absolute',
          left: 80,
          bottom: 0,
          display: 'flex',
          alignItems: 'flex-end',
          gap: 12,
          opacity: 0.04,
        }}
      >
        <div
          style={{
            width: 52,
            height: 100,
            backgroundColor: '#fff',
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
          }}
        />
        <div
          style={{
            width: 52,
            height: 200,
            backgroundColor: '#fff',
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
          }}
        />
        <div
          style={{
            width: 52,
            height: 340,
            backgroundColor: '#fff',
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
          }}
        />
      </div>

      {/* Brand icon */}
      <div style={{ display: 'flex', alignItems: 'flex-end', height: barH, marginBottom: 24 }}>
        <div
          style={{
            width: w,
            height: Math.round((barH * 10) / 27),
            backgroundColor: '#0f766e',
            borderTopLeftRadius: r,
            borderTopRightRadius: r,
          }}
        />
        <div
          style={{
            width: w,
            height: Math.round((barH * 19) / 27),
            backgroundColor: '#06b6d4',
            borderTopLeftRadius: r,
            borderTopRightRadius: r,
          }}
        />
        <div
          style={{
            width: w,
            height: barH,
            backgroundColor: '#d97706',
            borderTopLeftRadius: r,
            borderTopRightRadius: r,
          }}
        />
      </div>

      {/* Wordmark */}
      <div style={{ fontSize: 56, fontWeight: 700, color: '#ffffff', marginBottom: 16 }}>
        CreatiCalc
      </div>

      {/* Tagline */}
      <div
        style={{
          fontSize: 26,
          color: 'rgba(255,255,255,0.7)',
          textAlign: 'center',
          maxWidth: 700,
          marginBottom: 12,
        }}
      >
        Free Calculators for Content Creators
      </div>

      {/* Categories */}
      <div
        style={{
          fontSize: 18,
          color: 'rgba(255,255,255,0.4)',
          textAlign: 'center',
        }}
      >
        Earnings · Engagement · Sponsorships · Growth
      </div>

      {/* Bottom gradient line */}
      <div
        style={{
          position: 'absolute',
          bottom: 48,
          left: 72,
          right: 72,
          height: 2,
          background: 'linear-gradient(90deg, #0f766e 0%, #06b6d4 50%, #d97706 100%)',
          borderRadius: 1,
        }}
      />
    </div>,
    { ...size }
  );
}
