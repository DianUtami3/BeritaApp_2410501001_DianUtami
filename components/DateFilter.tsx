import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { useAppTheme } from '../context/ThemeContext';

interface DateFilterProps {
  fromDate: string;
  toDate: string;
  onChangeFrom: (value: string) => void;
  onChangeTo: (value: string) => void;
}

export default function DateFilter({
  fromDate,
  toDate,
  onChangeFrom,
  onChangeTo,
}: DateFilterProps) {
  const { colors } = useAppTheme();

  return (
    <View style={styles.row}>
      <TextInput
        placeholder="Dari (YYYY-MM-DD)"
        placeholderTextColor={colors.subtext}
        value={fromDate}
        onChangeText={onChangeFrom}
        style={[
          styles.input,
          {
            backgroundColor: colors.card,
            color: colors.text,
            borderColor: colors.border,
          },
        ]}
      />
      <TextInput
        placeholder="Sampai (YYYY-MM-DD)"
        placeholderTextColor={colors.subtext}
        value={toDate}
        onChangeText={onChangeTo}
        style={[
          styles.input,
          {
            backgroundColor: colors.card,
            color: colors.text,
            borderColor: colors.border,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    gap: 10,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
});