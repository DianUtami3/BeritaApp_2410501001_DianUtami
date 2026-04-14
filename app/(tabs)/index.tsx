import React, { useCallback, useMemo, useState } from 'react';
import {
  SafeAreaView,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useNews } from '../../hooks/useNews';
import { useOfflineNews } from '../../hooks/useOfflineNews';
import { useBookmarks } from '../../hooks/useBookmarks';
import { Category, Article } from '../../types/news';
import { NewsCard } from '../../components/NewsCard';
import Header from '../../components/Header';
import CategoryFilter from '../../components/CategoryFilter';
import NewsSkeletonList from '../../components/NewsSkeletonList';
import ErrorView from '../../components/ErrorView';
import { useAppTheme } from '../../context/ThemeContext';

const CATEGORIES: { label: string; value: Category }[] = [
  { label: 'Umum', value: 'general' },
  { label: 'Teknologi', value: 'technology' },
  { label: 'Olahraga', value: 'sports' },
  { label: 'Bisnis', value: 'business' },
  { label: 'Kesehatan', value: 'health' },
];

export default function HomeScreen() {
  const [category, setCategory] = useState<Category>('general');
  const { bookmarks, toggleBookmark } = useBookmarks();
  const { colors } = useAppTheme();
  const router = useRouter();

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useNews(category);

  const { offlineArticles } = useOfflineNews(category);

  const articles = useMemo(() => {
    return data?.pages.flatMap((page) => page.articles) ?? [];
  }, [data]);

  const finalArticles = articles.length > 0 ? articles : offlineArticles;

  const renderItem = useCallback(
    ({ item }: { item: Article }) => (
      <NewsCard
        article={item}
        onPress={() => router.push(`/news/${encodeURIComponent(item.url)}`)}
        onBookmark={() => toggleBookmark(item)}
        isBookmarked={bookmarks.some((bookmark) => bookmark.url === item.url)}
      />
    ),
    [bookmarks, toggleBookmark, router]
  );

  if (isLoading && finalArticles.length === 0) return <NewsSkeletonList />;

  if (isError && finalArticles.length === 0) {
    return (
      <ErrorView message={(error as Error).message} onRetry={() => refetch()} />
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="BeritaApp" />

      <CategoryFilter
        categories={CATEGORIES}
        selected={category}
        onChange={setCategory}
      />

      {articles.length === 0 && offlineArticles.length > 0 ? (
        <View style={styles.offlineInfo}>
          <Text style={{ color: colors.subtext }}>
            Menampilkan data offline dari cache.
          </Text>
        </View>
      ) : null}

      <FlatList
        data={finalArticles}
        renderItem={renderItem}
        keyExtractor={(item) => item.url}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={() => refetch()} />
        }
        onEndReached={() => {
          if (hasNextPage && articles.length > 0) fetchNextPage();
        }}
        onEndReachedThreshold={0.3}
        ListFooterComponent={
          isFetchingNextPage ? <ActivityIndicator size="small" /> : null
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
    paddingBottom: 24,
  },
  offlineInfo: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
});