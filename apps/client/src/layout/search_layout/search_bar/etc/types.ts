export interface PaginationArgT {
  page: number;
  limit: number;
}

export type SearchQueryArgT = PaginationArgT & Record<string, unknown>;

export type SearchQueryResT<T> = {
  nHits: number;
  pages: number;
  hasPrePage: boolean;
  hasNextPage: boolean;
  queryForm: Record<string, unknown>;
} & T;
