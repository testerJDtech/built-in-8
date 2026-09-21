import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { MEALS } from '../../data/meals';
import { n0 } from '../../lib/num';
import { mealTotals } from '../../lib/totals';
import { toggleMealEaten, useStore } from '../../store/store';
import { useTheme } from '../../theme/useTheme';
import { Band, Body, Btn, Card, CheckBox } from '../ui';

export function MealTimetable({ date }: { date: string }) {
  const S = useStore();
  const { c } = useTheme();
  const router = useRouter();
  const d = S.days[date];

  return (
    <Card padded={false}>
      <Band left="Eating rhythm" right="3 meals + 1 planned snack" />
      <View style={{ paddingHorizontal: 14, paddingTop: 4, paddingBottom: 13 }}>
        {MEALS.map((m) => {
          const t = mealTotals(S, date, m.key);
          const eaten = !!d?.meals?.[m.key];
          return (
            <View
              key={m.key}
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                gap: 10,
                paddingVertical: 10,
                borderTopWidth: StyleSheet.hairlineWidth * 2,
                borderTopColor: c.line,
              }}
            >
              <Pressable
                accessibilityRole="checkbox"
                accessibilityState={{ checked: eaten }}
                accessibilityLabel={`Mark ${m.name} eaten`}
                onPress={() => toggleMealEaten(date, m.key)}
                hitSlop={8}
                style={{ paddingTop: 2 }}
              >
                <CheckBox on={eaten} />
              </Pressable>

              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 7 }}>
                  <Body weight="700">{m.name}</Body>
                  <Body size={12} muted>
                    {m.time}
                  </Body>
                </View>
                <Body size={12} muted>
                  {m.goal}
                </Body>
                <Body size={12} color={c.red} style={{ marginTop: 2 }}>
                  Reminder {S.plan.settings.mealTimes[m.key] ?? '—'}
                </Body>
              </View>

              <View style={{ alignItems: 'flex-end', gap: 6 }}>
                <Body size={12} muted>
                  {t.kcal ? `${n0(t.kcal)} kcal · ${n0(t.p)}g P` : 'nothing logged'}
                </Body>
                <Btn
                  label="Add"
                  tone="ghost"
                  small
                  onPress={() =>
                    router.push({ pathname: '/food', params: { date, meal: m.key } })
                  }
                />
              </View>
            </View>
          );
        })}

        <Body size={12} muted style={{ marginTop: 10 }}>
          Anti-grazing rule: decide the four eating periods in advance. If you are hungry
          between them, check fluids first, then whether the last meal had enough protein,
          fibre and volume.
        </Body>
      </View>
    </Card>
  );
}
