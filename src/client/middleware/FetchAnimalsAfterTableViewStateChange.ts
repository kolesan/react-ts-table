import { FILTERING_CHANGED } from "../actions/FilteringChangedAction";
import { SORTING_CHANGED } from "../actions/SortingChangedAction";
import { PAGINATION_CHANGED } from "../actions/PaginationAction";
import fetchAnimals from "../actions/FetchAnimalsAction";

const FetchAnimalsAfterTableViewStateChange = store => next => action => {
  let result = next(action);

  switch(action.type) {
    case FILTERING_CHANGED:
    case PAGINATION_CHANGED:
    case SORTING_CHANGED:
      store.dispatch(fetchAnimals(store.getState().tableViewState));
  }

  return result;
};

export default FetchAnimalsAfterTableViewStateChange;
