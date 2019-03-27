import * as React from 'react';
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Input from "@material-ui/core/Input";

export default function AnimalTableFiltering(props) {

  return (
    <TableRow>
      <TableCell>{createFilterInput("name")}</TableCell>
      <TableCell>{createFilterInput("origin")}</TableCell>
      <TableCell />
      <TableCell />
      <TableCell />
    </TableRow>
  );

  function createFilterHandler(id: string) {
    return function(event) {
      const value = event.target.value;
      const { tableViewState } = props;
      const { filtering } = tableViewState;
      const { filters } = filtering;
      let newFilters = {...filters};
      if (value === "") {
        delete newFilters[id];
      } else {
        newFilters[id] = value;
      }
      const newFiltering = { filters: newFilters };

      props.filteringChanged(newFiltering);
    }
  }

  function createFilterInput(id: string) {
    let filterHandler = createFilterHandler(id);
    let { filters } = props.tableViewState.filtering;
    return <Input placeholder="Filter value" onChange={filterHandler} value={filters[id] || ""} />;
  }
}