import * as React from 'react';
import Table from '@material-ui/core/Table';
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableFooter from "@material-ui/core/TableFooter";
import AnimalTableRow from "./AnimalTableRow";
import AnimalsResponse from "../model/AnimalsResponse";
import AnimalTablePaginationContainer from "../containers/AnimalTablePaginationContainer";
import Paper from "@material-ui/core/Paper";
import log from "../utils/Logging";
import { TableViewState } from "../model/TableViewState";
import AnimalTableHeaderContainer from "../containers/AnimalTableHeaderContainer";
import AnimalTableFilteringContainer from "../containers/AnimalTableFilteringContainer";

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
            <AnimalTableFilteringContainer />
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