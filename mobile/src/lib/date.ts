/** Local-time date helpers. Dates are plain "YYYY-MM-DD" strings everywhere. */

export const DOW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const DOW_LONG = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
export const MONTH = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

export function iso(d: Date): string {
  const m = d.getMonth() + 1;
  const day = d.getDate();
  return `${d.getFullYear()}-${m < 10 ? '0' : ''}${m}-${day < 10 ? '0' : ''}${day}`;
}

export function parseISO(s: string): Date {
  const p = String(s).split('-');
  return new Date(+p[0], +p[1] - 1, +p[2]);
}

export function addDays(s: string, n: number): string {
  const d = parseISO(s);
  d.setDate(d.getDate() + n);
  return iso(d);
}

export function todayISO(): string {
  return iso(new Date());
}

/** "Mon 22 Sep" */
export function fmtDate(s: string): string {
  const d = parseISO(s);
  return `${DOW[d.getDay()]} ${d.getDate()} ${MONTH[d.getMonth()]}`;
}

/** "22 Sep" */
export function fmtShort(s: string): string {
  const d = parseISO(s);
  return `${d.getDate()} ${MONTH[d.getMonth()]}`;
}

export function dayName(s: string): string {
  return DOW_LONG[parseISO(s).getDay()];
}
