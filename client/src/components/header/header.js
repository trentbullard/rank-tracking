import React from 'react';
import { NavLink } from 'react-router-dom';
import { Typography } from '@mui/material';

const Header = () => {
  return (
    <Typography variant="h2" component="h2" gutterBottom>
      <NavLink to="/">MultiRank</NavLink>
      <Typography variant="subtitle1" component="span" color="textSecondary">
        BETA
      </Typography>
    </Typography>
  )
};

export default Header;
