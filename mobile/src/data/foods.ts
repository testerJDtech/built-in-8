import type { Food } from "../store/types";

/**
 * Food library, ported verbatim from the web app. Composite "portion" items are
 * John's own meal preps, breakfasts and snacks; per-100g values are standard
 * reference figures. Every value stays editable at the point of logging.
 */
export const FOODS: Food[] = [
  // --- protein ---
  { id: "f1", n: "Chicken breast (raw)", c: "Protein", u: "g", kcal: 106, p: 24, cb: 0, f: 1.2, q: 190 },
  { id: "f2", n: "Chicken, cooked/ready", c: "Protein", u: "g", kcal: 165, p: 31, cb: 0, f: 3.6, q: 150 },
  { id: "f3", n: "Turkey mince, lean (raw)", c: "Protein", u: "g", kcal: 137, p: 21.5, cb: 0, f: 5, q: 175 },
  { id: "f4", n: "Beef mince, lean 5% (raw)", c: "Protein", u: "g", kcal: 137, p: 21, cb: 0, f: 5, q: 175 },
  { id: "f5", n: "Eggs, whole", c: "Protein", u: "g", kcal: 143, p: 12.6, cb: 0.7, f: 9.5, q: 150 },
  { id: "f6", n: "Tuna in spring water, drained", c: "Protein", u: "g", kcal: 116, p: 26, cb: 0, f: 1, q: 100 },
  { id: "f7", n: "Salmon fillet (raw)", c: "Protein", u: "g", kcal: 208, p: 20, cb: 0, f: 13, q: 150 },
  { id: "f8", n: "Greek yoghurt, 0% fat", c: "Protein", u: "g", kcal: 57, p: 10, cb: 3.6, f: 0.4, q: 200 },
  { id: "f9", n: "Skyr / high-protein yoghurt", c: "Protein", u: "g", kcal: 63, p: 11, cb: 4, f: 0.2, q: 200 },
  { id: "f10", n: "Cottage cheese, low fat", c: "Protein", u: "g", kcal: 72, p: 12.5, cb: 3.5, f: 1.5, q: 200 },
  { id: "f11", n: "Whey protein powder", c: "Protein", u: "g", kcal: 380, p: 78, cb: 7, f: 5, q: 30 },

  // --- carbs ---
  { id: "f20", n: "Basmati rice (dry)", c: "Carbs", u: "g", kcal: 349, p: 8.5, cb: 78, f: 0.9, q: 80 },
  { id: "f21", n: "Microwave rice pouch", c: "Carbs", u: "g", kcal: 150, p: 3.3, cb: 30, f: 1.5, q: 250 },
  { id: "f22", n: "Potatoes (raw)", c: "Carbs", u: "g", kcal: 77, p: 2, cb: 17, f: 0.1, q: 300 },
  { id: "f23", n: "Oats", c: "Carbs", u: "g", kcal: 379, p: 13, cb: 67, f: 7, q: 60 },
  { id: "f24", n: "Pasta (dry)", c: "Carbs", u: "g", kcal: 352, p: 12, cb: 71, f: 1.5, q: 80 },
  { id: "f25", n: "Wholemeal bread", c: "Carbs", u: "slice", kcal: 100, p: 4.5, cb: 16, f: 1.2, q: 2 },
  { id: "f26", n: "Wholemeal wrap", c: "Carbs", u: "wrap", kcal: 160, p: 5.5, cb: 27, f: 3.5, q: 1 },
  { id: "f27", n: "Kidney beans, drained", c: "Carbs", u: "g", kcal: 100, p: 7, cb: 15, f: 0.5, q: 60 },

  // --- veg & fruit ---
  { id: "f40", n: "Broccoli", c: "Veg & fruit", u: "g", kcal: 34, p: 2.8, cb: 4, f: 0.4, q: 200 },
  { id: "f41", n: "Frozen mixed vegetables", c: "Veg & fruit", u: "g", kcal: 42, p: 2.5, cb: 6, f: 0.5, q: 200 },
  { id: "f42", n: "Peppers", c: "Veg & fruit", u: "g", kcal: 26, p: 1, cb: 4.6, f: 0.3, q: 100 },
  { id: "f43", n: "Onion", c: "Veg & fruit", u: "g", kcal: 40, p: 1.1, cb: 8, f: 0.1, q: 80 },
  { id: "f44", n: "Spinach", c: "Veg & fruit", u: "g", kcal: 23, p: 2.9, cb: 1.4, f: 0.4, q: 80 },
  { id: "f45", n: "Tomatoes", c: "Veg & fruit", u: "g", kcal: 18, p: 0.9, cb: 3.4, f: 0.2, q: 100 },
  { id: "f46", n: "Salad bag", c: "Veg & fruit", u: "g", kcal: 17, p: 1.4, cb: 2, f: 0.3, q: 80 },
  { id: "f47", n: "Cucumber", c: "Veg & fruit", u: "g", kcal: 15, p: 0.7, cb: 3.6, f: 0.1, q: 100 },
  { id: "f48", n: "Banana", c: "Veg & fruit", u: "g", kcal: 89, p: 1.1, cb: 23, f: 0.3, q: 120 },
  { id: "f49", n: "Apple", c: "Veg & fruit", u: "g", kcal: 52, p: 0.3, cb: 14, f: 0.2, q: 150 },
  { id: "f50", n: "Orange / easy peeler", c: "Veg & fruit", u: "g", kcal: 47, p: 0.9, cb: 12, f: 0.1, q: 130 },
  { id: "f51", n: "Frozen berries", c: "Veg & fruit", u: "g", kcal: 45, p: 0.8, cb: 9, f: 0.3, q: 100 },

  // --- flavour ---
  { id: "f60", n: "Passata / chopped tomatoes", c: "Flavour", u: "g", kcal: 35, p: 1.5, cb: 6, f: 0.2, q: 150 },
  { id: "f61", n: "Salsa", c: "Flavour", u: "g", kcal: 36, p: 1.5, cb: 7, f: 0.2, q: 30 },
  { id: "f62", n: "Light mayo", c: "Flavour", u: "g", kcal: 245, p: 0.9, cb: 8, f: 23, q: 15 },
  { id: "f63", n: "Olive oil", c: "Flavour", u: "g", kcal: 884, p: 0, cb: 0, f: 100, q: 10 },
  { id: "f64", n: "Dry spices (Cajun, jerk, curry, paprika, garlic, chilli, herbs)", c: "Flavour", u: "g", kcal: 0, p: 0, cb: 0, f: 0, q: 5 },

  // --- my meals ---
  { id: "m1", n: "Meal Prep A — Cajun chicken rice bowl", c: "My meals", u: "portion", kcal: 570, p: 58, cb: 73, f: 4, q: 1, d: "190g raw chicken breast, 80g dry basmati, 200g broccoli/mixed veg, salsa" },
  { id: "m2", n: "Meal Prep B — Turkey/beef chilli bowl", c: "My meals", u: "portion", kcal: 620, p: 51, cb: 72, f: 10, q: 1, d: "175g raw lean mince, 300g potatoes, peppers + onion, passata, kidney beans" },
  { id: "m3", n: "Protein overnight oats", c: "My meals", u: "portion", kcal: 540, p: 37, cb: 86, f: 5, q: 1, d: "60g oats, 250g Skyr, frozen berries, banana" },
  { id: "m4", n: "Egg breakfast", c: "My meals", u: "portion", kcal: 495, p: 29, cb: 54, f: 17, q: 1, d: "3 eggs, 2 slices wholemeal toast, fruit" },
  { id: "m5", n: "Quick breakfast", c: "My meals", u: "portion", kcal: 420, p: 29, cb: 69, f: 4, q: 1, d: "High-protein yoghurt, oats, banana, berries" },

  // --- snacks ---
  { id: "s1", n: "Skyr + fruit", c: "Snacks", u: "portion", kcal: 235, p: 23, cb: 35, f: 1, q: 1 },
  { id: "s2", n: "Greek yoghurt + berries", c: "Snacks", u: "portion", kcal: 160, p: 21, cb: 16, f: 1, q: 1 },
  { id: "s3", n: "Protein shake + banana", c: "Snacks", u: "portion", kcal: 220, p: 25, cb: 29, f: 2, q: 1 },
  { id: "s4", n: "2 boiled eggs + fruit", c: "Snacks", u: "portion", kcal: 220, p: 13, cb: 22, f: 10, q: 1 },
  { id: "s5", n: "Cottage cheese + fruit", c: "Snacks", u: "portion", kcal: 220, p: 26, cb: 28, f: 3, q: 1 },
  { id: "s6", n: "Tuna wrap (bigger snack)", c: "Snacks", u: "portion", kcal: 320, p: 32, cb: 29, f: 8, q: 1 },

  // --- rescue ---
  { id: "r1", n: "Rescue 1 — ready chicken + rice + salad", c: "Rescue", u: "portion", kcal: 640, p: 56, cb: 77, f: 9, q: 1 },
  { id: "r2", n: "Rescue 2 — tuna + rice + salad", c: "Rescue", u: "portion", kcal: 620, p: 61, cb: 77, f: 6, q: 1 },
  { id: "r3", n: "Rescue 3 — chicken + wraps + salad + salsa", c: "Rescue", u: "portion", kcal: 590, p: 58, cb: 58, f: 13, q: 1 },
  { id: "r4", n: "Rescue 4 — eggs + potatoes/rice + veg", c: "Rescue", u: "portion", kcal: 530, p: 30, cb: 63, f: 15, q: 1 },
  { id: "r5", n: "Planned takeaway", c: "Rescue", u: "portion", kcal: 900, p: 35, cb: 90, f: 40, q: 1, d: "Estimate only — edit the numbers to match what you actually ate." },
];
