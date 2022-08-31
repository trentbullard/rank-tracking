import * as React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

import App from "./components/App";
import { darkTheme as theme } from "./theme";
import AuthProvider from './contexts/AuthContext';
import Home from './pages/Home';
import Leagues from './pages/Leagues';
import Login from './pages/Login';
import LeagueDetails from './pages/league/LeagueDetails';
import NewLeague from './pages/league/NewLeague';
import NotFound from './components/utility/404';

// const RequireAuth = ({ children }) => {
//   return !!currentUser ? children : <Navigate to="/login" replace />;
// };

// const RequireNoAuth = ({ children }) => {
//   return !currentUser ? children : <Navigate to="/" replace />;
// };

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<Home />} />
              <Route path="leagues" element={<Leagues />}>
                <Route path="new" element={<NewLeague />} />
                <Route path=":id" element={<LeagueDetails />} />
              </Route>
              <Route path="login" element={<Login />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);

// info: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
