import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { Box, Typography, Link } from '@mui/material';

const Home = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
      <Typography variant="h3" component="h3" gutterBottom>
        <Link to="/" component={NavLink} underline="none">LOGIN TO PROCEED</Link>
      </Typography>
    </Box>
  );
};

export default Home;
