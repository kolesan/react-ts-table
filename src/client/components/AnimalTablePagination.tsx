import * as React from 'react';
import TablePagination from "@material-ui/core/TablePagination";
import { div } from "../utils/MathUtils";
import { TableViewState } from "../model/TableViewState";

interface AnimalTablePaginationProps {
  readonly total: number;
  readonly tableViewState: TableViewState;
  readonly paginationChanged: Function;
}
interface AnimalTablePaginationState {}

export default class AnimalTablePagination extends React.Component<AnimalTablePaginationProps, AnimalTablePaginationState> {

  pageChange(event, page) {
    let { tableViewState } = this.props;
    let { pagination } = tableViewState;
    let newPagination = Object.assign({}, pagination, {page});
    this.props.paginationChanged(newPagination);
  }

  rowsPerPageChange(event) {
    let { tableViewState } = this.props;
    let { rowsPerPage, page } = tableViewState.pagination;
    let newRowsPerPage = event.target.value;
    let newPage = div(rowsPerPage * page, newRowsPerPage);

    let newPagination = {page: newPage, rowsPerPage: newRowsPerPage};

    this.props.paginationChanged(newPagination);
  }

  render() {
    let { total } = this.props;
    let { page, rowsPerPage } = this.props.tableViewState.pagination;
    return (
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        count={total}
        page={page}
        rowsPerPage={rowsPerPage}
        onChangePage={this.pageChange.bind(this)}
        onChangeRowsPerPage={this.rowsPerPageChange.bind(this)}
      />
    );
  }

}