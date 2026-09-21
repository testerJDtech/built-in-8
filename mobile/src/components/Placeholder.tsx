import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '../theme/useTheme';
import { Body, Card, Display, Eyebrow, Rule } from './ui';

/**
 * A tab that is routed and themed but not built yet. `pending` shows the
 * arguments Today already hands over, so the contract is visible while the
 * screen is filled in.
 */
export function Placeholder({
  title,
  intro,
  points,
  pending,
}: {
  title: string;
  intro: string;
  points: string[];
  pending?: string | null;
}) {
  const { c } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={{ backgroundColor: c.bg }}
      contentContainerStyle={{
        paddingTop: insets.top + 18,
        paddingHorizontal: 16,
        paddingBottom: 32,
      }}
    >
      <Eyebrow>Next up</Eyebrow>
      <Display size={46} color={c.red}>
        {title}
      </Display>
      <Rule />

      <Card>
        <Body size={14}>{intro}</Body>
      </Card>

      {pending ? (
        <Card>
          <Eyebrow>Handed over from Today</Eyebrow>
          <Body size={14}>{pending}</Body>
        </Card>
      ) : null}

      <Card>
        <Eyebrow>What this screen will hold</Eyebrow>
        {points.map((p) => (
          <View key={p} style={{ flexDirection: 'row', gap: 8, marginTop: 6 }}>
            <Body size={14} color={c.red}>
              —
            </Body>
            <Body size={14} style={{ flex: 1 }}>
              {p}
            </Body>
          </View>
        ))}
      </Card>
    </ScrollView>
  );
}
