import _ from 'lodash';
import * as React from 'react';
import { Typography } from '@mui/material';

import TableContainer from '../../components/ui/Table/Container';
import { isTrue } from '../../helpers/boolean';

const headCells = [
  { id: 'name', label: 'Name' },
  { id: 'updatedAt', label: 'Played' },
  { id: 'status', label: 'Status' },
];

const GameList = ({ games }) => {
  const rows = _.map(games, game => {
    return {
      name: game.name,
      updatedAt: new Date(game.updated_at).toLocaleDateString(),
      status: game.status,
    };
  });
  
  return (
    isTrue(games) ?
      <TableContainer rows={rows} headCells={headCells} />
      : <Typography variant="h6">No games found.</Typography>
  );
};

export default GameList;
