import * as React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Container } from '@mui/material';

import { AuthContext } from '../contexts/AuthContext';
import Header from './header/Header';
import Home from '../pages/Home';
import Login from '../pages/Login';
import LeagueDetails from '../pages/league/LeagueDetails';
import NewLeague from '../pages/league/NewLeague';

const App = () => {
  const { currentUser } = React.useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return !!currentUser ? children : <Navigate to="/login" replace />;
  };

  const RequireNoAuth = ({ children }) => {
    return !currentUser ? children : <Navigate to="/" replace />;
  };
  
  return (
    <BrowserRouter>
      <Header currentUser={currentUser} />
      <Container>
        <Routes>
          <Route path="/" element={<RequireAuth><Home currentUser={currentUser} /></RequireAuth>} />
          <Route path="/leagues" element={<RequireAuth><LeagueDetails /></RequireAuth>} />
          <Route path="/leagues/new" element={<RequireAuth><NewLeague /></RequireAuth>} />
          <Route path="/leagues/:id" element={<RequireAuth><LeagueDetails /></RequireAuth>} />
          <Route path="/login" element={<RequireNoAuth><Login currentUser={currentUser} /></RequireNoAuth>} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
