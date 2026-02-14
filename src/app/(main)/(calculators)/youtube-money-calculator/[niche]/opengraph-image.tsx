import { ImageResponse } from 'next/og';
import { getNichePageData } from '@/lib/nichePageData';
import { getNiche } from '@/lib/youtubeEarningsModel';

export const alt = 'YouTube Money Calculator by Niche';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ niche: string }> }) {
  const { niche: nicheSlug } = await params;
  const pageData = getNichePageData(nicheSlug);
  const nicheData = pageData ? getNiche(pageData.nicheId) : null;

  const title = pageData?.ogTitle ?? 'YouTube Money Calculator';
  const cpmLow = nicheData?.cpm.low ?? 4;
  const cpmHigh = nicheData?.cpm.high ?? 18;
  const rpmLow = nicheData?.rpm.low ?? 2.2;
  const rpmHigh = nicheData?.rpm.high ?? 9.9;

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
          Estimate {pageData?.name ?? 'YouTube'} channel earnings by views and CPM
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
            <div style={{ fontSize: 16, color: '#64748b' }}>CPM Range</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: '#0f172a' }}>
              ${cpmLow} — ${cpmHigh}
            </div>
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
            <div style={{ fontSize: 16, opacity: 0.8 }}>RPM (Creator Earnings)</div>
            <div style={{ fontSize: 24, fontWeight: 700 }}>
              ${rpmLow.toFixed(2)} — ${rpmHigh.toFixed(2)}
            </div>
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
            <div style={{ fontSize: 16, color: '#64748b' }}>Revenue Share</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: '#0f172a' }}>55%</div>
          </div>
        </div>
      </div>
    </div>,
    { ...size }
  );
}
