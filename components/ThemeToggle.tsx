import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useAppTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { mode, setMode, colors } = useAppTheme();

  const options: Array<'system' | 'light' | 'dark'> = [
    'system',
    'light',
    'dark',
  ];

  return (
    <View style={styles.row}>
      {options.map((item) => (
        <TouchableOpacity
          key={item}
          style={[
            styles.button,
            { backgroundColor: colors.border },
            mode === item && { backgroundColor: colors.primary },
          ]}
          onPress={() => setMode(item)}
        >
          <Text style={[styles.text, mode === item && styles.activeText]}>
            {item.toUpperCase()}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
  },
  button: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
  },
  text: {
    fontWeight: '700',
  },
  activeText: {
    color: '#fff',
  },
});