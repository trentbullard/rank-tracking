import _ from 'lodash';
import * as React from 'react';
import { Typography } from '@mui/material';

import TableContainer from '../../components/ui/Table/Container';
import { isTrue } from '../../helpers/boolean';

const headCells = [
  { id: 'id', label: 'ID' },
  { id: 'game_name', label: 'Name' },
  { id: 'sport_name', label: 'Sport' },
  { id: 'league_name', label: 'League' },
  { id: 'game_status', label: 'Status' },
  { id: 'updated_at', label: 'Played' },
  { id: 'game_collection_type', label: 'Type' },
];

const GameList = ({ games }) => {
  const rows = _.map(games, game => {
    return {
      game_id: game.game_id,
      game_name: game.game_name,
      sport_name: game.sport_name,
      league_name: game.league_name,
      game_status: game.game_status,
      updated_at: new Date(game.updated_at).toLocaleDateString(),
      game_collection_type: game.game_collection_type,
    };
  });
  
  return (
    isTrue(games) ?
      <TableContainer rows={rows} headCells={headCells} />
      : <Typography variant="h6">No games found.</Typography>
  );
};

export default GameList;
