import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { Box, Typography, Link } from '@mui/material';

import UserArea from './UserArea';
import BackButton from './BackButton';

const Header = () => {
  return (
    <>
      <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" style={{ paddingTop: "3em" }}>
        <Typography variant="h1" component="h1">
          <Link to="/" component={NavLink} underline="none">MultiRank</Link>
          <Typography variant="subtitle1" component="span" color="error">
            BETA
          </Typography>
        </Typography>
      </Box>
      <BackButton />
      <UserArea />
    </>
  )
};

export default Header;
