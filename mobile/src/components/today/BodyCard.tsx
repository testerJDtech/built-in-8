import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { setBodyField, useStore } from '../../store/store';
import { useTheme } from '../../theme/useTheme';
import { Body, Card, Eyebrow } from '../ui';

function NumField({
  label,
  value,
  onCommit,
}: {
  label: string;
  value: number | null;
  onCommit: (v: number | null) => void;
}) {
  const { c, radius } = useTheme();
  const [text, setText] = useState(value == null ? '' : String(value));

  // Follow the store when the day changes underneath the field.
  useEffect(() => {
    setText(value == null ? '' : String(value));
  }, [value]);

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 11, fontWeight: '700', color: c.ink2, marginBottom: 4 }}>
        {label}
      </Text>
      <TextInput
        value={text}
        onChangeText={setText}
        onEndEditing={() => {
          const v = text.trim() === '' ? null : parseFloat(text);
          onCommit(v == null || Number.isNaN(v) ? null : v);
        }}
        keyboardType="decimal-pad"
        returnKeyType="done"
        placeholder="—"
        placeholderTextColor={c.ink2}
        style={{
          borderWidth: StyleSheet.hairlineWidth * 2,
          borderColor: c.line,
          backgroundColor: c.bg,
          borderRadius: radius.control,
          paddingVertical: 9,
          paddingHorizontal: 10,
          fontSize: 16,
          color: c.ink,
        }}
      />
    </View>
  );
}

export function BodyCard({ date }: { date: string }) {
  const S = useStore();
  const d = S.days[date];

  return (
    <Card>
      <Eyebrow>Body and movement</Eyebrow>
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <NumField
          label="Weight (kg)"
          value={d?.weight ?? null}
          onCommit={(v) => setBodyField(date, 'weight', v)}
        />
        <NumField
          label="Waist (cm)"
          value={d?.waist ?? null}
          onCommit={(v) => setBodyField(date, 'waist', v)}
        />
        <NumField
          label="Steps"
          value={d?.steps ?? null}
          onCommit={(v) => setBodyField(date, 'steps', v)}
        />
      </View>
      <Body size={12} muted style={{ marginTop: 8 }}>
        Weight moves day to day. Judge it on the weekly average on the Progress tab, not on
        one morning.
      </Body>
    </Card>
  );
}
