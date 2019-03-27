import { PAGINATION_CHANGED } from "../actions/PaginationAction";
import { Pagination } from "../model/TableViewState";


export default function paginationReducer(state: Pagination = null, action) {
  if (action.type == PAGINATION_CHANGED) {
    return action.payload;
  }
  return state;
}
