import * as React from 'react';
import Table from '@material-ui/core/Table';
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import { Animal } from "../model/Animal";
const { default: axios } = require('axios');

interface AnimalTableProps {}
interface AnimalTableState {
  animalData: Animal[];
}
export default class AnimalTable extends React.Component<AnimalTableProps, AnimalTableState> {

  constructor(props: AnimalTableProps) {
    super(props);
    this.state = {
      animalData: []
    }
  }

  componentDidMount() {
    axios.get("http://localhost:3000/animals")
      .then(resp => {
        this.setState({animalData: resp.data});
      });
  }

  render() {
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Origin</TableCell>
            <TableCell>Average population change / year</TableCell>
            <TableCell>Carnivore</TableCell>
            <TableCell>Average height (cm.)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.animalData.map(animal => (
            <TableRow key={animal.id}>
              <TableCell>{animal.name}</TableCell>
              <TableCell>{animal.origin}</TableCell>
              <TableCell>{animal.growth}</TableCell>
              <TableCell>{animal.carnivore ? "Yes" : "No"}</TableCell>
              <TableCell>{animal.height}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
}