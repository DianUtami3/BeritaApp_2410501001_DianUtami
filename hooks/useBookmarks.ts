import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Article } from '../types/news';

const BOOKMARK_KEY = 'bookmarked_articles';

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<Article[]>([]);

  useEffect(() => {
    loadBookmarks();
  }, []);

  const loadBookmarks = async () => {
    try {
      const stored = await AsyncStorage.getItem(BOOKMARK_KEY);
      if (stored) {
        setBookmarks(JSON.parse(stored));
      }
    } catch (error) {
      console.log('Gagal load bookmarks:', error);
    }
  };

  const saveBookmarks = async (items: Article[]) => {
    try {
      setBookmarks(items);
      await AsyncStorage.setItem(BOOKMARK_KEY, JSON.stringify(items));
    } catch (error) {
      console.log('Gagal save bookmarks:', error);
    }
  };

  const toggleBookmark = async (article: Article) => {
    const exists = bookmarks.some((item) => item.url === article.url);

    if (exists) {
      const updated = bookmarks.filter((item) => item.url !== article.url);
      await saveBookmarks(updated);
    } else {
      const updated = [article, ...bookmarks];
      await saveBookmarks(updated);
    }
  };

  return {
    bookmarks,
    toggleBookmark,
    reloadBookmarks: loadBookmarks,
  };
};