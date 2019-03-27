import './style.css';

import ReactDOM from "react-dom";
import * as React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import AnimalTableContainer from "./containers/AnimalTableContainer";
import fetchAnimalsReducer from "./reducers/FetchAnimalsReducer";
import filteringChangedReducer from "./reducers/FilteringReducer";
import SaveViewStateToLocalStorage from "./middleware/SaveTableViewState";
import { loadTableViewState } from "./services/TableViewStateStore";
import sortingChangedReducer from "./reducers/SortingReducer";
import paginationReducer from "./reducers/PaginationReducer";

const { default: ReduxPromise } = require("redux-promise");

let storeEnhancer = applyMiddleware(SaveViewStateToLocalStorage, ReduxPromise);

const rootReducer = combineReducers({
  animalsData: fetchAnimalsReducer,
  tableViewState: combineReducers({
    pagination: paginationReducer,
    sorting: sortingChangedReducer,
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