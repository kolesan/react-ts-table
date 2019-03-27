import { FETCH_ANIMALS } from "../actions/FetchAnimalsAction";

export default function fetchAnimalsReducer(state = { total: 0, animals: [] }, action) {
  if (action.type == FETCH_ANIMALS) {
    console.log("Received animals:", action.payload.data);
    return action.payload.data;
  }
  return state;
}
