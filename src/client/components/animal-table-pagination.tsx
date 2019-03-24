import * as React from 'react';
import TablePagination from "@material-ui/core/TablePagination";
import { div } from "../utils/math-utils";

interface AnimalTablePaginationProps {
  readonly total: number;
  readonly onPageChange: Function;
  readonly onRowsPerPageChange: Function;
}
interface AnimalTablePaginationState {
  readonly rowsPerPage: number;
  readonly page: number;
}
export default class AnimalTablePagination extends React.Component<AnimalTablePaginationProps, AnimalTablePaginationState> {
  state = {
    page: 0,
    rowsPerPage: 10
  };

  constructor(props: AnimalTablePaginationProps) {
    super(props);
  }



  pageChange(event, page) {
    this.setState({page});
    this.props.onPageChange(page, this.state.rowsPerPage);
  }

  rowsPerPageChange(event) {
    let { rowsPerPage, page } = this.state;
    let newRowsPerPage = event.target.value;
    let newPage = div(rowsPerPage * page, newRowsPerPage);

    this.setState({
      page: newPage,
      rowsPerPage: newRowsPerPage
    });

    this.props.onRowsPerPageChange(newPage, newRowsPerPage)
  }

  render() {
    let { page, rowsPerPage } = this.state;
    return (
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        count={this.props.total}
        page={page}
        rowsPerPage={rowsPerPage}
        onChangePage={this.pageChange.bind(this)}
        onChangeRowsPerPage={this.rowsPerPageChange.bind(this)}
      />
    );
  }
}