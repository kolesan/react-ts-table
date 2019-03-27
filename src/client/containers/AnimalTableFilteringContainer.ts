import { connect } from "react-redux";
import filteringChanged from "../actions/FilteringChangedAction";
import { Filtering } from "../model/TableViewState";
import AnimalTableFiltering from "../components/AnimalTableFiltering";

function mapStateToProps({ tableViewState }) {
  return { tableViewState };
}

function mapDispatchToProps(dispatch) {
  return {
    filteringChanged: (filtering: Filtering) => {
      dispatch(filteringChanged(filtering))
    }
  }
}

const AnimalTableFilteringContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnimalTableFiltering);

export default AnimalTableFilteringContainer