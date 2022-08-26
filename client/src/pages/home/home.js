import { Box, Typography } from '@mui/material';
import React from 'react';

const Home = props => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
      <Typography variant="h2" component="h2" gutterBottom>
        LOGIN TO PROCEED
      </Typography>
    </Box>
  );
};

export default Home;
