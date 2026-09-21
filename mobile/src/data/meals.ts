import type { Meal } from "../store/types";

/** The four eating periods the plan is built around. */
export const MEALS: Meal[] = [
  { key: "breakfast", name: "Breakfast", time: "7:00-8:30", goal: "Start with protein + slow carbs/fruit" },
  { key: "lunch", name: "Lunch", time: "12:00-13:30", goal: "Prepared meal; protein + carb + vegetables" },
  { key: "snack", name: "Planned snack", time: "15:30-17:00", goal: "Protein + fruit; useful before training" },
  { key: "dinner", name: "Dinner", time: "18:30-20:30", goal: "Protein + carb + vegetables; move earlier on Tuesday/Wednesday" },
];
