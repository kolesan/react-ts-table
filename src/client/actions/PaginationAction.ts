import { Pagination } from "../model/TableViewState"

export const PAGINATION_CHANGED = "pagination changed";

export interface PaginationChangedAction {
  readonly type: String;
  readonly payload: Pagination;
}

export default function paginationChanged(pagination: Pagination): PaginationChangedAction {
  return {
    type: PAGINATION_CHANGED,
    payload: pagination
  }
}