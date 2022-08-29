import * as React from 'react';
import { Navigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

import LeagueList from '../components/league/LeagueList';

const Home = ({currentUser}) => {
  if (currentUser) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" style={{ paddingTop: "3em" }}>
        <Typography variant="h3" component="h3" gutterBottom>
          {currentUser}'s Leagues
        </Typography>
        <LeagueList currentUser={currentUser} />
      </Box>
    )
  } else {
    return (
      <Navigate to="/login" replace={true} />
    )
  }
};

export default Home;
