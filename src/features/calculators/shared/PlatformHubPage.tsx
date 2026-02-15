import Link from 'next/link';
import Card from '@/components/ui/Card';
import AdSlot from '@/components/layout/AdSlot';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import FAQ from './FAQ';
import { SITE_URL } from '@/lib/siteConfig';
import type { PlatformHubData } from '@/lib/platformHubData';
import type { CalculatorEntry } from '@/lib/calculatorRegistry';

interface PlatformHubPageProps {
  hub: PlatformHubData;
  calculators: CalculatorEntry[];
  otherHubs: { name: string; slug: string; calculatorCount: number }[];
}

export default function PlatformHubPage({ hub, calculators, otherHubs }: PlatformHubPageProps) {
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    'name': hub.title,
    'description': hub.metaDescription,
    'url': `${SITE_URL}/${hub.slug}`,
    'hasPart': calculators.map((calc) => ({
      '@type': 'WebApplication',
      'name': calc.title,
      'url': `${SITE_URL}${calc.href}`,
      'applicationCategory': 'UtilitiesApplication',
    })),
  };

  const breadcrumbItems = [
    { name: 'Home', path: '/' },
    { name: `${hub.displayName} Calculators`, path: `/${hub.slug}` },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <BreadcrumbSchema items={breadcrumbItems} />
      <div className="mx-auto max-w-4xl px-4 py-10">
        <Breadcrumbs items={breadcrumbItems} />

        {/* Hero */}
        <div className="mb-8 text-center">
          <h1 className="text-gradient-brand text-3xl font-bold md:text-4xl">{hub.h1}</h1>
          <p className="mt-3 text-muted">{hub.heroDescription}</p>
          <div
            className={`mx-auto mt-5 h-1 w-36 rounded-full bg-gradient-to-r ${hub.accentGradient}`}
            aria-hidden="true"
          />
        </div>

        <AdSlot slot="header" className="mb-8" />

        {/* Calculator Cards Grid */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold">Free {hub.displayName} Calculator Tools</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {calculators.map((calc) => (
              <Link key={calc.href} href={calc.href} className="group">
                <Card className="relative h-full overflow-hidden transition-all duration-200 group-hover:border-primary/50 group-hover:shadow-md">
                  <div
                    className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${hub.accentGradient} opacity-0 transition-opacity duration-200 group-hover:opacity-100`}
                  />
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-lg font-semibold group-hover:text-primary">
                      {calc.cardTitle}
                    </h3>
                    <span className="rounded-full bg-surface-alt px-2 py-0.5 text-xs text-muted">
                      Free
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted">{calc.description}</p>
                  <p className="mt-3 text-sm font-medium text-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    Try it free &rarr;
                  </p>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Key Stats */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold">{hub.displayName} by the Numbers</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {hub.keyStats.map((stat) => (
              <Card key={stat.label} className="text-center">
                <p className="text-2xl font-bold text-primary">{stat.value}</p>
                <p className="mt-1 text-sm text-muted">{stat.label}</p>
              </Card>
            ))}
          </div>
        </section>

        <AdSlot slot="after-chart" className="mb-8" />

        {/* Educational Content */}
        {hub.educationalSections.map((section) => (
          <section key={section.title} className="mb-12">
            <h2 className="mb-4 text-2xl font-bold">{section.title}</h2>
            <div className="prose prose-sm max-w-none text-muted">
              {section.paragraphs.map((p, i) => (
                <p key={i} className={i > 0 ? 'mt-3' : ''}>
                  {p}
                </p>
              ))}
            </div>
          </section>
        ))}

        {/* Cross-Platform Links */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold">Explore Other Platforms</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {otherHubs.map((other) => (
              <Link key={other.slug} href={`/${other.slug}`} className="group">
                <Card className="text-center transition-all duration-200 group-hover:border-primary/50 group-hover:shadow-md">
                  <p className="font-semibold group-hover:text-primary">{other.name}</p>
                  <p className="mt-1 text-xs text-muted">
                    {other.calculatorCount} free tool{other.calculatorCount !== 1 ? 's' : ''}
                  </p>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        <AdSlot slot="below-results" className="mb-8" />

        <FAQ items={hub.faq} />
      </div>
    </>
  );
}
