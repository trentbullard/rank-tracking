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
    mode: 'dark',
    primary: {
      main: '#64b4f6',
    },
    secondary: {
      main: '#f6a664',
    },
  },
});

lightTheme = responsiveFontSizes(lightTheme);
darkTheme = responsiveFontSizes(darkTheme);

export { lightTheme, darkTheme };
