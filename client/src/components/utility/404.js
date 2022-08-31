import { Box, Typography } from '@mui/material';

const NotFound = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
      <Typography variant="h3">404</Typography>
      <Typography variant="h4">Page not found</Typography>
    </Box>
  );
};

export default NotFound;
