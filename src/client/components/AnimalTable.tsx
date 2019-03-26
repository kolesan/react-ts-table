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

interface AnimalTableProps {
  readonly animalsData: AnimalsResponse;
  readonly page: number;
  readonly rowsPerPage: number;
  readonly fetchAnimals: Function;
}
interface AnimalTableState {}

export default class AnimalTable extends React.Component<AnimalTableProps, AnimalTableState> {

  componentDidMount() {
    this.props.fetchAnimals(this.props.page, this.props.rowsPerPage);
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
              <TableCell>Name</TableCell>
              <TableCell>Origin</TableCell>
              <TableCell align="right">Population change</TableCell>
              <TableCell>Carnivore</TableCell>
              <TableCell align="right">Average height (cm.)</TableCell>
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