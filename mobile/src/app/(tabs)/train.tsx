import { useLocalSearchParams } from 'expo-router';

import { Placeholder } from '../../components/Placeholder';
import { fmtDate } from '../../lib/date';
import { workout } from '../../store/store';

export default function TrainScreen() {
  const { date, wid } = useLocalSearchParams<{ date?: string; wid?: string }>();
  const wk = wid ? workout(wid) : null;

  return (
    <Placeholder
      title="Train"
      intro="The workout library is ported and sessions can already be marked done from Today. This screen is where a session gets logged set by set."
      pending={wk && date ? `${wk.name} on ${fmtDate(date)}` : null}
      points={[
        'Per-exercise set logging: reps and load, saved into the day record',
        'The progression note and last session’s numbers alongside each exercise',
        'Edit the library — change exercises, sets and reps, or add your own',
        'Swap in the 20-minute circuit on a busy day',
      ]}
    />
  );
}
