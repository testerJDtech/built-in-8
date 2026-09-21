import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '../theme/useTheme';

const ToastContext = createContext<(msg: string) => void>(() => {});

export function useToast(): (msg: string) => void {
  return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [msg, setMsg] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { c } = useTheme();
  const insets = useSafeAreaInsets();

  const show = useCallback((m: string) => {
    setMsg(m);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setMsg(null), 2600);
  }, []);

  const value = useMemo(() => show, [show]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {msg ? (
        <View
          pointerEvents="none"
          style={[styles.wrap, { bottom: insets.bottom + 78 }]}
        >
          <View style={{ backgroundColor: c.band, paddingVertical: 9, paddingHorizontal: 14, borderRadius: 3 }}>
            <Text style={{ color: c.onband, fontSize: 13, fontWeight: '600' }}>{msg}</Text>
          </View>
        </View>
      ) : null}
    </ToastContext.Provider>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});
