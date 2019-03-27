import * as React from 'react';
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import { Sorting } from "../model/TableViewState";

export default function AnimalTableHeader(props) {

  return (
    <TableRow>
      <TableCell>{createSortableLabel("name", "Name")}</TableCell>
      <TableCell>{createSortableLabel("origin", "Origin")}</TableCell>
      <TableCell align="right">{createSortableLabel("growth", "Population change")}</TableCell>
      <TableCell>Carnivorous</TableCell>
      <TableCell align="right">{createSortableLabel("height", "Average height (cm.)")}</TableCell>
    </TableRow>
  );

  function createSortableLabel(id, label) {
    let sortHandler = createSortHandler(id);
    let { sortBy, sortDescending } = props.tableViewState.sorting;
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

  function createSortHandler(id) {
    return function(event) {
      let { sorting } = props.tableViewState;

      props.sortingChanged({
        sortBy: id,
        sortDescending: id !== sorting.sortBy ? false : !sorting.sortDescending
      });
    }
  }
}