import * as React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

const LeagueDetails = () => {
  const { id } = useParams();

  return (
    <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" sx={{ pt: "3em" }}>
      <Box>
        <Typography variant="h4" sx={{ color: "text.secondary", mb: 4 }}>
          {id} League Details
        </Typography>
      </Box>
    </Box>
  );
};

export default LeagueDetails;
