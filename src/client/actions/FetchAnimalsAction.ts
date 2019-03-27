import AnimalsResponse from "../model/AnimalsResponse";
import log from "../utils/Logging";
import { Filtering, Pagination, Sorting, TableViewState } from "../model/TableViewState";
import { pipe } from "../utils/FunctionalUtils";
const { default: axios } = require('axios');
const { host, port } = CONFIG.server;

export const FETCH_ANIMALS = "Redux action for fetching animal data from the animal api";

export interface FetchAnimalsAction {
  readonly type: String;
  readonly payload: Promise<AnimalsResponse>;
}

export default function fetchAnimals(tableViewState: TableViewState): FetchAnimalsAction {
  let query = constructQuery(tableViewState);
  let portString = port ? `:${port}` : ``;
  let queryString = query ? `?${query}` : ``;

  let payload = axios.get(`http://${host}${portString}/animals${queryString}`)
    .catch(err => {
      log("Error retrieving data from animals api:", err);
    });

  return {
    type: FETCH_ANIMALS,
    payload
  }
}

function constructQuery({ pagination, sorting, filtering }: TableViewState): string {
  return pipe("",
    withPagination(pagination),
    withSorting(sorting),
    withFiltering(filtering)
  );
}

function withPagination(pagination: Pagination) {
  return function(query) {
    if (pagination) {
      let { rowsPerPage, page } = pagination;
      let start = rowsPerPage * page;
      let count = rowsPerPage;
      return query + `start=${start}&count=${count}&`;
    }
    return query;
  }
}

function withSorting(sorting: Sorting) {
  return function(query) {
    let newQuery = query;
    if (sorting) {
      let {sortBy, sortDescending} = sorting;
      if (sortBy) {
        newQuery += `sortBy=${sortBy}&`;
      }
      if (sortDescending) {
        newQuery += `sortDesc&`;
      }
    }
    return newQuery;
  }
}

function withFiltering(filtering: Filtering) {
  return function(query) {
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
}
