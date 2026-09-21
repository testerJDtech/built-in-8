/** Small numeric helpers, ported from the web app. */

export function n0(x: number | null | undefined): number {
  return Math.round(x || 0);
}

export function n1(x: number | null | undefined): string {
  return String(Math.round((x || 0) * 10) / 10);
}

export function clamp(x: number, a: number, b: number): number {
  return x < a ? a : x > b ? b : x;
}

export function uid(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

export function now(): number {
  return Date.now();
}

export function deep<T>(o: T): T {
  return JSON.parse(JSON.stringify(o));
}

/** Thousands separators, matching the web app's toLocaleString() output. */
export function group(x: number): string {
  return n0(x).toLocaleString('en-GB');
}
