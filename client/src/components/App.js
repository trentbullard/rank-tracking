import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';

import Header from './header/Header';
import Home from '../pages/Home';
import Login from '../pages/Login';
import { AuthContext } from '../contexts/AuthContext';

const App = () => {
  const { currentUser } = React.useContext(AuthContext);
  
  return (
    <BrowserRouter>
      <Header currentUser={currentUser} />
      <Container>
        <Routes>
          <Route path="/" element={<Home currentUser={currentUser} />} />
          <Route path="/login" element={<Login currentUser={currentUser} />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
