import * as React from 'react';
import { Navigate } from 'react-router-dom';
import { Typography } from '@mui/material';

const Home = ({currentUser}) => {
  if (currentUser) {
    return (
      <Typography variant="h5" component="h1" gutterBottom>
        Welcome {currentUser}!
      </Typography>
    )
  } else {
    return (
      <Navigate to="/login" replace={true} />
    )
  }
};

export default Home;
