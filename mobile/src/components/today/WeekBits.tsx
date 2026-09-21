import { Pressable, View } from 'react-native';

import { weekOf } from '../../lib/totals';
import { setTakeaways, toggleMealPrep, useStore } from '../../store/store';
import { useTheme } from '../../theme/useTheme';
import { Body, Btn, Card, CheckBox, Display, Eyebrow } from '../ui';

export function WeekBits({ date }: { date: string }) {
  const S = useStore();
  const { c } = useTheme();
  const w = weekOf(S, date);
  if (!w) return null;

  const takeaways = w.takeaways || 0;

  return (
    <Card>
      <Eyebrow>Week {w.num} rules</Eyebrow>

      <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
        <Body size={13}>Takeaways used</Body>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
          <Btn label="−" small onPress={() => setTakeaways(w.id, takeaways - 1)} />
          <Display size={22} style={{ minWidth: 30, textAlign: 'center' }}>
            {String(takeaways)}
          </Display>
          <Btn label="+" small onPress={() => setTakeaways(w.id, takeaways + 1)} />
        </View>
        <Body size={12} color={takeaways > 1 ? c.red : c.ink2}>
          {takeaways > 1 ? 'Over the one planned meal' : 'Allowance: 1 planned meal'}
        </Body>
      </View>

      <Pressable
        accessibilityRole="checkbox"
        accessibilityState={{ checked: w.mealPrepDone }}
        onPress={() => toggleMealPrep(w.id)}
        style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginTop: 12 }}
      >
        <CheckBox on={w.mealPrepDone} />
        <View style={{ flex: 1 }}>
          <Body weight="700">Two repeatable meals prepped</Body>
          <Body size={12} muted>
            Cajun chicken rice bowls and turkey/beef chilli bowls, or your swap for the week
          </Body>
        </View>
      </Pressable>
    </Card>
  );
}
