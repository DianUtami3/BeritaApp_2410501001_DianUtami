import React from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from 'react-native';
import { Category } from '../types/news';
import { useAppTheme } from '../context/ThemeContext';

interface CategoryFilterProps {
  categories: { label: string; value: Category }[];
  selected: Category;
  onChange: (value: Category) => void;
}

export default function CategoryFilter({
  categories,
  selected,
  onChange,
}: CategoryFilterProps) {
  const { colors } = useAppTheme();

  return (
    <View style={[styles.wrapper, { backgroundColor: colors.card }]}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((item) => (
          <TouchableOpacity
            key={item.value}
            style={[
              styles.button,
              { backgroundColor: colors.border },
              selected === item.value && { backgroundColor: colors.primary },
            ]}
            onPress={() => onChange(item.value)}
          >
            <Text
              style={[
                styles.buttonText,
                { color: colors.text },
                selected === item.value && styles.buttonTextActive,
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  button: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    marginRight: 8,
  },
  buttonText: {
    fontWeight: '600',
  },
  buttonTextActive: {
    color: '#fff',
  },
});