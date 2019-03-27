import { FILTERING_CHANGED } from "../actions/FilteringChangedAction";
import { Filtering } from "../actions/FetchAnimalsAction";

const defaultState: Filtering = {
  filters: new Map()
};

export default function filteringChangedReducer(state = defaultState, action) {
  if (action.type == FILTERING_CHANGED) {
    return action.payload;
  }
  return state;
}
