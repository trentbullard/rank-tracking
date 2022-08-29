import * as React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Container } from '@mui/material';

import Header from './header/Header';
import Home from '../pages/Home';
import Login from '../pages/Login';
import { AuthContext } from '../contexts/AuthContext';

const App = () => {
  const { currentUser } = React.useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return !!currentUser ? children : <Navigate to="/login" replace />;
  };

  const RequireNoAuth = ({ children }) => {
    return !currentUser ? children : <Navigate to="/home" replace />;
  };
  
  return (
    <BrowserRouter>
      <Header currentUser={currentUser} />
      <Container>
        <Routes>
          <Route path="/" element={
            <RequireAuth>
              <Home currentUser={currentUser} />
            </RequireAuth>
          } />
          <Route path="/login" element={
            <RequireNoAuth>
              <Login currentUser={currentUser} />
            </RequireNoAuth>
          } />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
