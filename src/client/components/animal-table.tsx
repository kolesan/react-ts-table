import * as React from 'react';
import Table from '@material-ui/core/Table';
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import Animal from "../model/Animal";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import AnimalTableRow from "./animal-table-row";
import log from "../utils/logging";
import { div } from "../utils/math-utils";

const { default: axios } = require('axios');

interface AnimalTableProps {}
interface AnimalData {
  readonly total: number;
  readonly animals: Animal[];
}
interface AnimalTableState {
  readonly animalData: AnimalData;
  readonly rowsPerPage: number;
  readonly page: number;
}
export default class AnimalTable extends React.Component<AnimalTableProps, AnimalTableState> {
  state = {
    animalData: {
      total: 0,
      animals: []
    },
    page: 0,
    rowsPerPage: 10
  };

  constructor(props: AnimalTableProps) {
    super(props);
  }

  componentDidMount() {
    let { rowsPerPage, page } = this.state;
    this.requestAnimals(page, rowsPerPage);
  }

  requestAnimals(page: number, rowsPerPage: number) {
    let start = rowsPerPage * page;
    axios.get(`http://localhost:3000/animals?start=${start}&count=${rowsPerPage}`)
      .then(resp => {
        this.setState({
          animalData: resp.data
        });
      })
      .catch(err => {
        log("Error retrieving data from animals api:", err);
      });
  }

  pageChange(event, page) {
    this.setState({page});
    this.requestAnimals(page, this.state.rowsPerPage);
  }

  rowsPerPageChange(event) {
    let { rowsPerPage, page } = this.state;
    let newRowsPerPage = event.target.value;
    let newPage = div(rowsPerPage * page, newRowsPerPage);

    this.setState({
      rowsPerPage: newRowsPerPage,
      page: newPage
    });

    this.requestAnimals(newPage, newRowsPerPage);
  }

  render() {
    let { animals, total } = this.state.animalData;
    let { page, rowsPerPage } = this.state;
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
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              count={total}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={this.pageChange.bind(this)}
              onChangeRowsPerPage={this.rowsPerPageChange.bind(this)}
            />
          </TableRow>
        </TableFooter>
      </Table>
    );
  }
}