/** Design tokens ported from the web app's styles.css custom properties. */

export interface Palette {
  bg: string;
  surface: string;
  surface2: string;
  ink: string;
  ink2: string;
  line: string;
  red: string;
  onred: string;
  band: string;
  onband: string;
  good: string;
  warn: string;
}

export const light: Palette = {
  bg: '#EDE8DD',
  surface: '#F8F5ED',
  surface2: '#E3DCCD',
  ink: '#000000',
  ink2: '#5A544A',
  line: '#CFC6B4',
  red: '#D6121C',
  onred: '#FFF7F2',
  band: '#000000',
  onband: '#F8F5ED',
  good: '#1F6B3A',
  warn: '#9A5B00',
};

export const dark: Palette = {
  bg: '#15130F',
  surface: '#1F1C17',
  surface2: '#2A2621',
  ink: '#F3EEE4',
  ink2: '#A39A8A',
  line: '#39332B',
  red: '#FF3A36',
  onred: '#1A0405',
  band: '#0A0908',
  onband: '#F3EEE4',
  good: '#67C68C',
  warn: '#E0A64B',
};

/**
 * The display face is Anton, loaded at runtime in app/_layout.tsx so it works
 * in Expo Go. Body text uses the platform UI font rather than the web app's
 * Archivo — it reads as native and costs no bundled asset.
 */
export const fonts = {
  display: 'Anton',
} as const;

export const radius = { card: 4, chip: 999, control: 3 } as const;
export const space = { gutter: 16 } as const;
