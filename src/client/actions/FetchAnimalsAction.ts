import AnimalsResponse from "../model/AnimalsResponse";
import log from "../utils/Logging";
const { default: axios } = require('axios');
const { host, port } = CONFIG.server;
export const FETCH_ANIMALS = "Redux action for fetching animal data from the animal api";

export interface FetchAnimalsAction {
  readonly type: String;
  readonly payload: Promise<AnimalsResponse>;
}

export default function fetchAnimals(page: number, rowsPerPage: number): FetchAnimalsAction {
  let start = rowsPerPage * page;
  let count = rowsPerPage;

  let payload = axios.get(`http://${host}:${port}/animals?start=${start}&count=${count}`)
    .catch(err => {
      log("Error retrieving data from animals api:", err);
    });

  return {
    type: FETCH_ANIMALS,
    payload
  }
}