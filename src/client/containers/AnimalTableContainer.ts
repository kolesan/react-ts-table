import { connect } from "react-redux";
import AnimalTable from "../components/AnimalTable";
import fetchAnimals from "../actions/FetchAnimalsAction";
import filteringChanged from "../actions/FilteringChangedAction";
import sortingChanged from "../actions/SortingChangedAction";
import { Filtering, Sorting, TableViewState } from "../model/TableViewState";

function mapStateToProps({ animalsData, tableViewState }) {
  return { animalsData, tableViewState };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchAnimals: (tableViewState: TableViewState) => {
      dispatch(fetchAnimals(tableViewState))
    },
    sortingChanged: (sorting: Sorting) => {
      dispatch(sortingChanged(sorting))
    },
    filteringChanged: (filtering: Filtering) => {
      dispatch(filteringChanged(filtering))
    }
  }
}

const AnimalTableContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnimalTable);

export default AnimalTableContainer