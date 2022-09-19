import _ from 'lodash';
import * as React from 'react';
import { Typography } from '@mui/material';

import TableContainer from '../../components/ui/Table/Container';
import { isTrue } from '../../helpers/boolean';

const headCells = [
  { id: 'name', label: 'Name' },
  { id: 'sport', label: 'Sport' },
  { id: 'owner', label: 'Owner' },
  { id: 'createdAt', label: 'Created' },
  { id: 'format', label: 'Format' },
  { id: 'status', label: 'Status' },
];

const LeagueList = ({ leagues }) => {
  const rows = _.map(leagues, league => {
    return {
      name: league.name,
      sport: league.sport_name,
      owner: league.owner_fname + ' ' + league.owner_lname,
      createdAt: new Date(league.created_at).toLocaleDateString(),
      format: league.format,
      status: league.status,
    };
  });
  
  return (
    isTrue(leagues) ?
      <TableContainer rows={rows} headCells={headCells} />
      : <Typography variant="h6">No leagues found.</Typography>
  );
};

export default LeagueList;
