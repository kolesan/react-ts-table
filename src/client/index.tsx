import './style.css';

import ReactDOM from "react-dom";
import * as React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import AnimalTableContainer from "./containers/AnimalTableContainer";
import animalTablePageChangedReducer from "./reducers/AnimalTablePageChangedReducer";
import animalTableRowsPerPageChangedReducer from "./reducers/AnimalTableRowsPerPageChangedReducer";
import fetchAnimalsReducer from "./reducers/FetchAnimalsReducer";
const { default: ReduxPromise } = require("redux-promise");

let storeEnhancer = applyMiddleware(ReduxPromise);

const rootReducer = combineReducers({
  animalsData: fetchAnimalsReducer,
  page: animalTablePageChangedReducer,
  rowsPerPage: animalTableRowsPerPageChangedReducer
});

const store = createStore(rootReducer, storeEnhancer);
let app = (
  <Provider store={store}>
    <AnimalTableContainer/>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));