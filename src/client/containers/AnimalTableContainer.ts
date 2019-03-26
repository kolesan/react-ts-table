import { connect } from "react-redux";
import AnimalTable from "../components/AnimalTable";
import fetchAnimals, { TableViewState } from "../actions/FetchAnimalsAction";
import sortByChanged from "../actions/SortByAction";
import sortDescendingChanged from "../actions/SortDescendingAction";

function mapStateToProps({ animalsData, tableViewState }) {
  return { animalsData, tableViewState };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchAnimals: (tableViewState: TableViewState) => {
      dispatch(fetchAnimals(tableViewState))
    },
    sortByChanged: (sortBy: string) => {
      dispatch(sortByChanged(sortBy))
    },
    sortDescendingChanged: (sortDescending: boolean) => {
      dispatch(sortDescendingChanged(sortDescending))
    }
  }
}

const AnimalTableContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnimalTable);

export default AnimalTableContainer