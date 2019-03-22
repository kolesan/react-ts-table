import React from "react";
import Table from '@material-ui/core/Table';
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";

export default function inst() {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Hello</TableCell>
          <TableCell>Hello2</TableCell>
          <TableCell>Hello3</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>Yes, this is dog</TableCell>
          <TableCell>Yes, this is cat</TableCell>
          <TableCell>Yes, this is mouse</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}