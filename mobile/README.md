# Built In 8 — mobile

The Expo (React Native) build of the tracker. The web app at the repo root stays
as it is; this is a parallel native client over the same data shapes.

## Running it

```sh
npm install
npx expo start
```

Then open the project in **Expo Go** on your phone (scan the QR code). Everything
here runs in Expo Go — no native modules that need a development build, and the
display font loads at runtime rather than through the `expo-font` config plugin
for exactly that reason.

There is no full Xcode on this machine, so `npx expo run:ios` and the iOS
simulator are not available; use a device, or `eas build` for a real binary.

```sh
npx tsc --noEmit    # typecheck
npx expo-doctor     # config and dependency check
```

## What is built

| Screen | State |
| --- | --- |
| **Today** | Complete — day strip, session card, fuel hero, quick log, meal timetable, body fields, week rules |
| Food, Train, Weeks, Progress | Routed and themed placeholders that name what each will hold |

Today is fully wired to the store: logging a quick-log item, ticking a meal,
marking a session done, typing weight/waist/steps, and the week's takeaway
counter and meal-prep tick all persist immediately.

The placeholders receive real navigation arguments already — Today's per-meal
**Add** pushes `/food?date=…&meal=…`, **Start workout** pushes
`/train?date=…&wid=…` — and display them, so the contract is fixed before those
screens are filled in.

## Layout

```
src/
├── app/                  expo-router routes (file = screen)
│   ├── _layout.tsx       font loading, store hydration, providers
│   └── (tabs)/           the five tabs
├── components/
│   ├── ui.tsx            Card, Band, Bar, Chip, Btn, CheckBox, Display type
│   ├── today/            the seven cards that make up Today
│   ├── Placeholder.tsx   the unbuilt-tab surface
│   └── Toast.tsx
├── data/                 plan data ported verbatim from the web app
│   ├── foods.ts          52 items
│   ├── workouts.ts       Strength A/B/C, circuit, cardio, rest
│   ├── meals.ts          the four eating periods
│   └── plan.ts           week 1 and the default settings
├── lib/                  date, number and totals helpers
├── store/                state, persistence, sync seam, types
└── theme/                tokens and the useTheme hook
```

## State

One mutable `Store` object, published to React through `useSyncExternalStore`
with a version counter — the web app's full-rerender model, minus the manual
DOM work. Every mutation goes through `touchDay()` or `touchPlan()`, which stamp
`updatedAt`, mark the document dirty and schedule a debounced AsyncStorage write.

The persisted shape and the `bi8.store.v1` key are identical to the web app's,
so the two can be bridged without translating anything.

## Sync

Not wired up. The web app mirrors documents to a backend granted by the Claude
Artifacts runtime (`window.claude.use("db")`), which does not exist in React
Native. `src/store/sync.ts` holds the seam: a `SyncAdapter` interface, the
`docFor()` path mapping and the status pill's states. The store already marks
`app/plan` and `days/<date>` dirty exactly as the web app does, so turning sync
on means writing one adapter and calling `setSyncAdapter()`.

## Design

Tokens are ported from the web app's CSS custom properties, light and dark, in
`src/theme/tokens.ts`. The display face is Anton, vendored in `assets/fonts/`
(SIL Open Font License). Body text uses the platform UI font instead of the
web app's Archivo — it reads as native and costs no bundled asset.

`react-dom` is pinned to `19.2.3` through `overrides` because `expo-router`
pulls `19.3.0`, which conflicts with the `react` version Expo SDK 57 pins.
