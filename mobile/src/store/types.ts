/**
 * The persisted shape, kept identical to the web app's `bi8.store.v1` so a
 * future sync layer can move documents between the two without translation.
 */

export type Unit = 'g' | 'slice' | 'wrap' | 'portion';
export type MealKey = 'breakfast' | 'lunch' | 'snack' | 'dinner';
export type WorkoutKind = 'strength' | 'circuit' | 'cardio' | 'rest';

export interface Food {
  id: string;
  n: string;
  c: string;
  u: Unit;
  kcal: number;
  p: number;
  cb: number;
  f: number;
  /** default quantity offered when logging */
  q: number;
  /** what the portion is made of, for composite items */
  d?: string;
}

export interface Exercise {
  name: string;
  sets: number;
  reps: string;
  opt?: boolean;
}

export interface Workout {
  id: string;
  name: string;
  kind: WorkoutKind;
  note?: string;
  ex: Exercise[];
}

export interface Meal {
  key: MealKey;
  name: string;
  time: string;
  goal: string;
}

export interface DayPlan {
  date: string;
  wid: string;
  label: string;
  target: string;
  when: string;
  sport: string;
  note: string;
}

export interface Week {
  id: string;
  num: number;
  start: string;
  mealPrepDone: boolean;
  takeaways: number;
  notes: string;
  days: DayPlan[];
}

export interface FoodEntry {
  id: string;
  meal: MealKey;
  foodId: string | null;
  name: string;
  qty: number;
  unit: Unit;
  kcal: number;
  p: number;
  cb: number;
  f: number;
  at: number;
}

export interface SessionLog {
  done: boolean;
  log: Record<string, string>;
  note: string;
}

export interface Day {
  date: string;
  food: FoodEntry[];
  sessions: Record<string, SessionLog>;
  meals: Partial<Record<MealKey, boolean>>;
  weight: number | null;
  waist: number | null;
  steps: number | null;
  note: string;
  updatedAt: number;
}

export interface Settings {
  kcalMin: number;
  kcalMax: number;
  proMin: number;
  proMax: number;
  steps: number;
  mealTimes: Record<MealKey, string>;
  theme: 'auto' | 'light' | 'dark';
  showFat: boolean;
}

export interface Plan {
  settings: Settings;
  weeks: Week[];
  /** user edits to the base workout library, keyed by workout id */
  workouts: Record<string, Workout>;
  myFoods: Food[];
  updatedAt: number;
}

export interface Store {
  v: number;
  plan: Plan;
  days: Record<string, Day>;
  /** document paths waiting to reach a backend: "app/plan" or "days/<date>" */
  dirty: Record<string, true>;
}

export interface Totals {
  kcal: number;
  p: number;
  cb: number;
  f: number;
}
