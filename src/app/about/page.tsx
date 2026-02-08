import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description:
    'CreatiCalc provides free calculators for content creators on YouTube, Instagram, and TikTok.',
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-bold">About CreatiCalc</h1>
      <p className="mt-4 leading-relaxed text-muted">
        CreatiCalc is a free suite of calculators built for content creators. Whether you&apos;re a
        YouTuber wondering how much you could earn, an Instagram creator checking your engagement
        rate, or a TikToker tracking growth — we&apos;ve got a tool for you.
      </p>
      <p className="mt-4 leading-relaxed text-muted">
        All calculators are free, require no sign-up, and give you instant results based on real
        industry benchmarks.
      </p>
    </div>
  );
}
