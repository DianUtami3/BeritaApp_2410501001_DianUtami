import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  FlatList,
  StyleSheet,
  Text,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useNewsSearch } from '../../hooks/useSearch';
import { useBookmarks } from '../../hooks/useBookmarks';
import { useSources } from '../../hooks/useSources';
import { NewsCard } from '../../components/NewsCard';
import Header from '../../components/Header';
import SourceFilter from '../../components/SourceFilter';
import DateFilter from '../../components/DateFilter';
import { useAppTheme } from '../../context/ThemeContext';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [source, setSource] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const router = useRouter();
  const { colors } = useAppTheme();
  const { bookmarks, toggleBookmark } = useBookmarks();

  const sourcesResult = useSources();
  const searchResult = useNewsSearch(query, {
    source: source || undefined,
    from: fromDate || undefined,
    to: toDate || undefined,
  });

  const sources = sourcesResult.data || [];
  const articles = searchResult.data?.articles || [];

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <Header title="Search Berita" />

      <View style={styles.searchBox}>
        <TextInput
          placeholder="Cari berita..."
          placeholderTextColor={colors.subtext}
          value={query}
          onChangeText={setQuery}
          style={[
            styles.input,
            {
              backgroundColor: colors.card,
              color: colors.text,
              borderColor: colors.border,
            },
          ]}
        />

        <SourceFilter
          sources={sources}
          selectedSource={source}
          onChange={setSource}
        />

        <DateFilter
          fromDate={fromDate}
          toDate={toDate}
          onChangeFrom={setFromDate}
          onChangeTo={setToDate}
        />
      </View>

      {query.length < 3 ? (
        <Text style={[styles.info, { color: colors.subtext }]}>
          Ketik minimal 3 huruf untuk mencari.
        </Text>
      ) : (
        <FlatList
          data={articles}
          keyExtractor={(item, index) => item.url || index.toString()}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <NewsCard
              article={item}
              onPress={() =>
                router.push(`/news/${encodeURIComponent(item.url)}` as any)
              }
              onBookmark={() => toggleBookmark(item)}
              isBookmarked={bookmarks.some((b) => b.url === item.url)}
            />
          )}
          ListEmptyComponent={
            !searchResult.isLoading ? (
              <Text style={[styles.info, { color: colors.subtext }]}>
                Data tidak ditemukan.
              </Text>
            ) : null
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBox: {
    padding: 16,
    gap: 10,
  },
  input: {
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  info: {
    textAlign: 'center',
    marginTop: 20,
  },
});