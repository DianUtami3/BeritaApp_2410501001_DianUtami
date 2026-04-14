import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { useAppTheme } from '../context/ThemeContext';

export default function NewsSkeletonList() {
  const { colors } = useAppTheme();

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={[styles.text, { color: colors.subtext }]}>
        Memuat berita...
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginTop: 10,
  },
});