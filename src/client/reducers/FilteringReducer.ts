import { FILTERING_CHANGED } from "../actions/FilteringChangedAction";
import { Filtering } from "../model/TableViewState";

export default function filteringChangedReducer(state: Filtering = null, action) {
  if (action.type == FILTERING_CHANGED) {
    return action.payload;
  }
  return state;
}
