import _ from 'lodash';
import * as React from 'react';
import { Typography } from '@mui/material';

import TableContainer from '../../components/ui/Table/Container';
import { isTrue } from '../../helpers/boolean';

const headCells = [
  { id: 'team_id', label: 'ID' },
  { id: 'team_name', label: 'Name' },
  { id: 'joined_at', label: 'Joined' },
  { id: 'position_name', label: 'Position' },
  { id: 'rank', label: 'Rank' },
  { id: 'points', label: 'Points' },
  { id: 'league_name', label: 'League' },
  { id: 'season_name', label: 'Season' },
];

const TeamList = ({ teams }) => {
  const rows = _.map(teams, team => {
    return {
      team_id: team.team_id,
      team_name: team.team_name,
      joined_at: new Date(team.joined_at).toLocaleDateString(),
      position_name: team.position_name,
      rank: team.rank,
      points: team.points,
      league_name: team.league_name,
      season_name: team.season_name,
    };
  });
  
  return (
    isTrue(teams) ?
      <TableContainer rows={rows} headCells={headCells} />
      : <Typography variant="h6">No teams found.</Typography>
  );
};

export default TeamList;
