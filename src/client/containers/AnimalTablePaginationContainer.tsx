import * as React from 'react';
import { connect } from "react-redux";
import animalTablePageChanged from "../actions/AnimalTablePageChangedAction";
import animalTableRowsPerPageChanged from "../actions/AnimalTableRowsPerPageChangedAction";
import fetchAnimals from "../actions/FetchAnimalsAction";
import AnimalTablePagination from "../components/AnimalTablePagination";

function mapStateToProps(state) {
  return {
    page: state.page,
    rowsPerPage: state.rowsPerPage
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onPageChanged: (page, rowsPerPage) => {
      dispatch(animalTablePageChanged(page));
      dispatch(fetchAnimals(page, rowsPerPage));
    },
    onRowsPerPageChanged: (page, rowsPerPage) => {
      dispatch(animalTablePageChanged(page));
      dispatch(animalTableRowsPerPageChanged(rowsPerPage));
      dispatch(fetchAnimals(page, rowsPerPage));
    }
  }
}

const AnimalTablePaginationContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnimalTablePagination);

export default AnimalTablePaginationContainer;