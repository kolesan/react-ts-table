import * as React from 'react';
import TablePagination from "@material-ui/core/TablePagination";
import { div } from "../utils/MathUtils";

export default function AnimalTablePagination(props) {
  let { total } = props;
  let { page, rowsPerPage } = props.tableViewState.pagination;

  return (
    <TablePagination
      rowsPerPageOptions={[5, 10, 15]}
      count={total}
      page={page}
      rowsPerPage={rowsPerPage}
      onChangePage={pageChange}
      onChangeRowsPerPage={rowsPerPageChange}
    />
  );

  function pageChange(event, page) {
    let { rowsPerPage } = props.tableViewState.pagination;

    props.paginationChanged({
      page,
      rowsPerPage
    });
  }

  function rowsPerPageChange(event) {
    let { page, rowsPerPage } = props.tableViewState.pagination;

    let newRowsPerPage = event.target.value;
    let newPage = div(rowsPerPage * page, newRowsPerPage);

    props.paginationChanged({
      page: newPage,
      rowsPerPage: newRowsPerPage
    });
  }

}
