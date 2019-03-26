import { SORT_BY } from "../actions/SortByAction";

export default function sortByReducer(state = null, action) {
  if (action.type == SORT_BY) {
    return action.payload;
  }
  return state;
}
