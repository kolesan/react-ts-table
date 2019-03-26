import * as React from 'react';
import TablePagination from "@material-ui/core/TablePagination";
import { div } from "../utils/MathUtils";
import { connect } from "react-redux";
import animalTablePageChanged from "../actions/AnimalTablePageChangedAction";
import animalTableRowsPerPageChanged from "../actions/AnimalTableRowsPerPageChangedAction";
import fetchAnimals from "../actions/FetchAnimalsAction";

interface AnimalTablePaginationProps {
  readonly total: number;
  readonly page: number;
  readonly rowsPerPage: number;
  readonly fetchAnimals: Function;
  readonly onPageChanged: Function;
  readonly onRowsPerPageChanged: Function;
}
interface AnimalTablePaginationState {}

class AnimalTablePagination extends React.Component<AnimalTablePaginationProps, AnimalTablePaginationState> {

  pageChange(event, page) {
    this.props.onPageChanged(page);
    this.props.fetchAnimals(page, this.props.rowsPerPage);
  }

  rowsPerPageChange(event) {
    let { rowsPerPage, page } = this.props;
    let newRowsPerPage = event.target.value;
    let newPage = div(rowsPerPage * page, newRowsPerPage);

    this.props.onPageChanged(newPage);
    this.props.onRowsPerPageChanged(newRowsPerPage);
    this.props.fetchAnimals(newPage, newRowsPerPage);
  }

  render() {
    let { total, page, rowsPerPage } = this.props;
    return (
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        count={total}
        page={page}
        rowsPerPage={rowsPerPage}
        onChangePage={this.pageChange.bind(this)}
        onChangeRowsPerPage={this.rowsPerPageChange.bind(this)}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    page: state.page,
    rowsPerPage: state.rowsPerPage
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchAnimals: (page, rowsPerPage) => {
      dispatch(fetchAnimals(page, rowsPerPage))
    },
    onPageChanged: page => {
      dispatch(animalTablePageChanged(page))
    },
    onRowsPerPageChanged: rowsPerPage => {
      dispatch(animalTableRowsPerPageChanged(rowsPerPage))
    }
  }
}

const AnimalTablePaginationContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnimalTablePagination);

export default AnimalTablePaginationContainer