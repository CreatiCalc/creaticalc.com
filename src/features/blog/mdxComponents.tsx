import type { MDXComponents } from 'mdx/types';
import Link from 'next/link';
import AdSlot from '@/components/layout/AdSlot';

function MdxLink(props: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const { href, children, ...rest } = props;
  if (!href) return <a {...props} />;

  if (href.startsWith('/') || href.startsWith('#')) {
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </a>
  );
}

function CalculatorLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="my-4 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white no-underline shadow-sm transition-colors hover:bg-primary-dark"
    >
      {children}
      <span aria-hidden="true">&rarr;</span>
    </Link>
  );
}

function Callout({
  type = 'info',
  children,
}: {
  type?: 'tip' | 'info' | 'warning';
  children: React.ReactNode;
}) {
  const styles = {
    tip: 'border-success/30 bg-success/5',
    info: 'border-secondary/30 bg-secondary/5',
    warning: 'border-warning/30 bg-warning/5',
  };

  const labels = { tip: 'Tip', info: 'Info', warning: 'Warning' };

  return (
    <div className={`my-6 rounded-xl border-l-4 p-4 ${styles[type]} not-prose`}>
      <p className="mb-1 text-xs font-bold uppercase tracking-wider text-muted">{labels[type]}</p>
      <div className="text-sm leading-relaxed text-foreground">{children}</div>
    </div>
  );
}

function MidArticleAd() {
  return (
    <div className="not-prose my-8">
      <AdSlot slot="below-results" />
    </div>
  );
}

export const mdxComponents: MDXComponents = {
  a: MdxLink,
  CalculatorLink,
  Callout,
  MidArticleAd,
};
