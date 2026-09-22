import { Placeholder } from '../../components/Placeholder';

export default function ProgressScreen() {
  return (
    <Placeholder
      title="Progress"
      intro="Every number this screen plots is already being recorded by Today — weight, waist, steps and daily macro totals."
      points={[
        'Weight and waist lines, judged on the weekly average rather than one morning',
        'Calories and protein per day against your range',
        'Sessions completed per week',
        'Sessions you marked not done, with the reasons you gave, so the pattern is visible',
        'Charts drawn with react-native-svg, ported from the web line and bar charts',
      ]}
    />
  );
}
