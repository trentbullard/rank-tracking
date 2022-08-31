import * as React from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';

import Header from './header/Header';

const App = () => {
  const currentUser = 'trent';

  return (
    <Container>
      <Header currentUser={currentUser} />
      <Outlet />
    </Container>
  );
};

export default App;
