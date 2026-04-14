import React from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from 'react-native';
import { SourceItem } from '../types/news';
import { useAppTheme } from '../context/ThemeContext';

interface SourceFilterProps {
  sources: SourceItem[];
  selectedSource: string;
  onChange: (value: string) => void;
}

export default function SourceFilter({
  sources,
  selectedSource,
  onChange,
}: SourceFilterProps) {
  const { colors } = useAppTheme();

  return (
    <View style={styles.wrapper}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: colors.border },
            selectedSource === '' && { backgroundColor: colors.primary },
          ]}
          onPress={() => onChange('')}
        >
          <Text
            style={[
              styles.text,
              { color: colors.text },
              selectedSource === '' && styles.activeText,
            ]}
          >
            Semua Source
          </Text>
        </TouchableOpacity>

        {sources.map((item) => (
          <TouchableOpacity
            key={item.id ?? item.name}
            style={[
              styles.button,
              { backgroundColor: colors.border },
              selectedSource === item.id && { backgroundColor: colors.primary },
            ]}
            onPress={() => onChange(item.id ?? '')}
          >
            <Text
              style={[
                styles.text,
                { color: colors.text },
                selectedSource === item.id && styles.activeText,
              ]}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 10,
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 999,
    marginRight: 8,
  },
  text: {
    fontSize: 13,
    fontWeight: '600',
  },
  activeText: {
    color: '#fff',
  },
});