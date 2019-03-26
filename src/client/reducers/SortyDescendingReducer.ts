import { SORT_DESCENDING } from "../actions/SortDescendingAction";

export default function sortDescendingReducer(state = null, action) {
  if (action.type == SORT_DESCENDING) {
    return action.payload;
  }
  return state;
}
