import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BodyCard } from '../../components/today/BodyCard';
import { DayStrip } from '../../components/today/DayStrip';
import { HeroFuel } from '../../components/today/HeroFuel';
import { MealTimetable } from '../../components/today/MealTimetable';
import { QuickLog } from '../../components/today/QuickLog';
import { SessionCard } from '../../components/today/SessionCard';
import { WeekBits } from '../../components/today/WeekBits';
import { Body, Display, Eyebrow, Pill } from '../../components/ui';
import { dayName, fmtDate, todayISO } from '../../lib/date';
import { weekOf } from '../../lib/totals';
import { useStore } from '../../store/store';
import { syncStatus } from '../../store/sync';
import { useTheme } from '../../theme/useTheme';

/**
 * Opens on today, unless today falls outside every planned week — then it opens
 * on the first day of week 1, as the web app does.
 */
function initialDate(weeks: { days: { date: string }[] }[]): string {
  const t = todayISO();
  const inAWeek = weeks.some((w) => w.days.some((d) => d.date === t));
  if (inAWeek) return t;
  const first = weeks[0]?.days[0]?.date;
  return first ?? t;
}

export default function TodayScreen() {
  const S = useStore();
  const { c } = useTheme();
  const insets = useSafeAreaInsets();
  const [date, setDate] = useState(() => initialDate(S.plan.weeks));

  const week = weekOf(S, date);
  const sync = syncStatus(S);

  return (
    <ScrollView
      style={{ backgroundColor: c.bg }}
      contentContainerStyle={{
        paddingTop: insets.top + 8,
        paddingHorizontal: 16,
        paddingBottom: 32,
      }}
      keyboardShouldPersistTaps="handled"
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <Display size={20} color={c.red}>
          Built <Display size={20}>In 8</Display>
        </Display>
        <View style={{ flex: 1 }} />
        <Pill tone={sync.tone} label={sync.label} />
      </View>

      <View style={{ marginTop: 14 }}>
        <Eyebrow>
          {(week ? `Week ${week.num} · ` : '') +
            fmtDate(date) +
            (date === todayISO() ? ' · today' : '')}
        </Eyebrow>
        <Display size={46} color={c.red}>
          {dayName(date)}
        </Display>
      </View>

      <DayStrip date={date} onPick={setDate} />
      <SessionCard date={date} />
      <HeroFuel date={date} />
      <QuickLog date={date} />
      <MealTimetable date={date} />
      <BodyCard date={date} />
      <WeekBits date={date} />

      <Body size={12} muted style={{ marginTop: 14 }}>
        A general fitness and nutrition framework, not individual medical care.
      </Body>
    </ScrollView>
  );
}
