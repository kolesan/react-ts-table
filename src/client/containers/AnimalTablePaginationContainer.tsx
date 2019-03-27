import * as React from 'react';
import { connect } from "react-redux";
import fetchAnimals from "../actions/FetchAnimalsAction";
import AnimalTablePagination from "../components/AnimalTablePagination";
import paginationChanged from "../actions/PaginationAction";
import { Pagination, TableViewState } from "../model/TableViewState";

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