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
import NewGameProvider from './contexts/NewGameContext';
import App from "./components/App";
import Home from './pages/Home';
import Leagues from './pages/league/Leagues';
import Login from './pages/Login';
import Signup from './pages/Signup';
import LeagueDetails from './pages/league/LeagueDetails';
import NewLeague from './pages/league/NewLeague';
import NewGame from './pages/game/NewGame';
import NotFound from './components/utility/404';
import { isTrue } from './helpers/boolean';

const AuthComponent = ({ element, noAuth }) => {
  const { session } = React.useContext(AuthContext);
  const redirectTo = isTrue(noAuth) ? "/" : "/login";
  return (isTrue(noAuth) !== isTrue(session)) ? element : <Navigate to={redirectTo} replace />;
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
                <Route index element={<AuthComponent element={<Home />} />} />
                <Route path="leagues" element={<AuthComponent element={<Leagues />} />} />
                <Route path="leagues/new" element={<AuthComponent element={<NewLeague />} />} />
                <Route path="leagues/:id" element={<AuthComponent element={<LeagueDetails />} />} />
                <Route path="games/new" element={<AuthComponent element={<NewGameProvider><NewGame /></NewGameProvider>} />} />
                <Route path="login" element={<AuthComponent element={<Login />} noAuth />} />
                <Route path="signup" element={<AuthComponent element={<Signup />} noAuth />} />
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
