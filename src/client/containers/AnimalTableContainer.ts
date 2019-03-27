import { connect } from "react-redux";
import AnimalTable from "../components/AnimalTable";
import filteringChanged from "../actions/FilteringChangedAction";
import sortingChanged from "../actions/SortingChangedAction";
import { Filtering, Sorting } from "../model/TableViewState";

function mapStateToProps({ animalsData, tableViewState }) {
  return { animalsData, tableViewState };
}

function mapDispatchToProps(dispatch) {
  return {
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