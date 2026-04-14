import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import Header from '../../components/Header';
import ThemeToggle from '../../components/ThemeToggle';
import { useAppTheme } from '../../context/ThemeContext';

export default function SettingsScreen() {
  const { colors } = useAppTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Theme Settings" />
      <View style={styles.content}>
        <Text style={[styles.label, { color: colors.text }]}>Pilih mode tema</Text>
        <ThemeToggle />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    gap: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
  },
});