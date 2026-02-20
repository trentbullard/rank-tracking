import _ from 'lodash';
import * as React from 'react';
import { Typography } from '@mui/material';

import TableContainer from '../../components/ui/Table/Container';
import { isTrue } from '../../helpers/boolean';

const headCells = [
  { id: 'id', label: 'ID' },
  { id: 'name', label: 'Name' },
  { id: 'owner', label: 'Owner' },
  { id: 'visibility', label: 'Visibility' },
  { id: 'role', label: 'Role' },
  { id: 'createdAt', label: 'Created' },
  { id: 'status', label: 'Status' },
];

const ClubList = ({ clubs }) => {
  const rows = _.map(clubs, (club) => ({
    id: club.id,
    name: club.name,
    owner: `${club.owner_fname || ''} ${club.owner_lname || ''}`.trim(),
    visibility: club.visibility,
    role: club.member_role || 'member',
    createdAt: new Date(club.created_at).toLocaleDateString(),
    status: club.status,
  }));

  return (
    isTrue(clubs)
      ? <TableContainer rows={rows} headCells={headCells} />
      : <Typography variant="h6">No clubs found.</Typography>
  );
};

export default ClubList;
