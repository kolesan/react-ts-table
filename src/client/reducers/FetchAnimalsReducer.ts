import { FETCH_ANIMALS } from "../actions/FetchAnimalsAction";

import AnimalsResponse from "../model/AnimalsResponse";

export default function fetchAnimalsReducer(state: AnimalsResponse = { total: 0, animals: [] }, action) {
  if (action.type == FETCH_ANIMALS) {
    console.log("Received animals:", action.payload.data);
    return action.payload.data;
  }
  return state;
}
