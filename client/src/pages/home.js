import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import LeagueList from '../components/league/LeagueList';

const Home = ({currentUser}) => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" style={{ paddingTop: "3em" }}>
      <Box>
        <Typography variant="h3" component="h3" gutterBottom>
          {currentUser}'s Leagues
          <Tooltip title="Create League" placement="top">
            <RouterLink to="/leagues/new">
              <IconButton aria-label="add" component="span" color="secondary">
                <AddCircleIcon fontSize="large"/>
              </IconButton>
            </RouterLink>
          </Tooltip>
        </Typography>
      </Box>
      <LeagueList currentUser={currentUser} />
    </Box>
  );
};

export default Home;
