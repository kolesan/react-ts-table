import { FILTERING_CHANGED } from "../actions/FilteringChangedAction";
import { ANIMAL_TABLE_PAGE_CHANGED } from "../actions/PageChangedAction";
import { ANIMAL_TABLE_ROWS_PER_PAGE_CHANGED } from "../actions/RowsPerPageChangedAction";
import { SORTING_CHANGED } from "../actions/SortingChangedAction";
import { saveTableViewState } from "../services/TableViewStateStore";

const SaveViewStateToLocalStorage = store => next => action => {
  let result = next(action);

  switch(action.type) {
    case FILTERING_CHANGED:
    case ANIMAL_TABLE_PAGE_CHANGED:
    case ANIMAL_TABLE_ROWS_PER_PAGE_CHANGED:
    case SORTING_CHANGED:
      saveTableViewState(store.getState().tableViewState);
  }

  return result
};

export default SaveViewStateToLocalStorage;
