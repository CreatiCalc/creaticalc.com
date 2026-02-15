import type { FAQItem } from './types';
import type { BreadcrumbItem } from '@/components/seo/BreadcrumbSchema';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import FAQ from './FAQ';
import AdSlot from '@/components/layout/AdSlot';
import CalculatorErrorBoundary from './CalculatorErrorBoundary';
import NextStepCTA from './NextStepCTA';

interface CalculatorLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
  faq: FAQItem[];
  howItWorks?: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
  /** Calculator slug for related-calculator CTAs */
  slug?: string;
}

export default function CalculatorLayout({
  title,
  description,
  children,
  faq,
  howItWorks,
  breadcrumbs,
  slug,
}: CalculatorLayoutProps) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      {breadcrumbs && (
        <>
          <BreadcrumbSchema items={breadcrumbs} />
          <Breadcrumbs items={breadcrumbs} />
        </>
      )}
      <div className="mb-8 text-center">
        <h1 className="text-gradient-brand text-3xl font-bold md:text-4xl">{title}</h1>
        <p className="mt-3 text-muted">{description}</p>
        <div
          className="mx-auto mt-5 h-1 w-36 rounded-full"
          style={{ background: 'var(--gradient-brand-vibrant)' }}
          aria-hidden="true"
        />
      </div>

      <AdSlot slot="header" className="mb-8" />

      <CalculatorErrorBoundary>{children}</CalculatorErrorBoundary>

      <AdSlot slot="below-results" className="mt-8" />

      {slug && <NextStepCTA currentSlug={slug} />}

      {howItWorks && (
        <section className="mt-12">
          <h2 className="mb-4 text-2xl font-bold">How It Works</h2>
          <div className="prose prose-sm max-w-none text-muted">{howItWorks}</div>
        </section>
      )}

      <FAQ items={faq} />
    </div>
  );
}
