import './style.css';

import ReactDOM from "react-dom";
import * as React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import AnimalTableContainer from "./containers/AnimalTableContainer";
import pageChangedReducer from "./reducers/PageChangedReducer";
import rowsPerPageChangedReducer from "./reducers/RowsPerPageChangedReducer";
import fetchAnimalsReducer from "./reducers/FetchAnimalsReducer";
import sortDescendingReducer from "./reducers/SortyDescendingReducer";
import sortByReducer from "./reducers/SortyByReducer";
import filteringChangedReducer from "./reducers/FilteringChangedReducer";
import SaveViewStateToLocalStorage from "./middleware/SaveTableViewState";
import { loadTableViewState } from "./services/TableViewStateStore";

const { default: ReduxPromise } = require("redux-promise");

let storeEnhancer = applyMiddleware(SaveViewStateToLocalStorage, ReduxPromise);

const rootReducer = combineReducers({
  animalsData: fetchAnimalsReducer,
  tableViewState: combineReducers({
    pagination: combineReducers({
      page: pageChangedReducer,
      rowsPerPage: rowsPerPageChangedReducer
    }),
    sorting: combineReducers({
      sortBy: sortByReducer,
      sortDescending: sortDescendingReducer,
    }),
    filtering: filteringChangedReducer
  })
});

const store = createStore(rootReducer, {tableViewState: loadTableViewState()}, storeEnhancer);
let app = (
  <Provider store={store}>
    <AnimalTableContainer/>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));