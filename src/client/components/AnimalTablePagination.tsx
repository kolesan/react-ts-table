import * as React from 'react';
import TablePagination from "@material-ui/core/TablePagination";
import { div } from "../utils/MathUtils";
import { TableViewState } from "../actions/FetchAnimalsAction";

interface AnimalTablePaginationProps {
  readonly total: number;
  readonly tableViewState: TableViewState;
  readonly paginationChanged: Function;
  readonly fetchAnimals: Function;
}
interface AnimalTablePaginationState {}

export default class AnimalTablePagination extends React.Component<AnimalTablePaginationProps, AnimalTablePaginationState> {

  pageChange(event, page) {
    let { tableViewState } = this.props;
    let { pagination } = tableViewState;
    let newPagination = Object.assign({}, pagination, {page});
    let newTableViewState = Object.assign({}, tableViewState, {pagination: newPagination});
    this.props.paginationChanged(newPagination);
    this.props.fetchAnimals(newTableViewState);
  }

  rowsPerPageChange(event) {
    let { tableViewState } = this.props;
    let { rowsPerPage, page } = tableViewState.pagination;
    let newRowsPerPage = event.target.value;
    let newPage = div(rowsPerPage * page, newRowsPerPage);

    let newPagination = {page: newPage, rowsPerPage: newRowsPerPage};

    let newTableViewState = Object.assign({}, tableViewState, {pagination: newPagination});

    this.props.paginationChanged(newPagination);
    this.props.fetchAnimals(newTableViewState);
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