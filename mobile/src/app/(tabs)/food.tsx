import { useLocalSearchParams } from 'expo-router';

import { Placeholder } from '../../components/Placeholder';
import { MEALS } from '../../data/meals';
import { fmtDate } from '../../lib/date';
import { FOODS } from '../../data/foods';

export default function FoodScreen() {
  const { date, meal } = useLocalSearchParams<{ date?: string; meal?: string }>();
  const mealName = MEALS.find((m) => m.key === meal)?.name;

  return (
    <Placeholder
      title="Food"
      intro={`The ${FOODS.length}-item library is already ported and the store can log entries — this screen is the search, quantity and macro-editing surface on top of it.`}
      pending={
        date && mealName ? `Add to ${mealName.toLowerCase()} on ${fmtDate(date)}` : null
      }
      points={[
        'Search and category filters across the library plus your saved foods',
        'Quantity picker that recalculates macros live, with every value editable',
        "Today's entries by meal, with swipe to remove",
        'Save a custom item back into the library',
      ]}
    />
  );
}
