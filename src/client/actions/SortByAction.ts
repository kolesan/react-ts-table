export const SORT_BY = "sort by column changed";

export default function sortBy(column) {
  console.log("Sort by changed", column);
  return {
    type: SORT_BY,
    payload: column
  }
}
