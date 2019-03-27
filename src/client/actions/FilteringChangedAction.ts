import { Filtering } from "../model/TableViewState";

export const FILTERING_CHANGED = "filter changed";

export interface FilteringChangedAction {
  readonly type: String;
  readonly payload: Filtering;
}

export default function filteringChanged(filtering: Filtering): FilteringChangedAction {
  return {
    type: FILTERING_CHANGED,
    payload: filtering
  }
}
