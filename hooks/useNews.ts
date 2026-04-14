import { useInfiniteQuery } from '@tanstack/react-query';
import { newsService } from '../services/newsService';
import { Category } from '../types/news';
import { CacheManager } from '../utils/cache';

export const useNews = (category: Category) => {
  return useInfiniteQuery({
    queryKey: ['news', category],
    queryFn: async ({ pageParam = 1 }) => {
      const result = await newsService.getTopHeadlines(
        category,
        pageParam as number
      );

      if (pageParam === 1) {
        await CacheManager.set(`offline_news_${category}`, result.articles);
      }

      return result;
    },
    getNextPageParam: (lastPage, allPages) => {
      const totalFetched = allPages.reduce(
        (sum, page) => sum + page.articles.length,
        0
      );

      if (totalFetched >= lastPage.totalResults) return undefined;
      return allPages.length + 1;
    },
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000,
  });
};