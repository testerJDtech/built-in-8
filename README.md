# Built In 8

A single-page training and nutrition tracker for an 8-week block. No build step, no
dependencies, no backend of its own — open `index.html` and it runs.

The app renders five tabs from one in-memory store:

| Tab | What it does |
| --- | --- |
| **Today** | Day strip for the week, calorie/protein hero numbers, the day's session, meal timetable, quick food log, weight/waist/steps |
| **Food** | Searchable food library with per-100 g or per-portion macros; every value is editable when logging, and custom foods can be saved |
| **Train** | Workout library (Strength A/B/C, 20-minute circuit, run/walk/sport/rest) with editable exercises, sets and reps |
| **Weeks** | Week planner — edit each day's session, copy a previous week forward, run an end-of-week check-in |
| **Progress** | Weight, waist, calorie and protein charts, plus weekly averages |

Week 1 is seeded from a fixed plan starting **2026-09-21**; later weeks are added by hand
or copied from an earlier week.

## Running it

Open `index.html` in a browser. For a local server (needed only if your browser blocks
`file://` requests):

```sh
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Files

```
index.html   markup shell — two mount points (#app, #nav) and the font/style/script links
styles.css   design tokens and every component style; light and dark via prefers-color-scheme
app.js       the whole app: data, store, sync, totals, screens, sheets, charts
```

`app.js` is a plain classic script (no modules, no bundler) organised in numbered
sections: static plan data → helpers → store → sync → totals → view state → screens →
sheets → charts → start. It is ES5-flavoured on purpose so it runs anywhere without
transpiling.

## Data and storage

State lives in one object, `S`:

- `S.plan` — settings, weeks, custom workouts, saved foods, `updatedAt`
- `S.days[YYYY-MM-DD]` — food entries, completed sessions, meal ticks, weight, waist, steps
- `S.dirty` — set of document paths waiting to sync

Everything is persisted to `localStorage` under the key `bi8.store.v1`, debounced on
write. That alone is enough for the app to work fully offline on one device.

### Cloud sync

When the page is served inside a Claude Artifacts runtime that grants the `db`
capability, `initSync()` picks it up via `window.claude.use("db")` and mirrors the store
to two kinds of documents: `app/plan` and `days/<date>`. Conflict resolution is last
write wins, compared per document by `updatedAt`, so two devices can both go offline and
neither loses a whole day's log. Outside that runtime there is no cloud call at all and
the status pill reads "Saved on device".

Settings defaults: 2250–2400 kcal, 150–170 g protein, 6500 steps, theme `auto`.

## Note

This is a general fitness and nutrition framework, not individual medical care. Anyone
with a medical condition, medication affecting weight or appetite, a history of
disordered eating, or concerning symptoms during exercise should speak to a qualified
healthcare professional first.
