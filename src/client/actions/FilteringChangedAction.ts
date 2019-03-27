import { Filtering } from "./FetchAnimalsAction";
export const FILTERING_CHANGED = "filter changed";

export default function filteringChanged(filtering: Filtering) {
  console.log("Filter by changed", filtering);
  return {
    type: FILTERING_CHANGED,
    payload: filtering
  }
}
