import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ToastProvider } from '../components/Toast';
import { hydrate, useHydrated } from '../store/store';
import { useTheme } from '../theme/useTheme';

export default function RootLayout() {
  // Loaded at runtime rather than through the expo-font config plugin so the
  // app still runs in Expo Go without a native build.
  const [fontsLoaded] = useFonts({
    Anton: require('../../assets/fonts/Anton-Regular.ttf'),
  });
  const hydrated = useHydrated();
  const { c, scheme } = useTheme();

  useEffect(() => {
    void hydrate();
  }, []);

  if (!fontsLoaded || !hydrated) {
    return <View style={{ flex: 1, backgroundColor: c.bg }} />;
  }

  return (
    <SafeAreaProvider>
      <ToastProvider>
        <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: c.bg },
          }}
        />
      </ToastProvider>
    </SafeAreaProvider>
  );
}
