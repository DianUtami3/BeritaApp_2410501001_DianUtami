import { useEffect, useState } from 'react';
import { Article, Category } from '../types/news';
import { CacheManager } from '../utils/cache';

export const useOfflineNews = (category: Category) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loadingOffline, setLoadingOffline] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const cached = await CacheManager.get<Article[]>(
          `offline_news_${category}`
        );
        setArticles(cached ?? []);
      } catch (error) {
        console.log('Gagal load offline news:', error);
      } finally {
        setLoadingOffline(false);
      }
    };

    load();
  }, [category]);

  return { offlineArticles: articles, loadingOffline };
};