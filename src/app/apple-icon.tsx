import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, #7c3aed 0%, #6366f1 50%, #4f46e5 100%)',
        borderRadius: 36,
      }}
    >
      <svg
        width="120"
        height="120"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="4" y="20" width="6" height="10" rx="3" fill="white" fillOpacity="0.9" />
        <rect x="13" y="12" width="6" height="18" rx="3" fill="white" fillOpacity="0.9" />
        <rect x="22" y="4" width="6" height="26" rx="3" fill="white" fillOpacity="0.9" />
        <path d="M29 0 L30.5 2 L32 3.5 L30.5 5 L29 7 L27.5 5 L26 3.5 L27.5 2Z" fill="#ec4899" />
      </svg>
    </div>,
    { ...size }
  );
}
