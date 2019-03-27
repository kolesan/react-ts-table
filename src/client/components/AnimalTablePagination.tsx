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
    let { tableViewState } = props;
    let { pagination } = tableViewState;
    let newPagination = Object.assign({}, pagination, {page});
    props.paginationChanged(newPagination);
  }

  function rowsPerPageChange(event) {
    let { tableViewState } = props;
    let { rowsPerPage, page } = tableViewState.pagination;
    let newRowsPerPage = event.target.value;
    let newPage = div(rowsPerPage * page, newRowsPerPage);

    let newPagination = {page: newPage, rowsPerPage: newRowsPerPage};

    props.paginationChanged(newPagination);
  }

}
