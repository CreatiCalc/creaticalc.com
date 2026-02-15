import Script from 'next/script';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const adsensePublisherId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID;
const cfBeaconToken = process.env.NEXT_PUBLIC_CLOUDFLARE_BEACON_TOKEN;

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {adsensePublisherId && (
        <Script
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsensePublisherId}`}
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
      )}
      {cfBeaconToken && (
        <Script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon={`{"token": "${cfBeaconToken}"}`}
        />
      )}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className="min-h-[calc(100vh-160px)]">
        {children}
      </main>
      <Footer />
    </>
  );
}
