import * as React from 'react';
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import withStyles from "@material-ui/core/styles/withStyles";

export default function AnimalTableRow(props) {
  let { animal } = props;
  let { growth } = animal;
  let GrowthCell = cellWithColorByValue(growth);
  return (
    <TableRow>
      <TableCell><a href={animal.wiki} target="_blank">{animal.name}</a></TableCell>
      <TableCell>{animal.origin}</TableCell>
      <GrowthCell align="right">{growth}</GrowthCell>
      <TableCell>{animal.carnivore ? "Yes" : "No"}</TableCell>
      <TableCell align="right">{animal.height.toFixed(2)}</TableCell>
    </TableRow>
  );
}

function cellWithColorByValue(v) {
  let ColoredCell = withStyles({
    body: {
      color: v > 0 ? "blue" : "red",
    }
  })(TableCell);

  return v == 0 ? TableCell : ColoredCell;
}
