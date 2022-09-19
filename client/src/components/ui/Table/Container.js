import _ from 'lodash';
import * as React from 'react';
import {
  Paper,
  Table,
  TableContainer,
} from '@mui/material';

import Header from './Header';
import Body from './Body';
import Pagination from './Pagination';

const Container = ({ rows, headCells }) => {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState(headCells[0].id);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const sortedRows = _.orderBy(rows, [orderBy], [order]);
  const pageRows = _.slice(sortedRows, page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleRequestSort = (_event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  
  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-labelledby="league-list">
          <Header
            headCells={headCells}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />
          <Body rows={pageRows} emptyRows={emptyRows} />
        </Table>
      </TableContainer>
      {rows.length > 5 ?
        <Pagination
          count={rows.length}
          page={page}
          rowsPerPage={rowsPerPage}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
        : null
      }
    </>
  );
};

export default Container;
