import type { Metadata, Viewport } from 'next';
import { DM_Sans, Sora } from 'next/font/google';
import { SITE_URL, SITE_DESCRIPTION } from '@/lib/siteConfig';
import './globals.css';

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  display: 'swap',
});

const sora = Sora({
  variable: '--font-sora',
  subsets: ['latin'],
  display: 'swap',
  weight: ['600', '700'],
});

export const viewport: Viewport = {
  themeColor: '#0d9488',
};

export const metadata: Metadata = {
  title: {
    default: 'CreatiCalc — Free Calculators for Content Creators',
    template: '%s | CreatiCalc',
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
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
      <body className={`${dmSans.variable} ${sora.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
