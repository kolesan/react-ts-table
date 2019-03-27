import * as React from 'react';
import { connect } from "react-redux";
import fetchAnimals, { Pagination, TableViewState } from "../actions/FetchAnimalsAction";
import AnimalTablePagination from "../components/AnimalTablePagination";
import paginationChanged from "../actions/PaginationAction";

function mapStateToProps({ tableViewState }) {
  return { tableViewState };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchAnimals: (tableViewState: TableViewState) => {
      dispatch(fetchAnimals(tableViewState))
    },
    paginationChanged: (pagination: Pagination) => {
      dispatch(paginationChanged(pagination))
    }
  }
}

const AnimalTablePaginationContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnimalTablePagination);

export default AnimalTablePaginationContainer;