export const SORT_DESCENDING = "sort order changed";

export default function sortDescendingChanged(sortDescending) {
  console.log("Sort descending changed", sortDescending);
  return {
    type: SORT_DESCENDING,
    payload: sortDescending
  }
}
