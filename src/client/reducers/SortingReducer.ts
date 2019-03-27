import { SORTING_CHANGED } from "../actions/SortingChangedAction";
import { Sorting } from "../model/TableViewState";

export default function sortingChangedReducer(state: Sorting = null, action) {
  if (action.type == SORTING_CHANGED) {
    return action.payload;
  }
  return state;
}
