import AnimalsResponse from "../model/AnimalsResponse";
import log from "../utils/Logging";
const { default: axios } = require('axios');
const { host, port } = CONFIG.server;
export const FETCH_ANIMALS = "Redux action for fetching animal data from the animal api";

export interface FetchAnimalsAction {
  readonly type: String;
  readonly payload: Promise<AnimalsResponse>;
}
export interface TableViewState {
  readonly pagination: Pagination;
  readonly sorting: Sorting;
  readonly filtering: Filtering;
}
export interface Pagination {
  readonly page: number;
  readonly rowsPerPage: number;
}
export interface Sorting {
  readonly sortBy: string;
  readonly sortDescending: boolean;
}
export interface Filtering {
  readonly filters: object;
}

function constructQuery(requestSettings: TableViewState) {
  let {
    pagination,
    sorting,
    filtering
  } = requestSettings;

  let query = "";
  if (pagination) {
    let { rowsPerPage, page } = pagination;
    let start = rowsPerPage * page;
    let count = rowsPerPage;
    query += `start=${start}&count=${count}&`;
  }
  if (sorting) {
    let { sortBy, sortDescending } = sorting;
    if (sortBy) {
      query += `sortBy=${sortBy}&`;
    }
    if (sortDescending) {
      query += `sortDesc&`;
    }
  }
  if (filtering) {
    let { filters } = filtering;
    let filterBy = [...Object.keys(filters)].join(",");
    let filterValue = [...Object.values(filters)].join(",");
    if (filterBy) {
      query += `filterBy=${filterBy}&filterValue=${filterValue}&`;
    }
  }
  return query;
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