import { Sorting } from "../model/TableViewState";

export const SORTING_CHANGED = "sorting changed";

export interface SortingChangedAction {
  readonly type: String;
  readonly payload: Sorting;
}

export default function sortingChanged(sorting: Sorting): SortingChangedAction {
  return {
    type: SORTING_CHANGED,
    payload: sorting
  }
}
