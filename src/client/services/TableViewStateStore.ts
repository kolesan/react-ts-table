import log from "../utils/Logging";
import _merge from "lodash.merge";
import { TableViewState } from "../model/TableViewState";

const STORAGE_KEY = "tableViewState";

const defaultTableViewState: TableViewState = {
  sorting: {
    sortBy: "",
    sortDescending: false
  },
  filtering: {
    filters: {}
  },
  pagination: {
    page: 0,
    rowsPerPage: 10
  }
};

export function loadTableViewState() {
  let loadedTableViewState = JSON.parse(localStorage.getItem(STORAGE_KEY));
  return _merge({}, defaultTableViewState, loadedTableViewState);
}

export function saveTableViewState(tableViewState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tableViewState));
}