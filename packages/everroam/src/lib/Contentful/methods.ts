export * from "./methods/pages";

export interface BlogQuery {
  page: number | string;
  limit: number | string;
  slug?: string;
  order?: string;
  category?: string;
  topic?: string;
  topic2?: string;
  query?: string;
  skip?: number | string;
  excludeId?: string;
}
