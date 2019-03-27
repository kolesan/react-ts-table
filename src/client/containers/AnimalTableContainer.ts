import { connect } from "react-redux";
import AnimalTable from "../components/AnimalTable";
import fetchAnimals from "../actions/FetchAnimalsAction";
import { TableViewState } from "../model/TableViewState";

function mapStateToProps({ animalsData, tableViewState }) {
  return { animalsData, tableViewState };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchAnimals: (tableViewState: TableViewState) => {
      dispatch(fetchAnimals(tableViewState))
    }
  }
}

const AnimalTableContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnimalTable);

export default AnimalTableContainer