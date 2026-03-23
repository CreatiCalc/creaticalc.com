import Link from 'next/link';

const TAG_COLORS: Record<string, { badge: string; accent: string }> = {
  'youtube': { badge: 'bg-red-50 text-red-700', accent: 'border-red-400' },
  'instagram': { badge: 'bg-fuchsia-50 text-fuchsia-700', accent: 'border-fuchsia-400' },
  'tiktok': { badge: 'bg-cyan-50 text-cyan-700', accent: 'border-cyan-500' },
  'x': { badge: 'bg-sky-50 text-sky-700', accent: 'border-sky-400' },
  'twitter': { badge: 'bg-sky-50 text-sky-700', accent: 'border-sky-400' },
  'facebook': { badge: 'bg-blue-50 text-blue-700', accent: 'border-blue-400' },
  'sponsorship': { badge: 'bg-amber-50 text-amber-700', accent: 'border-amber-400' },
  'brand-deals': { badge: 'bg-amber-50 text-amber-700', accent: 'border-amber-400' },
  'rates': { badge: 'bg-amber-50 text-amber-700', accent: 'border-amber-400' },
  'earnings': { badge: 'bg-emerald-50 text-emerald-700', accent: 'border-emerald-400' },
  'monetization': { badge: 'bg-emerald-50 text-emerald-700', accent: 'border-emerald-400' },
  'cpm': { badge: 'bg-violet-50 text-violet-700', accent: 'border-violet-400' },
  'rpm': { badge: 'bg-violet-50 text-violet-700', accent: 'border-violet-400' },
  'engagement-rate': { badge: 'bg-teal-50 text-teal-700', accent: 'border-teal-400' },
  'benchmarks': { badge: 'bg-teal-50 text-teal-700', accent: 'border-teal-400' },
  'comparison': { badge: 'bg-indigo-50 text-indigo-700', accent: 'border-indigo-400' },
};

const DEFAULT_COLORS = { badge: 'bg-stone-100 text-stone-600', accent: 'border-stone-300' };

/** Returns the accent border-color class for the first recognized tag. */
export function getTagAccent(tags: string[]): string {
  for (const tag of tags) {
    if (TAG_COLORS[tag]) return TAG_COLORS[tag].accent;
  }
  return DEFAULT_COLORS.accent;
}

interface TagBadgeProps {
  tag: string;
  linked?: boolean;
}

export default function TagBadge({ tag, linked = true }: TagBadgeProps) {
  const colors = TAG_COLORS[tag]?.badge || DEFAULT_COLORS.badge;
  const className = `inline-block rounded px-2 py-0.5 text-xs font-medium ${colors}`;

  if (!linked) {
    return <span className={className}>{tag}</span>;
  }

  return (
    <Link href={`/blog/tag/${tag}`} className={className}>
      {tag}
    </Link>
  );
}
