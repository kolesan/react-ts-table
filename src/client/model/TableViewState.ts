export interface TableViewState {
  readonly pagination: Pagination;
  readonly sorting: Sorting;
  readonly filtering: Filtering;
}

export interface Pagination {
  readonly page: number;
  readonly rowsPerPage: number;
}
export interface Sorting {
  readonly sortBy: string;
  readonly sortDescending: boolean;
}
export interface Filtering {
  readonly filters: object;
}