import * as React from 'react';
import { connect } from "react-redux";
import animalTablePageChanged from "../actions/PageChangedAction";
import animalTableRowsPerPageChanged from "../actions/RowsPerPageChangedAction";
import fetchAnimals, { TableViewState } from "../actions/FetchAnimalsAction";
import AnimalTablePagination from "../components/AnimalTablePagination";

function mapStateToProps({ tableViewState }) {
  return { tableViewState };
}

function mapDispatchToProps(dispatch) {
  return {
    onPageChanged: (tableViewState: TableViewState) => {
      dispatch(animalTablePageChanged(tableViewState.pagination.page));
      dispatch(fetchAnimals(tableViewState));
    },
    onRowsPerPageChanged: (tableViewState: TableViewState) => {
      dispatch(animalTablePageChanged(tableViewState.pagination.page));
      dispatch(animalTableRowsPerPageChanged(tableViewState.pagination.rowsPerPage));
      dispatch(fetchAnimals(tableViewState));
    }
  }
}

const AnimalTablePaginationContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnimalTablePagination);

export default AnimalTablePaginationContainer;