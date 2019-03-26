import { ANIMAL_TABLE_PAGE_CHANGED } from "../actions/PageChangedAction";

export default function animalTablePageChangedReducer(state = 0, action) {
  if (action.type == ANIMAL_TABLE_PAGE_CHANGED) {
    return action.payload;
  }
  return state;
}
