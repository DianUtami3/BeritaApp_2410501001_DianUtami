import { useQuery } from '@tanstack/react-query';
import { newsService } from '../services/newsService';

export const useSources = () => {
  return useQuery({
    queryKey: ['sources'],
    queryFn: () => newsService.getSources(),
    staleTime: 10 * 60 * 1000,
  });
};