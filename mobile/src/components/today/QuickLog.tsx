import { useRouter } from 'expo-router';
import { View } from 'react-native';

import { guessMeal } from '../../lib/totals';
import { addEntry, food } from '../../store/store';
import { useToast } from '../Toast';
import { Card, Chip, Eyebrow } from '../ui';

/** The six one-tap items the web app puts on Today. */
const PICKS = ['m1', 'm2', 'm3', 's1', 's3', 'r1'];

const SHORT: Record<string, string> = {
  'Meal Prep A — ': 'A: ',
  'Meal Prep B — ': 'B: ',
  'Rescue 1 — ': 'Rescue: ',
};

function shortName(n: string): string {
  for (const [long, short] of Object.entries(SHORT)) {
    if (n.startsWith(long)) return short + n.slice(long.length);
  }
  return n;
}

export function QuickLog({ date }: { date: string }) {
  const router = useRouter();
  const toast = useToast();

  return (
    <Card>
      <Eyebrow>Quick log</Eyebrow>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
        {PICKS.map((id) => {
          const fd = food(id);
          if (!fd) return null;
          return (
            <Chip
              key={id}
              label={shortName(fd.n)}
              onPress={() => {
                const meal = guessMeal(date);
                addEntry(date, meal, fd, fd.q);
                toast(`${fd.n.split('—')[0].trim()} added to ${meal}`);
              }}
            />
          );
        })}
        <Chip
          ghost
          label="Search all food"
          onPress={() =>
            router.push({ pathname: '/food', params: { date, meal: guessMeal(date) } })
          }
        />
      </View>
    </Card>
  );
}
