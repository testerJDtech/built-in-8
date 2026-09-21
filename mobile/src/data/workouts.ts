import type { Workout } from '../store/types';

export const PROG_NOTE =
  'Progress by adding reps, slowing the lowering phase, using a stronger band or adding backpack load. Stop most sets with 1-3 good reps still available.';

export const BASE_WORKOUTS: Record<string, Workout> = {
  A: {
    id: 'A',
    name: 'Strength A',
    kind: 'strength',
    note: PROG_NOTE,
    ex: [
      { name: 'Bodyweight/backpack squat', sets: 3, reps: '10-15' },
      { name: 'Push-ups', sets: 3, reps: '6-15' },
      { name: 'Resistance-band row', sets: 3, reps: '10-15' },
      { name: 'Band/backpack Romanian deadlift', sets: 3, reps: '10-15' },
      { name: 'Band overhead press', sets: 3, reps: '8-12' },
      { name: 'Plank', sets: 3, reps: '30-60 sec' },
      { name: 'Optional curls', sets: 2, reps: '12-15', opt: true },
    ],
  },
  B: {
    id: 'B',
    name: 'Strength B',
    kind: 'strength',
    note: PROG_NOTE,
    ex: [
      { name: 'Bulgarian split squat', sets: 3, reps: '8-12 each leg' },
      { name: 'Push-up variation', sets: 3, reps: '8-15' },
      { name: 'Band lat pulldown/high row', sets: 3, reps: '10-15' },
      { name: 'Glute bridge', sets: 3, reps: '12-20' },
      { name: 'Pike push-up', sets: 3, reps: '6-12' },
      { name: 'Band face pull', sets: 2, reps: '15-20' },
      { name: 'Side plank', sets: 3, reps: '30-45 sec each' },
    ],
  },
  C: {
    id: 'C',
    name: 'Strength C',
    kind: 'strength',
    note: PROG_NOTE,
    ex: [
      { name: 'Reverse lunge', sets: 3, reps: '10 each leg' },
      { name: 'Push-ups', sets: 3, reps: '8-15' },
      { name: 'Single-arm band/backpack row', sets: 3, reps: '12 each side' },
      { name: 'Single-leg Romanian deadlift', sets: 3, reps: '10 each' },
      { name: 'Band chest press', sets: 3, reps: '10-15' },
      { name: 'Biceps curl', sets: 2, reps: '12-15' },
      { name: 'Triceps extension', sets: 2, reps: '12-15' },
      { name: 'Dead bug', sets: 3, reps: '10 each side' },
    ],
  },
  circuit: {
    id: 'circuit',
    name: '20-minute busy-day circuit',
    kind: 'circuit',
    note: 'Complete 3 rounds at a steady pace. Rest 60-90 seconds between rounds. Use this when a full workout is unrealistic, not as punishment for missing a session.',
    ex: [
      { name: 'Squats', sets: 3, reps: '15' },
      { name: 'Push-ups', sets: 3, reps: '8-12' },
      { name: 'Band rows', sets: 3, reps: '15' },
      { name: 'Reverse lunges', sets: 3, reps: '10 each leg' },
      { name: 'Plank', sets: 3, reps: '30 sec' },
    ],
  },
  run: { id: 'run', name: 'Run', kind: 'cardio', ex: [] },
  walk: { id: 'walk', name: 'Walk', kind: 'cardio', ex: [] },
  sport: { id: 'sport', name: 'Sport', kind: 'cardio', ex: [] },
  rest: { id: 'rest', name: 'Rest', kind: 'rest', ex: [] },
};

export const SPORTS = [
  'Football',
  'Badminton',
  'BJJ',
  'Boxing',
  'Tennis',
  'Basketball',
  'Swimming',
];
