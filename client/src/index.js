import * as React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { darkTheme as theme } from "./theme";

import AuthProvider from './contexts/AuthContext';
import { AuthContext } from './contexts/AuthContext';
import FlashProvider from './contexts/FlashContext';
import NewGameProvider from './contexts/NewGameContext';
import App from "./components/App";
import Home from './pages/Home';
import Clubs from './pages/club/Clubs';
import NewClub from './pages/club/NewClub';
import Leagues from './pages/league/Leagues';
import Teams from './pages/team/Teams';
import Games from './pages/game/Games';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ClubDetails from './pages/club/ClubDetails';
import LeagueDetails from './pages/league/LeagueDetails';
import NewLeague from './pages/league/NewLeague';
import NewGame from './pages/game/NewGame';
import NotFound from './components/utility/404';
import { isTrue } from './helpers/boolean';
import { loadRuntimeConfig, getConfigValue } from './config/runtimeConfig';

const AuthComponent = ({ element, noAuth }) => {
  const { currentUser, isAuthReady } = React.useContext(AuthContext);
  if (!isAuthReady) return null;

  const isAuthenticated = isTrue(currentUser);
  const redirectTo = isTrue(noAuth) ? "/" : "/login";
  return (isTrue(noAuth) !== isAuthenticated) ? element : <Navigate to={redirectTo} replace />;
};

const OAuthWrapper = ({ children }) => {
  const googleClientId = getConfigValue('GOOGLE_CLIENT_ID');
  if (!googleClientId) {
    return children;
  };

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      {children}
    </GoogleOAuthProvider>
  );
};
  
const startApp = async () => {
  await loadRuntimeConfig();
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <OAuthWrapper>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <FlashProvider>
            <AuthProvider>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<App />}>
                    <Route index element={<AuthComponent element={<Home />} />} />
                    <Route path="clubs" element={<AuthComponent element={<Clubs />} />} />
                    <Route path="clubs/new" element={<AuthComponent element={<NewClub />} />} />
                    <Route path="clubs/:id" element={<AuthComponent element={<ClubDetails />} />} />
                    <Route path="leagues" element={<AuthComponent element={<Leagues />} />} />
                    <Route path="leagues/new" element={<AuthComponent element={<NewLeague />} />} />
                    <Route path="leagues/:id" element={<AuthComponent element={<LeagueDetails />} />} />
                    <Route path="teams" element={<AuthComponent element={<Teams />} />} />
                    <Route path="games" element={<AuthComponent element={<Games />} />} />
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
      </OAuthWrapper>
    </React.StrictMode>
  );
};

startApp();

// info: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
