import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

export default function NewsDetailScreen() {
  const { url } = useLocalSearchParams<{ url: string }>();

  return (
    <SafeAreaView style={styles.container}>
      <WebView source={{ uri: decodeURIComponent(url || '') }} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});