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
import TableSortLabel from "@material-ui/core/TableSortLabel";
import log from "../utils/Logging";
import { TableViewState } from "../actions/FetchAnimalsAction";
import Input from "@material-ui/core/Input";

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

  createSortHandler(id) {
    return function(event) {
      let { tableViewState } = this.props;
      let { sorting } = tableViewState;
      let newSorting = {
        sortBy: id,
        sortDescending: !sorting.sortDescending
      };

      this.props.sortByChanged(newSorting.sortBy);
      this.props.sortDescendingChanged(newSorting.sortDescending);

      this.props.fetchAnimals({ ...tableViewState, ...{ sorting: newSorting } });
    }
  }

  createSortableLabel(id, label) {
    let sortHandler = this.createSortHandler(id).bind(this);
    let { sortBy, sortDescending } = this.props.tableViewState.sorting;
    return (
      <TableSortLabel
        direction={sortDescending ? "desc" : "asc"}
        active={sortBy === id}
        hideSortIcon={true}
        onClick={sortHandler}>
        {label}
      </TableSortLabel>
    );
  }

  createFilterHandler(id: string) {
    return function(event) {
      const value = event.target.value;
      const { tableViewState } = this.props;
      const { filtering } = tableViewState;
      const { filters } = filtering;
      let newFilters = new Map(filters);
      if (value === "") {
        newFilters.delete(id);
      } else {
        newFilters.set(id, value);
      }
      const newFiltering = { filters: newFilters };

      this.props.filteringChanged(newFiltering);
      this.props.fetchAnimals({ ...tableViewState, ...{ filtering: newFiltering } });
    }
  }

  createFilterInput(id) {
    let filterHandler = this.createFilterHandler(id).bind(this);
    let { filters } = this.props.tableViewState.filtering;
    return <Input placeholder="Filter value" onChange={filterHandler} value={filters.get(id)} />;
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
            <TableRow>
              <TableCell>{this.createSortableLabel("name", "Name")}</TableCell>
              <TableCell>{this.createSortableLabel("origin", "Origin")}</TableCell>
              <TableCell align="right">{this.createSortableLabel("growth", "Population change")}</TableCell>
              <TableCell>Carnivorous</TableCell>
              <TableCell align="right">{this.createSortableLabel("height", "Average height (cm.)")}</TableCell>
            </TableRow>
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