import * as React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { darkTheme as theme } from "./theme";

import AuthProvider from './contexts/AuthContext';
import { AuthContext } from './contexts/AuthContext';
import FlashProvider from './contexts/FlashContext';
import App from "./components/App";
import Home from './pages/Home';
import Leagues from './pages/Leagues';
import Login from './pages/Login';
import LeagueDetails from './pages/league/LeagueDetails';
import NewLeague from './pages/league/NewLeague';
import NotFound from './components/utility/404';

const AuthRoute = ({ children, noAuth }) => {
  const { currentUser } = React.useContext(AuthContext);
  const redirectTo = !!noAuth ? "/" : "/login";
  return (!!noAuth !== !!currentUser) ? children : <Navigate to={redirectTo} replace />;
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <FlashProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<App />}>
                <Route index element={<AuthRoute><Home /></AuthRoute>} />
                <Route path="leagues" element={<AuthRoute><Leagues /></AuthRoute>} />
                <Route path="leagues/new" element={<AuthRoute><NewLeague /></AuthRoute>} />
                <Route path="leagues/:id" element={<AuthRoute><LeagueDetails /></AuthRoute>} />
                <Route path="login" element={<AuthRoute noAuth><Login /></AuthRoute>} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </FlashProvider>
    </ThemeProvider>
  </React.StrictMode>
);

// info: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
