import { useRouter } from 'expo-router';
import { TextInput, View } from 'react-native';

import { dayPlan, sessionStatus, weekOf } from '../../lib/totals';
import { setMissReason, setSessionStatus, useStore, workout } from '../../store/store';
import { BASE_WORKOUTS } from '../../data/workouts';
import { MISS_REASONS } from '../../data/plan';
import { useTheme } from '../../theme/useTheme';
import { Band, Body, Btn, Card, Chip, Display, StatBadge } from '../ui';

export function SessionCard({ date }: { date: string }) {
  const S = useStore();
  const router = useRouter();
  const { c, radius } = useTheme();
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
  const status = sessionStatus(S, date, dp.wid);
  const done = status === 'done';
  const missed = status === 'missed';
  const reason = S.days[date]?.sessions?.[dp.wid]?.missReason ?? '';

  return (
    <Card padded={false}>
      <Band left="Today's session" right={dp.when || (wk.kind === 'rest' ? 'Recovery' : undefined)} />
      <View style={{ paddingHorizontal: 14, paddingVertical: 13 }}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 12 }}>
          <View style={{ flex: 1 }}>
            <Display
              size={22}
              style={done ? { textDecorationLine: 'line-through', opacity: 0.55 } : undefined}
            >
              {dp.label || wk.name}
            </Display>
          </View>
          {status ? <StatBadge status={status} /> : null}
        </View>
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
              onPress={() => setSessionStatus(date, dp.wid, 'done')}
            />
            <Btn
              label={missed ? 'Not done' : "Didn't do it"}
              tone={missed ? 'warn' : 'outline'}
              small
              onPress={() => setSessionStatus(date, dp.wid, 'missed')}
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
        ) : null}

        {wk.kind !== 'rest' && missed ? (
          <View
            style={{
              marginTop: 12,
              padding: 12,
              backgroundColor: c.surface2,
              borderLeftWidth: 4,
              borderLeftColor: c.warn,
            }}
          >
            <Body size={12} muted style={{ marginBottom: 6 }}>
              What got in the way? Optional, and it shows up on Progress.
            </Body>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
              {MISS_REASONS.map((r) => (
                <Chip
                  key={r}
                  label={r}
                  on={reason === r}
                  onPress={() => setMissReason(date, dp.wid, reason === r ? '' : r)}
                />
              ))}
            </View>
            <TextInput
              defaultValue={MISS_REASONS.includes(reason) ? '' : reason}
              placeholder="Or write your own"
              placeholderTextColor={c.ink2}
              onEndEditing={(e) => setMissReason(date, dp.wid, e.nativeEvent.text)}
              style={{
                marginTop: 8,
                backgroundColor: c.bg,
                borderWidth: 1,
                borderColor: c.line,
                borderRadius: radius.control,
                paddingHorizontal: 10,
                paddingVertical: 9,
                color: c.ink,
              }}
            />
          </View>
        ) : null}

        {wk.kind === 'rest' ? (
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
        ) : null}
      </View>
    </Card>
  );
}
