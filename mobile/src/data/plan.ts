import type { Settings, Week } from "../store/types";

export const DEFAULT_SETTINGS: Settings = {
  kcalMin: 2250,
  kcalMax: 2400,
  proMin: 150,
  proMax: 170,
  steps: 6500,
  mealTimes: { breakfast: "07:30", lunch: "12:30", snack: "16:00", dinner: "19:00" },
  theme: "auto",
  showFat: true,
};

/** Week 1 exactly as written in the plan. Later weeks are added by the user. */
export function week1(): Week {
  return {
    id: "w1",
    num: 1,
    start: "2026-09-21",
    mealPrepDone: false,
    takeaways: 0,
    notes: "",
    days: [
      { date: "2026-09-21", wid: "A", label: "Strength A", target: "40-50 min", when: "After work", sport: "", note: "" },
      { date: "2026-09-22", wid: "walk", label: "Walk at lunchtime", target: "30-40 min", when: "Lunchtime", sport: "", note: "" },
      { date: "2026-09-23", wid: "walk", label: "Walk during lunch", target: "30-40 min", when: "Lunchtime", sport: "", note: "" },
      { date: "2026-09-24", wid: "B", label: "Strength B", target: "40-50 min", when: "After work", sport: "", note: "" },
      { date: "2026-09-25", wid: "C", label: "Back & calisthenics, weighted dips (Strength C)", target: "40-50 min", when: "", sport: "", note: "" },
      { date: "2026-09-26", wid: "run", label: "Easy run", target: "3-4 km", when: "", sport: "", note: "Don't focus on the time." },
      { date: "2026-09-27", wid: "rest", label: "Rest and meal prep", target: "", when: "", sport: "", note: "" },
    ],
  };
}
