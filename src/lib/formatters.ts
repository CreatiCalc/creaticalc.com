// ─── Month Labels ────────────────────────────────────────────────────────────

export const MONTH_ABBREVIATIONS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
] as const;

/**
 * Pure function that returns a label like "Mar 2026" for a given month offset.
 * `startMonth` is a 0-based calendar month (0 = Jan).
 * `startYear` is the full year (e.g. 2026).
 * `offset` is how many months forward from the start.
 */
export function getMonthLabel(startMonth: number, startYear: number, offset: number): string {
  const calMonth = (startMonth + offset) % 12;
  const yearOffset = Math.floor((startMonth + offset) / 12);
  return `${MONTH_ABBREVIATIONS[calMonth]} ${startYear + yearOffset}`;
}

// ─── Shared Formatting Utilities ─────────────────────────────────────────────

export function formatUSD(amount: number): string {
  return amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });
}

export function formatPercent(value: number): string {
  return `${value.toFixed(2)}%`;
}

export function formatFollowerCount(count: number): string {
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(count % 1_000_000 === 0 ? 0 : 1)}M`;
  if (count >= 1_000) return `${(count / 1_000).toFixed(count % 1_000 === 0 ? 0 : 1)}K`;
  return count.toLocaleString();
}
