import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getCalculatorBySlug, getAllEmbeddableSlugs } from '@/lib/calculatorRegistry';
import EmbedWrapper from '@/features/embed/EmbedWrapper';
import EmbedCalculatorLoader from '@/features/embed/EmbedCalculatorLoader';

export function generateStaticParams() {
  return getAllEmbeddableSlugs().map((slug) => ({ slug }));
}

interface EmbedPageProps {
  params: Promise<{ slug: string }>;
}

export default async function EmbedPage({ params }: EmbedPageProps) {
  const { slug } = await params;
  const entry = getCalculatorBySlug(slug);

  if (!entry) {
    notFound();
  }

  return (
    <Suspense>
      <EmbedWrapper title={entry.title} canonicalPath={entry.canonicalPath}>
        <EmbedCalculatorLoader slug={slug} />
      </EmbedWrapper>
    </Suspense>
  );
}
