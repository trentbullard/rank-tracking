import _ from 'lodash';
import {
  TableBody,
  TableCell,
  TableRow,
} from '@mui/material';

const Body = ({ rows, emptyRows }) => {
  return (
    <TableBody>
      {_.map(rows, (row, rowIndex) => {
        return (
          <TableRow
            hover
            key={rowIndex}
          >
            {_.map(row, (cell, cellKey) => {
              return (
                <TableCell sx={{ whiteSpace: 'nowrap', cursor: 'default' }} key={`${rowIndex}${cellKey}`}>
                  {cell}
                </TableCell>
              );
            })}
          </TableRow>
        );
      })}
      {emptyRows > 0 && (
        <TableRow
          style={{
            height: 53 * emptyRows,
          }}
        >
          <TableCell colSpan={6} />
        </TableRow>
      )}
    </TableBody>
  );
};

export default Body;
