import * as React from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';

import Header from './header/Header';
import Snackbar from './utility/Snackbar';

const App = () => {
  return (
    <Container>
      <Header />
      <Snackbar />
      <Outlet />
    </Container>
  );
};

export default App;
