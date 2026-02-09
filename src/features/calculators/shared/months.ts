export const MONTHS = [
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

export type Month = (typeof MONTHS)[number];

export function getMonthSequence(startMonth: number = new Date().getMonth()): Month[] {
  return Array.from({ length: 12 }, (_, i) => MONTHS[(startMonth + i) % 12]);
}
