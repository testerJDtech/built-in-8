/**
 * The primitives the web app expressed as CSS classes — .card, .band, .bar,
 * .chip, .btn, .eyebrow and the Anton display type — as React Native views.
 */

import type { ReactNode } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';

import { useTheme } from '../theme/useTheme';
import { clamp } from '../lib/num';

// ------------------------------------------------------------------ type

export function Display({
  children,
  size = 22,
  color,
  style,
  numberOfLines,
}: {
  children: ReactNode;
  size?: number;
  color?: string;
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
}) {
  const { c, fonts } = useTheme();
  return (
    <Text
      numberOfLines={numberOfLines}
      style={[
        {
          fontFamily: fonts.display,
          fontSize: size,
          lineHeight: size * 1.02,
          color: color ?? c.ink,
          textTransform: 'uppercase',
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}

export function Body({
  children,
  size = 15,
  muted,
  weight,
  color,
  style,
}: {
  children: ReactNode;
  size?: number;
  muted?: boolean;
  weight?: TextStyle['fontWeight'];
  color?: string;
  style?: StyleProp<TextStyle>;
}) {
  const { c } = useTheme();
  return (
    <Text
      style={[
        {
          fontSize: size,
          lineHeight: size * 1.4,
          color: color ?? (muted ? c.ink2 : c.ink),
          fontWeight: weight,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  const { c } = useTheme();
  return (
    <Text style={{ fontSize: 12, fontWeight: '700', color: c.red, marginBottom: 6 }}>
      {children}
    </Text>
  );
}

// -------------------------------------------------------------- surfaces

export function Card({
  children,
  style,
  padded = true,
}: {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  padded?: boolean;
}) {
  const { c, radius } = useTheme();
  return (
    <View
      style={[
        {
          backgroundColor: c.surface,
          borderWidth: StyleSheet.hairlineWidth * 2,
          borderColor: c.line,
          borderRadius: radius.card,
          padding: padded ? 14 : 0,
          marginVertical: 6,
          overflow: 'hidden',
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

export function Band({ left, right }: { left: string; right?: string }) {
  const { c } = useTheme();
  return (
    <View
      style={{
        backgroundColor: c.band,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 7,
        paddingHorizontal: 12,
        gap: 8,
      }}
    >
      <Text style={{ color: c.onband, fontSize: 12, fontWeight: '700', flex: 1 }}>
        {left}
      </Text>
      {right ? (
        <Text style={{ color: c.onband, fontSize: 12, fontWeight: '700', opacity: 0.85 }}>
          {right}
        </Text>
      ) : null}
    </View>
  );
}

/** Progress bar with an optional target marker, as .bar > i + u. */
export function Bar({
  frac,
  markFrac,
  thin,
}: {
  frac: number;
  markFrac?: number;
  thin?: boolean;
}) {
  const { c } = useTheme();
  const pct = clamp(frac || 0, 0, 1) * 100;
  return (
    <View
      style={{
        height: thin ? 6 : 10,
        backgroundColor: c.surface2,
        borderWidth: StyleSheet.hairlineWidth * 2,
        borderColor: c.line,
        borderRadius: 2,
        overflow: 'hidden',
        justifyContent: 'center',
      }}
    >
      <View style={{ width: `${pct}%`, height: '100%', backgroundColor: c.red }} />
      {markFrac != null && markFrac > 0 && markFrac <= 1 ? (
        <View
          style={{
            position: 'absolute',
            left: `${clamp(markFrac, 0, 1) * 100}%`,
            top: 0,
            bottom: 0,
            width: 2,
            backgroundColor: c.ink,
          }}
        />
      ) : null}
    </View>
  );
}

/** One cell of the 2-up meter grid under the hero. */
export function MeterCell({
  value,
  label,
  children,
}: {
  value: string;
  label: string;
  children?: ReactNode;
}) {
  const { c } = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: c.surface, paddingVertical: 10, paddingHorizontal: 12 }}>
      <Display size={26}>{value}</Display>
      <Text style={{ fontSize: 11, fontWeight: '600', color: c.ink2, marginTop: 2 }}>
        {label}
      </Text>
      {children ? <View style={{ marginTop: 6 }}>{children}</View> : null}
    </View>
  );
}

export function MeterGrid({ children }: { children: ReactNode }) {
  const { c } = useTheme();
  return (
    <View
      style={{
        flexDirection: 'row',
        gap: StyleSheet.hairlineWidth * 2,
        backgroundColor: c.line,
        borderTopWidth: StyleSheet.hairlineWidth * 2,
        borderTopColor: c.line,
      }}
    >
      {children}
    </View>
  );
}

// -------------------------------------------------------------- controls

type BtnTone = 'outline' | 'red' | 'solid' | 'ghost' | 'warn';

export function Btn({
  label,
  onPress,
  tone = 'outline',
  small,
  style,
}: {
  label: string;
  onPress: () => void;
  tone?: BtnTone;
  small?: boolean;
  style?: StyleProp<ViewStyle>;
}) {
  const { c, radius } = useTheme();
  const bg =
    tone === 'red' ? c.red : tone === 'warn' ? c.warn : tone === 'solid' ? c.ink : 'transparent';
  const fg =
    tone === 'red' || tone === 'warn'
      ? c.onred
      : tone === 'solid'
        ? c.bg
        : tone === 'ghost'
          ? c.ink2
          : c.ink;
  const border =
    tone === 'red'
      ? c.red
      : tone === 'warn'
        ? c.warn
        : tone === 'solid'
          ? c.ink
          : tone === 'ghost'
            ? c.line
            : c.ink;

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        {
          backgroundColor: bg,
          borderWidth: StyleSheet.hairlineWidth * 2,
          borderColor: border,
          borderRadius: radius.control,
          paddingVertical: small ? 7 : 9,
          paddingHorizontal: small ? 11 : 13,
          opacity: pressed ? 0.7 : 1,
        },
        style,
      ]}
    >
      <Text style={{ color: fg, fontWeight: '600', fontSize: small ? 13 : 14 }}>
        {label}
      </Text>
    </Pressable>
  );
}

export function Chip({
  label,
  onPress,
  ghost,
  on,
}: {
  label: string;
  onPress: () => void;
  ghost?: boolean;
  /** selected — used where chips act as a single choice, e.g. a miss reason */
  on?: boolean;
}) {
  const { c } = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: !!on }}
      onPress={onPress}
      style={({ pressed }) => ({
        borderWidth: StyleSheet.hairlineWidth * 2,
        borderColor: on ? c.red : ghost ? c.ink2 : c.line,
        backgroundColor: on ? c.red : ghost ? 'transparent' : c.surface2,
        borderRadius: 999,
        paddingVertical: 7,
        paddingHorizontal: 12,
        opacity: pressed ? 0.7 : 1,
      })}
    >
      <Text style={{ fontSize: 13, fontWeight: '600', color: on ? c.onred : c.ink }}>
        {label}
      </Text>
    </Pressable>
  );
}

/** DONE / NOT DONE badge against a session. */
export function StatBadge({ status }: { status: 'done' | 'missed' }) {
  const { c, radius } = useTheme();
  const col = status === 'done' ? c.good : c.warn;
  return (
    <View
      style={{
        borderWidth: StyleSheet.hairlineWidth * 2,
        borderColor: col,
        borderRadius: radius.control,
        paddingVertical: 3,
        paddingHorizontal: 7,
      }}
    >
      <Text style={{ fontSize: 11, fontWeight: '700', letterSpacing: 0.3, color: col }}>
        {status === 'done' ? 'DONE' : 'NOT DONE'}
      </Text>
    </View>
  );
}

export function CheckBox({ on }: { on: boolean }) {
  const { c } = useTheme();
  return (
    <View
      style={{
        width: 22,
        height: 22,
        borderRadius: 3,
        borderWidth: 2,
        borderColor: on ? c.red : c.line,
        backgroundColor: on ? c.red : 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {on ? (
        <Text style={{ color: c.onred, fontSize: 13, fontWeight: '900', lineHeight: 16 }}>
          ✓
        </Text>
      ) : null}
    </View>
  );
}

export function Pill({ tone, label }: { tone: 'idle' | 'ok' | 'wait' | 'off'; label: string }) {
  const { c } = useTheme();
  const dot =
    tone === 'ok' ? c.good : tone === 'wait' ? c.warn : tone === 'off' ? c.red : c.ink2;
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        borderWidth: StyleSheet.hairlineWidth * 2,
        borderColor: c.line,
        backgroundColor: c.surface,
        borderRadius: 999,
        paddingVertical: 4,
        paddingHorizontal: 10,
      }}
    >
      <View style={{ width: 7, height: 7, borderRadius: 4, backgroundColor: dot }} />
      <Text style={{ fontSize: 12, fontWeight: '600', color: c.ink2 }}>{label}</Text>
    </View>
  );
}

/** The 8px red rule the web app uses to close a section. */
export function Rule() {
  const { c } = useTheme();
  return <View style={{ height: 8, backgroundColor: c.red, marginTop: 14 }} />;
}
