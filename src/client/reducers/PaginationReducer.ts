import { PAGINATION_CHANGED } from "../actions/PaginationAction";
import { Pagination } from "../actions/FetchAnimalsAction";

export default function paginationReducer(state: Pagination = null, action) {
  if (action.type == PAGINATION_CHANGED) {
    return action.payload;
  }
  return state;
}
