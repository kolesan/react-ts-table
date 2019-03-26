import { ANIMAL_TABLE_ROWS_PER_PAGE_CHANGED } from "../actions/AnimalTableRowsPerPageChangedAction";

export default function animalTableRowsPerPageChangedReducer(state = 10, action) {
  if (action.type == ANIMAL_TABLE_ROWS_PER_PAGE_CHANGED) {
    return action.payload;
  }
  return state;
}