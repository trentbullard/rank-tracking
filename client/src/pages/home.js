import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import LeagueList from '../components/league/LeagueList';

const Home = ({currentUser}) => {
  return (
    <Box maxWidth="100%" display="flex" justifyContent="center" alignItems="center" flexDirection="column" sx={{ pt: "1em" }}>
      <Typography variant="h4" sx={{ color: "text.secondary", mb: 4 }}>
        {currentUser}'s Leagues
        <Tooltip title="Create League" placement="top">
          <RouterLink to="/leagues/new">
            <IconButton aria-label="add" component="span" color="secondary">
              <AddCircleIcon fontSize="large"/>
            </IconButton>
          </RouterLink>
        </Tooltip>
      </Typography>
      <LeagueList currentUser={currentUser} />
    </Box>
  );
};

export default Home;
