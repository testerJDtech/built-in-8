/** Pure selectors over the store, ported from the web app's totals section. */

import { todayISO } from './date';
import type {
  DayPlan,
  FoodEntry,
  MealKey,
  Store,
  Totals,
  Unit,
  Week,
  Workout,
} from '../store/types';

export function entryTotals(list: FoodEntry[]): Totals {
  const t: Totals = { kcal: 0, p: 0, cb: 0, f: 0 };
  for (const e of list) {
    t.kcal += e.kcal || 0;
    t.p += e.p || 0;
    t.cb += e.cb || 0;
    t.f += e.f || 0;
  }
  return t;
}

export function dayTotals(s: Store, date: string): Totals {
  return entryTotals(s.days[date]?.food ?? []);
}

export function mealTotals(s: Store, date: string, key: MealKey): Totals {
  return entryTotals((s.days[date]?.food ?? []).filter((e) => e.meal === key));
}

export function weekOf(s: Store, date: string): Week | null {
  for (const w of s.plan.weeks) {
    if (w.days.some((d) => d.date === date)) return w;
  }
  return null;
}

export function dayPlan(s: Store, date: string): DayPlan | null {
  return weekOf(s, date)?.days.find((d) => d.date === date) ?? null;
}

export function sessionDone(s: Store, date: string, wid: string): boolean {
  return !!s.days[date]?.sessions?.[wid]?.done;
}

export function weekSessionCount(
  s: Store,
  w: Week,
  workout: (id: string) => Workout | null,
): number {
  return w.days.filter((dp) => {
    const wk = workout(dp.wid);
    return wk?.kind === 'strength' && sessionDone(s, dp.date, dp.wid);
  }).length;
}

export function weekCardioCount(
  s: Store,
  w: Week,
  workout: (id: string) => Workout | null,
): number {
  return w.days.filter((dp) => {
    const wk = workout(dp.wid);
    return (
      (wk?.kind === 'cardio' || wk?.kind === 'circuit') &&
      sessionDone(s, dp.date, dp.wid)
    );
  }).length;
}

/** Which meal a quick log should land in, by time of day. */
export function guessMeal(date: string): MealKey {
  if (date !== todayISO()) return 'lunch';
  const hr = new Date().getHours();
  if (hr < 11) return 'breakfast';
  if (hr < 15) return 'lunch';
  if (hr < 18) return 'snack';
  return 'dinner';
}

export function unitLabel(u: Unit, q: number): string {
  if (u === 'g') return `${q}g`;
  if (u === 'slice') return `${q} ${q === 1 ? 'slice' : 'slices'}`;
  if (u === 'wrap') return `${q} ${q === 1 ? 'wrap' : 'wraps'}`;
  return q === 1 ? '1 portion' : `${q} portions`;
}
