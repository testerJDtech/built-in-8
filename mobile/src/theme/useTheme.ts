import { useColorScheme } from 'react-native';

import { useStore } from '../store/store';
import { dark, fonts, light, radius, space, type Palette } from './tokens';

export interface Theme {
  c: Palette;
  scheme: 'light' | 'dark';
  fonts: typeof fonts;
  radius: typeof radius;
  space: typeof space;
}

/** Palette for the current scheme, honouring the user's theme setting. */
export function useTheme(): Theme {
  const system = useColorScheme();
  const pref = useStore().plan.settings.theme;
  const scheme: 'light' | 'dark' =
    pref === 'auto' ? (system === 'dark' ? 'dark' : 'light') : pref;
  return { c: scheme === 'dark' ? dark : light, scheme, fonts, radius, space };
}
