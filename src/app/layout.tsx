import type { Metadata } from 'next';
import Script from 'next/script';
import { Geist, Geist_Mono } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import './globals.css';

const adsensePublisherId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID;

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'CreatiCalc — Free Calculators for Content Creators',
    template: '%s | CreatiCalc',
  },
  description:
    'Free calculators for YouTubers, TikTokers, and Instagram creators. Estimate earnings, calculate engagement rates, find sponsorship pricing, and project subscriber growth.',
  metadataBase: new URL('https://creaticalc.com'),
  openGraph: {
    type: 'website',
    siteName: 'CreatiCalc',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {adsensePublisherId && (
        <head>
          <Script
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsensePublisherId}`}
            strategy="afterInteractive"
            crossOrigin="anonymous"
          />
        </head>
      )}
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <Header />
        <main className="min-h-[calc(100vh-160px)]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
