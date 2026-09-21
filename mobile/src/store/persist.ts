import AsyncStorage from '@react-native-async-storage/async-storage';

import { DEFAULT_SETTINGS, week1 } from '../data/plan';
import { deep, now } from '../lib/num';
import type { Store } from './types';

/** Same key and shape as the web app, so a future sync can bridge the two. */
export const STORAGE_KEY = 'bi8.store.v1';

export function freshStore(): Store {
  return {
    v: 1,
    plan: {
      settings: deep(DEFAULT_SETTINGS),
      weeks: [week1()],
      workouts: {},
      myFoods: [],
      updatedAt: now(),
    },
    days: {},
    dirty: {},
  };
}

/** Fill in anything a stored copy predates, and reject anything unusable. */
export function migrate(raw: unknown): Store {
  const o = raw as Partial<Store> | null;
  if (!o || !o.plan || !o.plan.settings) return freshStore();

  const plan = o.plan;
  if (!plan.weeks || !plan.weeks.length) plan.weeks = [week1()];
  if (!plan.workouts) plan.workouts = {};
  if (!plan.myFoods) plan.myFoods = [];
  for (const k of Object.keys(DEFAULT_SETTINGS) as (keyof typeof DEFAULT_SETTINGS)[]) {
    if (plan.settings[k] === undefined) {
      (plan.settings as unknown as Record<string, unknown>)[k] = DEFAULT_SETTINGS[k];
    }
  }

  return {
    v: o.v ?? 1,
    plan: plan as Store['plan'],
    days: o.days ?? {},
    dirty: o.dirty ?? {},
  };
}

export async function loadStore(): Promise<Store> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return freshStore();
    return migrate(JSON.parse(raw));
  } catch {
    return freshStore();
  }
}

export async function saveStore(s: Store): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  } catch {
    // A failed write is not worth interrupting the session for; the next
    // mutation schedules another one.
  }
}

export async function clearStore(): Promise<void> {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignored for the same reason
  }
}
