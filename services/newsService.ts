import api from './api';

export const newsService = {
  getTopHeadlines: async (category = 'general', page = 1) => {
    const { data } = await api.get('/top-headlines', {
      params: {
        country: 'id',
        category,
        page,
        pageSize: 10,
      },
    });

    return {
      articles: data.articles,
      totalResults: data.totalResults,
    };
  },

  searchArticles: async ({
    query,
    page = 1,
    source,
    from,
    to,
  }: {
    query: string;
    page?: number;
    source?: string;
    from?: string;
    to?: string;
  }) => {
    const params: any = {
      q: query,
      language: 'id',
      sortBy: 'publishedAt',
      page,
      pageSize: 10,
    };

    if (source) params.sources = source;
    if (from) params.from = from;
    if (to) params.to = to;

    const { data } = await api.get('/everything', { params });

    return {
      articles: data.articles,
      totalResults: data.totalResults,
    };
  },

  getSources: async () => {
    const { data } = await api.get('/top-headlines/sources', {
      params: {
        language: 'en',
      },
    });

    return data.sources;
  },
};