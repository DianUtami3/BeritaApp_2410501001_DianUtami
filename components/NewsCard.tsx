import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Article } from '../types/news';
import { formatDate } from '../utils/formatDate';
import { shareArticle } from '../utils/shareArticle';
import { useAppTheme } from '../context/ThemeContext';

const PLACEHOLDER_IMAGE =
  'https://via.placeholder.com/400x200?text=No+Image';

interface NewsCardProps {
  article: Article;
  onPress: () => void;
  onBookmark: () => void;
  isBookmarked: boolean;
}

export function NewsCard({
  article,
  onPress,
  onBookmark,
  isBookmarked,
}: NewsCardProps) {
  const { colors } = useAppTheme();

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.card }]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <Image
        source={{ uri: article.urlToImage ?? PLACEHOLDER_IMAGE }}
        style={styles.image}
      />

      <View style={styles.content}>
        <View style={styles.sourceBadge}>
          <Text style={[styles.source, { color: colors.primary }]}>
            {article.source.name}
          </Text>
          <Text style={[styles.date, { color: colors.subtext }]}>
            {formatDate(article.publishedAt)}
          </Text>
        </View>

        <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>
          {article.title}
        </Text>

        <Text
          style={[styles.description, { color: colors.subtext }]}
          numberOfLines={3}
        >
          {article.description ?? 'Tidak ada deskripsi'}
        </Text>

        <View style={styles.actionRow}>
          <TouchableOpacity onPress={onBookmark} style={styles.iconBtn}>
            <Ionicons
              name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
              size={20}
              color={isBookmarked ? colors.primary : colors.subtext}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => shareArticle(article)}
            style={styles.iconBtn}
          >
            <Ionicons
              name="share-social-outline"
              size={20}
              color={colors.subtext}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 14,
    marginBottom: 14,
    overflow: 'hidden',
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 200,
  },
  content: {
    padding: 12,
  },
  sourceBadge: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  source: {
    fontSize: 12,
    fontWeight: '700',
  },
  date: {
    fontSize: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    marginBottom: 10,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 10,
  },
  iconBtn: {
    padding: 6,
  },
});