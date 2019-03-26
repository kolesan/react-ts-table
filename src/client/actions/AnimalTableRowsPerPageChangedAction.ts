export const ANIMAL_TABLE_ROWS_PER_PAGE_CHANGED = Symbol("animal table rows per page changed redux action");

export default function animalTableRowsPerPageChanged(rowsPerPage) {
  console.log("Rows per page changed", rowsPerPage);
  return {
    type: ANIMAL_TABLE_ROWS_PER_PAGE_CHANGED,
    rowsPerPage
  }
}