import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { Box, Typography, Link } from '@mui/material';
import LoginForm from './login';

const Home = () => {
  return (
    <>
      <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
        <Typography>
          <Link to="/" component={NavLink} underline="none" color="black">LOGIN TO PROCEED</Link>
        </Typography>
      </Box>
      <LoginForm />
    </>
  );
};

export default Home;
