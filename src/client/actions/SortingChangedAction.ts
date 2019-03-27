import { Sorting } from "../model/TableViewState";

export const SORTING_CHANGED = "sorting changed";

export default function sortingChanged(sorting: Sorting) {
  console.log("Sorting changed", sorting);
  return {
    type: SORTING_CHANGED,
    payload: sorting
  }
}
