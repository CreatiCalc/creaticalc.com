import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function Icon() {
  const barH = 100;
  const w = Math.round((barH * 7) / 27);
  const r = Math.max(3, Math.round((barH * 2) / 27));

  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, #0a766d 0%, #0891b2 50%, #06b6d4 100%)',
        borderRadius: 36,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-end', height: barH }}>
        <div
          style={{
            width: w,
            height: Math.round((barH * 10) / 27),
            backgroundColor: 'rgba(255,255,255,0.9)',
            borderTopLeftRadius: r,
            borderTopRightRadius: r,
          }}
        />
        <div
          style={{
            width: w,
            height: Math.round((barH * 19) / 27),
            backgroundColor: 'rgba(255,255,255,0.9)',
            borderTopLeftRadius: r,
            borderTopRightRadius: r,
          }}
        />
        <div
          style={{
            width: w,
            height: barH,
            backgroundColor: 'rgba(255,255,255,0.9)',
            borderTopLeftRadius: r,
            borderTopRightRadius: r,
          }}
        />
      </div>
    </div>,
    { ...size }
  );
}
