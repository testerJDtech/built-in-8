import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';

import { useTheme } from '../../theme/useTheme';

type IconName = keyof typeof Ionicons.glyphMap;

const TABS: { name: string; title: string; icon: IconName }[] = [
  { name: 'index', title: 'Today', icon: 'today-outline' },
  { name: 'food', title: 'Food', icon: 'restaurant-outline' },
  { name: 'train', title: 'Train', icon: 'barbell-outline' },
  { name: 'weeks', title: 'Weeks', icon: 'calendar-outline' },
  { name: 'progress', title: 'Progress', icon: 'stats-chart-outline' },
];

export default function TabsLayout() {
  const { c } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: c.red,
        tabBarInactiveTintColor: c.ink2,
        tabBarStyle: {
          backgroundColor: c.surface,
          borderTopColor: c.line,
          borderTopWidth: StyleSheet.hairlineWidth * 2,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
        sceneStyle: { backgroundColor: c.bg },
      }}
    >
      {TABS.map((t) => (
        <Tabs.Screen
          key={t.name}
          name={t.name}
          options={{
            title: t.title,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name={t.icon} size={size ?? 20} color={color} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
