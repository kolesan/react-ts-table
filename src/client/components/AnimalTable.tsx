import * as React from 'react';
import Table from '@material-ui/core/Table';
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableFooter from "@material-ui/core/TableFooter";
import AnimalTableRow from "./AnimalTableRow";
import AnimalsResponse from "../model/AnimalsResponse";
import AnimalTablePaginationContainer from "../containers/AnimalTablePaginationContainer";
import Paper from "@material-ui/core/Paper";
import log from "../utils/Logging";
import Input from "@material-ui/core/Input";
import { TableViewState } from "../model/TableViewState";
import AnimalTableHeaderContainer from "../containers/AnimalTableHeaderContainer";

interface AnimalTableProps {
  readonly animalsData: AnimalsResponse;
  readonly tableViewState: TableViewState;
  readonly fetchAnimals: Function;
}
interface AnimalTableState {}

export default class AnimalTable extends React.Component<AnimalTableProps, AnimalTableState> {

  componentDidMount() {
    this.props.fetchAnimals(this.props.tableViewState);
  }

  createFilterHandler(id: string) {
    return function(event) {
      const value = event.target.value;
      const { tableViewState } = this.props;
      const { filtering } = tableViewState;
      const { filters } = filtering;
      let newFilters = {...filters};
      if (value === "") {
        delete newFilters[id];
      } else {
        newFilters[id] = value;
      }
      const newFiltering = { filters: newFilters };

      this.props.filteringChanged(newFiltering);
    }
  }

  createFilterInput(id) {
    let filterHandler = this.createFilterHandler(id).bind(this);
    let { filters } = this.props.tableViewState.filtering;
    return <Input placeholder="Filter value" onChange={filterHandler} value={filters[id] || ""} />;
  }

  render() {
    let animals = [];
    let total = 0;

    let animalsData = this.props.animalsData;
    if (animalsData) {
      animals = animalsData.animals;
      total = animalsData.total;
    }

    return (
      <Paper>
        <Table>
          <TableHead>
            <AnimalTableHeaderContainer />
            <TableRow>
              <TableCell>{this.createFilterInput("name")}</TableCell>
              <TableCell>{this.createFilterInput("origin")}</TableCell>
              <TableCell />
              <TableCell />
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {animals.map(animal =>
              <AnimalTableRow key={animal.id} animal={animal} />
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <AnimalTablePaginationContainer total={total} />
            </TableRow>
          </TableFooter>
        </Table>
      </Paper>
    );
  }
}