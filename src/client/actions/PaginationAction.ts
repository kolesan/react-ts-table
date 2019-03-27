import { Pagination } from "../model/TableViewState"

export const PAGINATION_CHANGED = "pagination changed";

export default function paginationChanged(pagination: Pagination) {
  console.log("Pagination changed", pagination);
  return {
    type: PAGINATION_CHANGED,
    payload: pagination
  }
}