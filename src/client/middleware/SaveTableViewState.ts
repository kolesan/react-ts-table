import { FILTERING_CHANGED } from "../actions/FilteringChangedAction";
import { SORTING_CHANGED } from "../actions/SortingChangedAction";
import { saveTableViewState } from "../services/TableViewStateStore";
import { PAGINATION_CHANGED } from "../actions/PaginationAction";

const SaveViewStateToLocalStorage = store => next => action => {
  let result = next(action);

  switch(action.type) {
    case FILTERING_CHANGED:
    case PAGINATION_CHANGED:
    case SORTING_CHANGED:
      saveTableViewState(store.getState().tableViewState);
  }

  return result
};

export default SaveViewStateToLocalStorage;
