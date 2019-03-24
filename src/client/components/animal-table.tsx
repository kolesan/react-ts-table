import * as React from 'react';
import Table from '@material-ui/core/Table';
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableFooter from "@material-ui/core/TableFooter";
import AnimalTableRow from "./animal-table-row";
import AnimalTablePagination from "./animal-table-pagination";
import AnimalProvider, { AnimalData } from "../services/AnimalProvider";

interface AnimalTableProps {}
interface AnimalTableState {
  readonly animalData: AnimalData;
}
export default class AnimalTable extends React.Component<AnimalTableProps, AnimalTableState> {
  state = {
    animalData: {
      total: 0,
      animals: []
    }
  };
  animalProvider = new AnimalProvider();

  constructor(props: AnimalTableProps) {
    super(props);
  }

  componentDidMount() {
    this.requestAnimals(0, 10);
  }

  requestAnimals(page: number, rowsPerPage: number): void {
    this.animalProvider.getAnimals(page, rowsPerPage)
      .then(animalData => this.setState({animalData}));
  }

  render() {
    let { animals, total } = this.state.animalData;
    return (
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
            <AnimalTablePagination
              total={total}
              onPageChange={this.requestAnimals.bind(this)}
              onRowsPerPageChange={this.requestAnimals.bind(this)}
            />
          </TableRow>
        </TableFooter>
      </Table>
    );
  }
}