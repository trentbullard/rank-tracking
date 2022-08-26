import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

import App from "./components/App";
import theme from "./theme";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

// info: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
