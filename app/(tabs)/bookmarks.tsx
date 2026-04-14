import React from 'react';
import { SafeAreaView, FlatList, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useBookmarks } from '../../hooks/useBookmarks';
import { NewsCard } from '../../components/NewsCard';
import { Article } from '../../types/news';
import Header from '../../components/Header';
import { useAppTheme } from '../../context/ThemeContext';

export default function BookmarksScreen() {
  const router = useRouter();
  const { bookmarks, toggleBookmark } = useBookmarks();
  const { colors } = useAppTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Bookmarks" />
      <FlatList
        data={bookmarks}
        keyExtractor={(item: Article) => item.url}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <NewsCard
            article={item}
            onPress={() => router.push(`/news/${encodeURIComponent(item.url)}`)}
            onBookmark={() => toggleBookmark(item)}
            isBookmarked={true}
          />
        )}
        ListEmptyComponent={
          <Text style={[styles.empty, { color: colors.subtext }]}>
            Belum ada bookmark.
          </Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 16,
  },
  empty: {
    textAlign: 'center',
    marginTop: 24,
  },
});