import type { Metadata } from 'next';
import Link from 'next/link';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import { SITE_URL } from '@/lib/siteConfig';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    "Get in touch with the CreatiCalc team. Questions about our calculators, methodology, or data? We'd love to hear from you.",
  openGraph: {
    title: 'Contact CreatiCalc',
    description: 'Questions, feedback, or partnership inquiries — reach the CreatiCalc team.',
    url: '/contact',
  },
  alternates: {
    canonical: '/contact',
  },
};

const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Contact', path: '/contact' },
];

export default function ContactPage() {
  const contactPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    'name': 'Contact CreatiCalc',
    'description':
      'Get in touch with the CreatiCalc team for questions, feedback, or partnership inquiries.',
    'url': `${SITE_URL}/contact`,
    'mainEntity': { '@id': `${SITE_URL}/#organization` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      <BreadcrumbSchema items={breadcrumbs} />

      <div className="mx-auto max-w-3xl px-4 py-16">
        <Breadcrumbs items={breadcrumbs} />

        <header className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Get in <span className="text-gradient-vibrant">Touch</span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            Have a question about our calculators, want to report an issue, or interested in
            partnering with us? We&apos;d love to hear from you.
          </p>
        </header>

        <div className="space-y-8">
          <div className="rounded-xl border border-border bg-surface-alt/50 p-6">
            <h2 className="text-xl font-bold">Email</h2>
            <p className="mt-2 text-muted">
              The best way to reach us for questions, feedback, or business inquiries.
            </p>
            <a
              href="mailto:hello@creaticalc.com"
              className="mt-3 inline-block font-medium text-primary hover:underline"
            >
              hello@creaticalc.com
            </a>
          </div>

          <div className="rounded-xl border border-border bg-surface-alt/50 p-6">
            <h2 className="text-xl font-bold">X (Twitter)</h2>
            <p className="mt-2 text-muted">
              Follow us for updates, or send a DM for quick questions.
            </p>
            <a
              href="https://x.com/CreatiCalc"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block font-medium text-primary hover:underline"
            >
              @CreatiCalc
            </a>
          </div>

          <div className="rounded-xl border border-border bg-surface-alt/50 p-6">
            <h2 className="text-xl font-bold">Common Topics</h2>
            <ul className="mt-3 space-y-2 text-muted">
              <li>
                <strong className="text-foreground">Data questions</strong> — wondering how we
                calculate something? Check our{' '}
                <Link href="/methodology" className="text-primary hover:underline">
                  methodology page
                </Link>{' '}
                first.
              </li>
              <li>
                <strong className="text-foreground">Bug reports</strong> — if a calculator
                isn&apos;t working as expected, let us know and we&apos;ll look into it.
              </li>
              <li>
                <strong className="text-foreground">Feature requests</strong> — want a calculator
                for a platform or metric we don&apos;t cover yet? We&apos;re always adding new
                tools.
              </li>
              <li>
                <strong className="text-foreground">Partnerships</strong> — interested in
                collaborating or embedding our tools? Reach out via email.
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted">We typically respond within 1–2 business days.</p>
        </div>
      </div>
    </>
  );
}
