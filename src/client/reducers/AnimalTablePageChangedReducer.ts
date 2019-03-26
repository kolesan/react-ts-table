import { ANIMAL_TABLE_PAGE_CHANGED } from "../actions/AnimalTablePageChangedAction";

export default function animalTablePageChangedReducer(state = 0, action) {
  if (action.type == ANIMAL_TABLE_PAGE_CHANGED) {
    return action.page;
  }
  return state;
}