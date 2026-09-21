import { useLocalSearchParams } from 'expo-router';

import { Placeholder } from '../../components/Placeholder';
import { fmtShort } from '../../lib/date';
import { useStore } from '../../store/store';

export default function WeeksScreen() {
  const S = useStore();
  const { checkin } = useLocalSearchParams<{ checkin?: string }>();
  const w = S.plan.weeks.find((x) => x.id === checkin);

  return (
    <Placeholder
      title="Weeks"
      intro={`Week 1 is seeded from the plan and drives the day strip on Today. This screen is where weeks get edited and added.`}
      pending={
        w ? `Week ${w.num} check-in · ${fmtShort(w.days[0].date)} - ${fmtShort(w.days[6].date)}` : null
      }
      points={[
        'Edit each day: session, target, timing, sport and notes',
        'Add a week, or copy an earlier one forward',
        'Sunday check-in: sessions hit, takeaways used, weight trend, notes',
        'Week rules — meal prep done, takeaway allowance',
      ]}
    />
  );
}
