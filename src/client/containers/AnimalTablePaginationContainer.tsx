import * as React from 'react';
import { connect } from "react-redux";
import AnimalTablePagination from "../components/AnimalTablePagination";
import paginationChanged from "../actions/PaginationAction";
import { Pagination } from "../model/TableViewState";

function mapStateToProps({ tableViewState }) {
  return { tableViewState };
}

function mapDispatchToProps(dispatch) {
  return {
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