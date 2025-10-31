export type SearchQueryArgT = {
  page: number;
  limit: number;
} & Record<string, unknown>;

export type SearchQueryResT<T> = {
  nHits: number;
  pages: number;
} & T;
