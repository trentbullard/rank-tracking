import * as React from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  TableContainer,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';

const createRow = (name, sport, season, owner, memberCount, createdAt, joinedAt, teamCount, matchCount, format, status) => {
  return {
    name,
    sport,
    season,
    owner,
    memberCount,
    createdAt,
    joinedAt,
    teamCount,
    matchCount,
    format,
    status,
  };
};

//           name,            sport,            season,                 owner,            members, createdAt,   dateJoined,   teams,  matches,  format,       status
const rows = [
  createRow('NFL',            'Football',       '2019',                 'Roger Goodell',  '2000', '2019-01-01', '2019-01-01', '10',   '10',     "win/loss",   'active'),
  createRow('Fusion',         'Soccer',         '2021 Spring',          'Greatwood Dad',  '100',  '2019-01-01', '2019-01-01', '10',   '10',     "win/loss",   'break'),
  createRow('RLCS',           'Rocket League',  '2022 Summer Split',    'Gibbs',          '10',   '2019-01-01', '2019-01-01', '10',   '10',     "DE bracket", 'break'),
  createRow('Olympic Games',  'Table Tennis',   '2020 Summer Games',    'Thomas Bach',    '10',   '2019-01-01', '2019-01-01', '10',   '10',     'points',     'break'),
  createRow('Olympic Games',  'Curling',        '2022 Winter Games',    'Thomas Bach',    '10',   '2019-01-01', '2019-01-01', '10',   '10',     'points',     'break'),
  createRow('Olympic Games',  'Bouldering',     '2016 Summer Games',    'Thomas Bach',    '10',   '2019-01-01', '2019-01-01', '10',   '10',     'points',     'break'),
  createRow('Olympic Games',  'Snowboarding',   '2018 Winter Games',    'Thomas Bach',    '10',   '2019-01-01', '2019-01-01', '10',   '10',     'points',     'break'),
]

const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  };
  if (b[orderBy] > a[orderBy]) {
    return 1;
  };
  return 0;
};

const getComparator = (order, orderBy) => {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

const headCells = [
  { id: 'name', label: 'Name' },
  { id: 'sport', label: 'Sport' },
  { id: 'season', label: 'Season' },
  { id: 'owner', label: 'Owner' },
  { id: 'memberCount', label: 'Members' },
  { id: 'createdAt', label: 'Created' },
  { id: 'joinedAt', label: 'Joined' },
  { id: 'teamCount', label: 'Teams' },
  { id: 'matchCount', label: 'Matches' },
  { id: 'format', label: 'Format' },
  { id: 'status', label: 'Status' },
];

const EnhancedTableHead = ({ order, orderBy, onRequestSort }) => {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ whiteSpace: 'nowrap' }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const LeagueList = () => {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

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
        <Table
          aria-labelledby="league-list"
        >
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
          />
          <TableBody>
            {rows.slice().sort(getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, rowIndex) => {
                return (
                  <TableRow
                    key={rowIndex}
                  >
                    {Object.values(row).map((value, valueIndex) => {
                      return (
                        <TableCell sx={{ whiteSpace: 'nowrap' }} key={`${rowIndex}${valueIndex}`}>
                          {value}
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
        </Table>
      </TableContainer>
      {rows.length > 5 && (
        <Box display="flex" justifyContent="flex-end" width="100%">
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      )}
    </>
  );
}

export default LeagueList;