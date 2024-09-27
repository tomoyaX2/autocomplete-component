export interface PaginatedAnswer<Data> {
  currentPage: number;
  data: Data[];
  total: number;
}
