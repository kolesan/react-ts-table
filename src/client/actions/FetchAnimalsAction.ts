import AnimalsResponse from "../model/AnimalsResponse";
import log from "../utils/Logging";
import { Filtering, Pagination, Sorting, TableViewState } from "../model/TableViewState";
const { default: axios } = require('axios');
const { host, port } = CONFIG.server;

export const FETCH_ANIMALS = "Redux action for fetching animal data from the animal api";

export interface FetchAnimalsAction {
  readonly type: String;
  readonly payload: Promise<AnimalsResponse>;
}

export default function fetchAnimals(requestSettings: TableViewState): FetchAnimalsAction {
  let query = constructQuery(requestSettings);

  let payload = axios.get(`http://${host}${port ? `:${port}` : ``}/animals${query ? `?${query}` : ``}`)
    .catch(err => {
      log("Error retrieving data from animals api:", err);
    });

  return {
    type: FETCH_ANIMALS,
    payload
  }
}

function constructQuery(requestSettings: TableViewState) {
  let {
    pagination,
    sorting,
    filtering
  } = requestSettings;

  return withPaginationParams(withSortingParams(withFilteringParams("", filtering), sorting), pagination);
}

function withPaginationParams(query: string, pagination: Pagination) {
  if (pagination) {
    let { rowsPerPage, page } = pagination;
    let start = rowsPerPage * page;
    let count = rowsPerPage;
    return query + `start=${start}&count=${count}&`;
  }
  return query;
}

function withSortingParams(query: string, sorting: Sorting) {
  let newQuery = query;
  if (sorting) {
    let { sortBy, sortDescending } = sorting;
    if (sortBy) {
      newQuery += `sortBy=${sortBy}&`;
    }
    if (sortDescending) {
      newQuery += `sortDesc&`;
    }
  }
  return newQuery;
}

function withFilteringParams(query: string, filtering: Filtering) {
  if (filtering) {
    let { filters } = filtering;
    let filterBy = [...Object.keys(filters)].join(",");
    let filterValue = [...Object.values(filters)].join(",");
    if (filterBy) {
      return query + `filterBy=${filterBy}&filterValue=${filterValue}&`;
    }
  }
  return query;
}
