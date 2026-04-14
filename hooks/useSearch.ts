import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { newsService } from '../services/newsService';

type SearchFilters = {
  source?: string;
  from?: string;
  to?: string;
};

export const useNewsSearch = (query: string, filters?: SearchFilters) => {
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  return useQuery({
    queryKey: ['search', debouncedQuery, filters],
    queryFn: () =>
      newsService.searchArticles({
        query: debouncedQuery,
        source: filters?.source,
        from: filters?.from,
        to: filters?.to,
      }),
    enabled: debouncedQuery.length >= 3,
    staleTime: 2 * 60 * 1000,
  });
};