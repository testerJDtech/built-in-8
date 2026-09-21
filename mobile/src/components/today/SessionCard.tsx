import { useRouter } from 'expo-router';
import { View } from 'react-native';

import { dayPlan, sessionDone, weekOf } from '../../lib/totals';
import { toggleSessionDone, useStore, workout } from '../../store/store';
import { BASE_WORKOUTS } from '../../data/workouts';
import { Band, Body, Btn, Card, Display } from '../ui';

export function SessionCard({ date }: { date: string }) {
  const S = useStore();
  const router = useRouter();
  const dp = dayPlan(S, date);

  if (!dp) {
    return (
      <Card>
        <Body size={13} muted>
          This date is not in a week yet.
        </Body>
        <Btn
          label="Add a week"
          tone="red"
          small
          style={{ marginTop: 8, alignSelf: 'flex-start' }}
          onPress={() => router.push('/weeks')}
        />
      </Card>
    );
  }

  const wk = workout(dp.wid) ?? BASE_WORKOUTS.rest;
  const done = sessionDone(S, date, dp.wid);

  return (
    <Card padded={false}>
      <Band left="Today's session" right={dp.when || (wk.kind === 'rest' ? 'Recovery' : undefined)} />
      <View style={{ paddingHorizontal: 14, paddingVertical: 13 }}>
        <Display
          size={22}
          style={done ? { textDecorationLine: 'line-through', opacity: 0.55 } : undefined}
        >
          {dp.label || wk.name}
        </Display>
        {dp.target ? (
          <Body size={13} muted>
            Target {dp.target}
          </Body>
        ) : null}
        {dp.sport ? <Body size={13}>Sport: {dp.sport}</Body> : null}
        {dp.note ? (
          <Body size={13} muted style={{ marginTop: 4 }}>
            {dp.note}
          </Body>
        ) : null}

        {wk.kind !== 'rest' ? (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>
            <Btn
              label={wk.ex.length ? (done ? 'Review log' : 'Start workout') : done ? 'Review' : 'Log it'}
              tone="red"
              small
              onPress={() =>
                router.push({ pathname: '/train', params: { date, wid: dp.wid } })
              }
            />
            <Btn
              label={done ? 'Done' : 'Mark done'}
              tone={done ? 'solid' : 'outline'}
              small
              onPress={() => toggleSessionDone(date, dp.wid)}
            />
            {wk.kind === 'strength' ? (
              <Btn
                label="Use 20-min circuit"
                tone="ghost"
                small
                onPress={() =>
                  router.push({ pathname: '/train', params: { date, wid: 'circuit' } })
                }
              />
            ) : null}
          </View>
        ) : (
          <>
            <Body size={13} muted style={{ marginTop: 8 }}>
              No formal workout. Shop, prep two meals and run your Sunday check-in.
            </Body>
            <Btn
              label="Open Sunday check-in"
              tone="red"
              small
              style={{ marginTop: 10, alignSelf: 'flex-start' }}
              onPress={() =>
                router.push({ pathname: '/weeks', params: { checkin: weekOf(S, date)?.id ?? '' } })
              }
            />
          </>
        )}
      </View>
    </Card>
  );
}
