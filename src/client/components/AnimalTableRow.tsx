import * as React from 'react';
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

export default function AnimalTableRow(props) {
  let { animal } = props;
  return (
    <TableRow>
      <TableCell>{animal.name}</TableCell>
      <TableCell>{animal.origin}</TableCell>
      <TableCell align="right">{animal.growth}</TableCell>
      <TableCell>{animal.carnivore ? "Yes" : "No"}</TableCell>
      <TableCell align="right">{animal.height}</TableCell>
    </TableRow>
  );
}