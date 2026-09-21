import { View } from 'react-native';

import { group, n0 } from '../../lib/num';
import { dayTotals } from '../../lib/totals';
import { useStore } from '../../store/store';
import { useTheme } from '../../theme/useTheme';
import { Bar, Body, Card, Display, Eyebrow, MeterCell, MeterGrid } from '../ui';

export function HeroFuel({ date }: { date: string }) {
  const S = useStore();
  const { c } = useTheme();
  const t = dayTotals(S, date);
  const s = S.plan.settings;
  const d = S.days[date];
  const left = s.kcalMin - t.kcal;

  const status =
    left > 0
      ? `${group(left)} to reach ${group(s.kcalMin)}, range up to ${group(s.kcalMax)}`
      : t.kcal > s.kcalMax
        ? `${group(t.kcal - s.kcalMax)} over the top of your range`
        : `Inside your ${group(s.kcalMin)}-${group(s.kcalMax)} range`;

  return (
    <Card padded={false}>
      <View style={{ paddingHorizontal: 14, paddingTop: 14, paddingBottom: 12 }}>
        <Eyebrow>Eaten today</Eyebrow>
        <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
          <Display size={72} color={c.red}>
            {group(t.kcal)}
          </Display>
          <Display size={22} color={c.ink2} style={{ marginLeft: 6 }}>
            kcal
          </Display>
        </View>
        <Body size={13} muted style={{ marginTop: 2, marginBottom: 10 }}>
          {status}
        </Body>
        <Bar frac={t.kcal / s.kcalMax} markFrac={s.kcalMin / s.kcalMax} />
      </View>

      <MeterGrid>
        <MeterCell
          value={`${n0(t.p)}g`}
          label={`Protein — target ${s.proMin}-${s.proMax}g`}
        >
          <Bar frac={t.p / s.proMax} markFrac={s.proMin / s.proMax} thin />
        </MeterCell>
        <MeterCell
          value={d?.steps ? group(d.steps) : '—'}
          label={`Steps — aim ${group(s.steps)}+`}
        >
          <Bar frac={(d?.steps ?? 0) / s.steps} thin />
        </MeterCell>
      </MeterGrid>

      <MeterGrid>
        <MeterCell value={`${n0(t.cb)}g`} label="Carbohydrate" />
        <MeterCell value={`${n0(t.f)}g`} label="Fat" />
      </MeterGrid>
    </Card>
  );
}
