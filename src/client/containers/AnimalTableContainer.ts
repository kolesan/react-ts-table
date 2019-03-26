import { connect } from "react-redux";
import AnimalTable from "../components/AnimalTable";
import fetchAnimals from "../actions/FetchAnimalsAction";

function mapStateToProps({ animalsData, page, rowsPerPage }) {
  return { animalsData, page, rowsPerPage };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchAnimals: (page, rowsPerPage) => {
      dispatch(fetchAnimals(page, rowsPerPage))
    }
  }
}

const AnimalTableContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnimalTable);

export default AnimalTableContainer