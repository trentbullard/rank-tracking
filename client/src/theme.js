import { createTheme, responsiveFontSizes } from '@mui/material/styles';

let lightTheme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#33334b',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#fafafa',
      paper: '#fff',
    },
  },
});

let darkTheme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#64b4f6',
    },
    secondary: {
      main: '#f6a664',
    },
    error: {
      main: '#fb5b49',
      light: '#fb7b6d',
      dark: '#af3f33',
    },
    background: {
      default: '#303030',
      paper: '#424242',
    },
    text: {
      primary: '#fff',
      secondary: 'rgba(255, 255, 255, 0.7)',
      disabled: 'rgba(255, 255, 255, 0.5)',
      hint: 'rgba(255, 255, 255, 0.5)',
    },
  },
});

lightTheme = responsiveFontSizes(lightTheme);
darkTheme = responsiveFontSizes(darkTheme);

export default darkTheme;
