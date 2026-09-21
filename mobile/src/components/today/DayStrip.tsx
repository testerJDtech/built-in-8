import { Pressable, StyleSheet, Text, View } from 'react-native';

import { DOW, parseISO, todayISO } from '../../lib/date';
import { sessionDone, weekOf } from '../../lib/totals';
import { useStore } from '../../store/store';
import { useTheme } from '../../theme/useTheme';
import { Display } from '../ui';

export function DayStrip({
  date,
  onPick,
}: {
  date: string;
  onPick: (d: string) => void;
}) {
  const S = useStore();
  const { c } = useTheme();
  const week = weekOf(S, date) ?? S.plan.weeks[0];

  return (
    <View
      accessibilityRole="tablist"
      accessibilityLabel="Days this week"
      style={{ flexDirection: 'row', gap: 4, marginVertical: 12 }}
    >
      {week.days.map((dp) => {
        const d = parseISO(dp.date);
        const selected = dp.date === date;
        const isToday = dp.date === todayISO();
        const done = dp.wid !== 'rest' && sessionDone(S, dp.date, dp.wid);
        const has = !!dp.wid && dp.wid !== 'rest';

        return (
          <Pressable
            key={dp.date}
            accessibilityRole="tab"
            accessibilityState={{ selected }}
            accessibilityLabel={`${DOW[d.getDay()]} ${d.getDate()}`}
            onPress={() => onPick(dp.date)}
            style={{
              flex: 1,
              alignItems: 'center',
              gap: 2,
              paddingVertical: 6,
              borderRadius: 3,
              backgroundColor: selected ? c.band : c.surface,
              borderWidth: isToday ? 2 : StyleSheet.hairlineWidth * 2,
              borderColor: isToday ? c.red : selected ? c.band : c.line,
            }}
          >
            <Text
              style={{
                fontSize: 10,
                fontWeight: '700',
                color: selected ? c.onband : c.ink2,
                opacity: selected ? 0.75 : 1,
              }}
            >
              {DOW[d.getDay()].toUpperCase()}
            </Text>
            <Display size={17} color={selected ? c.onband : c.ink}>
              {String(d.getDate())}
            </Display>
            <View
              style={{
                width: 5,
                height: 5,
                borderRadius: 3,
                backgroundColor: done ? c.good : has ? c.red : 'transparent',
              }}
            />
          </Pressable>
        );
      })}
    </View>
  );
}
