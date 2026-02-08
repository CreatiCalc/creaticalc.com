import Link from "next/link";

const calculators = [
  { name: "YouTube Money Calculator", href: "/youtube-money-calculator" },
  { name: "Instagram Engagement Rate", href: "/instagram-engagement-rate-calculator" },
  { name: "TikTok Engagement Rate", href: "/tiktok-engagement-rate-calculator" },
  { name: "YouTube Growth Projector", href: "/youtube-subscriber-projector" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface py-12">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 md:grid-cols-3">
        <div>
          <p className="text-lg font-bold text-primary">CreatiCalc</p>
          <p className="mt-2 text-sm text-muted">
            Free calculators for content creators. Estimate earnings, track
            engagement, and project growth.
          </p>
        </div>
        <div>
          <p className="mb-3 font-semibold">Calculators</p>
          <ul className="space-y-2">
            {calculators.map((calc) => (
              <li key={calc.href}>
                <Link
                  href={calc.href}
                  className="text-sm text-muted transition-colors hover:text-foreground"
                >
                  {calc.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-3 font-semibold">Company</p>
          <ul className="space-y-2">
            <li>
              <Link
                href="/about"
                className="text-sm text-muted transition-colors hover:text-foreground"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/privacy"
                className="text-sm text-muted transition-colors hover:text-foreground"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-8 max-w-6xl border-t border-border px-4 pt-6">
        <p className="text-center text-sm text-muted">
          &copy; {new Date().getFullYear()} CreatiCalc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
