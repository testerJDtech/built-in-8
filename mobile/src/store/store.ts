/**
 * The app's single store.
 *
 * State is one mutable object, as in the web app, published to React through
 * useSyncExternalStore with a version counter. Every mutation goes through
 * touchDay/touchPlan, which stamp updatedAt, mark the document dirty and
 * schedule a debounced write to AsyncStorage.
 */

import { useSyncExternalStore } from 'react';

import { FOODS } from '../data/foods';
import { BASE_WORKOUTS } from '../data/workouts';
import { now, uid } from '../lib/num';
import { loadStore, saveStore, freshStore, clearStore } from './persist';
import type {
  Day,
  Food,
  FoodEntry,
  MealKey,
  Store,
  Workout,
} from './types';

let S: Store = freshStore();
let hydrated = false;
let version = 0;

const listeners = new Set<() => void>();

function emit(): void {
  version += 1;
  for (const l of listeners) l();
}

function subscribe(l: () => void): () => void {
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
}

function getVersion(): number {
  return version;
}

export function getState(): Store {
  return S;
}

/** Re-renders the caller on every mutation. */
export function useStore(): Store {
  useSyncExternalStore(subscribe, getVersion, getVersion);
  return S;
}

export function useHydrated(): boolean {
  useSyncExternalStore(subscribe, getVersion, getVersion);
  return hydrated;
}

// ---------------------------------------------------------------- persistence

let saveTimer: ReturnType<typeof setTimeout> | null = null;

function scheduleSave(): void {
  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    saveTimer = null;
    void saveStore(S);
  }, 400);
}

export async function hydrate(): Promise<void> {
  S = await loadStore();
  hydrated = true;
  emit();
}

export async function resetEverything(): Promise<void> {
  S = freshStore();
  S.dirty['app/plan'] = true;
  await clearStore();
  await saveStore(S);
  emit();
}

// -------------------------------------------------------------------- touches

export function touchDay(date: string): void {
  const d = day(date);
  d.updatedAt = now();
  S.dirty[`days/${date}`] = true;
  scheduleSave();
  emit();
}

export function touchPlan(): void {
  S.plan.updatedAt = now();
  S.dirty['app/plan'] = true;
  scheduleSave();
  emit();
}

// --------------------------------------------------------------------- lookup

export function blankDay(date: string): Day {
  return {
    date,
    food: [],
    sessions: {},
    meals: {},
    weight: null,
    waist: null,
    steps: null,
    note: '',
    updatedAt: now(),
  };
}

/** The day record, created on first touch. */
export function day(date: string): Day {
  if (!S.days[date]) S.days[date] = blankDay(date);
  return S.days[date];
}

/** Base library overlaid with the user's own edits and additions. */
export function allWorkouts(): Record<string, Workout> {
  return { ...BASE_WORKOUTS, ...S.plan.workouts };
}

export function workout(id: string): Workout | null {
  return allWorkouts()[id] ?? null;
}

export function allFoods(): Food[] {
  return FOODS.concat(S.plan.myFoods || []);
}

export function food(id: string): Food | null {
  return allFoods().find((f) => f.id === id) ?? null;
}

// ---------------------------------------------------------------- food actions

export function factorFor(fd: Food, qty: number): number {
  return fd.u === 'g' ? qty / 100 : qty;
}

export function macrosFor(fd: Food, qty: number) {
  const k = factorFor(fd, qty);
  return {
    kcal: Math.round(fd.kcal * k),
    p: Math.round(fd.p * k * 10) / 10,
    cb: Math.round(fd.cb * k * 10) / 10,
    f: Math.round(fd.f * k * 10) / 10,
  };
}

export function addEntry(date: string, meal: MealKey, fd: Food, qty: number): void {
  const m = macrosFor(fd, qty);
  day(date).food.push({
    id: uid(),
    meal,
    foodId: fd.id,
    name: fd.n,
    qty,
    unit: fd.u,
    ...m,
    at: now(),
  });
  touchDay(date);
}

export function addCustomEntry(
  date: string,
  meal: MealKey,
  e: Omit<FoodEntry, 'id' | 'meal' | 'foodId' | 'at'>,
): void {
  day(date).food.push({ id: uid(), meal, foodId: null, at: now(), ...e });
  touchDay(date);
}

export function removeEntry(date: string, entryId: string): void {
  const d = day(date);
  d.food = d.food.filter((e) => e.id !== entryId);
  touchDay(date);
}

// ------------------------------------------------------------- day-level edits

export function toggleSessionDone(date: string, wid: string): void {
  const d = day(date);
  if (!d.sessions[wid]) d.sessions[wid] = { done: false, log: {}, note: '' };
  d.sessions[wid].done = !d.sessions[wid].done;
  touchDay(date);
}

export function toggleMealEaten(date: string, key: MealKey): void {
  const d = day(date);
  d.meals[key] = !d.meals[key];
  touchDay(date);
}

export function setBodyField(
  date: string,
  field: 'weight' | 'waist' | 'steps',
  value: number | null,
): void {
  day(date)[field] = value;
  touchDay(date);
}

// ------------------------------------------------------------ week-level edits

export function setTakeaways(weekId: string, n: number): void {
  const w = S.plan.weeks.find((x) => x.id === weekId);
  if (!w) return;
  w.takeaways = Math.max(0, n);
  touchPlan();
}

export function toggleMealPrep(weekId: string): void {
  const w = S.plan.weeks.find((x) => x.id === weekId);
  if (!w) return;
  w.mealPrepDone = !w.mealPrepDone;
  touchPlan();
}

export function setTheme(theme: 'auto' | 'light' | 'dark'): void {
  S.plan.settings.theme = theme;
  touchPlan();
}
