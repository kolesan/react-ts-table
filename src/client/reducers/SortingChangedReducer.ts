import { SORTING_CHANGED } from "../actions/SortingChangedAction";

export default function sortingChangedReducer(state = null, action) {
  if (action.type == SORTING_CHANGED) {
    return action.payload;
  }
  return state;
}
