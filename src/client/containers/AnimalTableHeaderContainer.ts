import { connect } from "react-redux";
import sortingChanged from "../actions/SortingChangedAction";
import { Sorting } from "../model/TableViewState";
import AnimalTableHeader from "../components/AnimalTableHeader";

function mapStateToProps({ tableViewState }) {
  return { tableViewState };
}

function mapDispatchToProps(dispatch) {
  return {
    sortingChanged: (sorting: Sorting) => {
      dispatch(sortingChanged(sorting))
    }
  }
}

const AnimalTableHeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnimalTableHeader);

export default AnimalTableHeaderContainer