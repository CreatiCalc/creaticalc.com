import Link from 'next/link';
import Logo from '@/components/brand/Logo';
import { FOOTER_GROUPS } from './navConfig';

export default function Footer() {
  return (
    <footer className="bg-foreground text-stone-300">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-8 text-center sm:grid-cols-2 sm:text-left md:grid-cols-3 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr]">
          <div className="sm:col-span-2 md:col-span-3 lg:col-span-1">
            <Logo size="sm" className="[&_span]:text-white" />
            <p className="mt-3 text-sm text-stone-400">
              Free calculators for content creators. Estimate earnings, track engagement, find
              sponsorship rates, and project growth.
            </p>
          </div>
          {FOOTER_GROUPS.map((group) => (
            <nav key={group.label} aria-label={group.label}>
              <p className="mb-3 font-semibold text-white">{group.label}</p>
              <ul className="space-y-0.5">
                {group.items.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-block py-2 text-sm text-stone-400 transition-colors hover:text-white"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>
      <div className="border-t border-stone-700">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <p className="mx-auto max-w-3xl text-center text-xs leading-relaxed text-stone-500">
            <strong className="text-stone-400">Disclaimer:</strong> All calculators on CreatiCalc
            provide estimates for informational purposes only. Results are based on publicly
            available data and industry averages and should not be considered financial, business,
            or professional advice. Actual earnings, engagement rates, and growth will vary.
            CreatiCalc is not affiliated with YouTube, Instagram, TikTok, Facebook, X (Twitter), or
            any other platform.
          </p>
          <p className="mt-4 text-center text-sm text-stone-500">
            &copy; {new Date().getFullYear()} CreatiCalc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
