export type Category =
  | 'general'
  | 'technology'
  | 'sports'
  | 'business'
  | 'health';

export interface SourceItem {
  id: string | null;
  name: string;
}

export interface Article {
  source: SourceItem;
  author?: string | null;
  title: string;
  description?: string | null;
  url: string;
  urlToImage?: string | null;
  publishedAt: string;
  content?: string | null;
}