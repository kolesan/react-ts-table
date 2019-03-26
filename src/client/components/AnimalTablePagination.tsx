import * as React from 'react';
import TablePagination from "@material-ui/core/TablePagination";
import { div } from "../utils/MathUtils";

interface AnimalTablePaginationProps {
  readonly total: number;
  readonly page: number;
  readonly rowsPerPage: number;
  readonly onPageChanged: Function;
  readonly onRowsPerPageChanged: Function;
}
interface AnimalTablePaginationState {}

export default class AnimalTablePagination extends React.Component<AnimalTablePaginationProps, AnimalTablePaginationState> {

  pageChange(event, page) {
    let { rowsPerPage } = this.props;
    this.props.onPageChanged(page, rowsPerPage);
  }

  rowsPerPageChange(event) {
    let { rowsPerPage, page } = this.props;
    let newRowsPerPage = event.target.value;
    let newPage = div(rowsPerPage * page, newRowsPerPage);
    this.props.onRowsPerPageChanged(newPage, newRowsPerPage);
  }

  render() {
    let { total, page, rowsPerPage } = this.props;
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