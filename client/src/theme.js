import { createTheme, responsiveFontSizes } from '@mui/material/styles';

let theme = createTheme({
  breakpoints: {
    keys: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
    values: {
      xs: 0,
      sm: 480,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1440,
    },
  },
  typography: {
    fontFamily: 'Roboto, Archivo, Arial, sans-serif',
    h1: {
      fontFamily: 'Roboto, Arial, sans-serif',
    },
    h2: {
      fontFamily: 'Roboto, Arial, sans-serif',
    },
    h3: {
      fontFamily: 'Roboto, Arial, sans-serif',
    },
    h4: {
      fontFamily: 'Roboto, Arial, sans-serif',
    },
    h5: {
      fontFamily: 'Roboto, Arial, sans-serif',
    },
    h6: {
      fontFamily: 'Roboto, Arial, sans-serif',
    },
    body1: {
      fontFamily: 'Archivo, Arial, sans-serif',
    },
    body2: {
      fontFamily: 'Archivo, Arial, sans-serif',
    },
    subtitle1: {
      fontFamily: 'Roboto, Arial, sans-serif',
    },
    subtitle2: {
      fontFamily: 'Roboto, Arial, sans-serif',
    },
    button: {
      fontFamily: 'Archivo, Arial, sans-serif',
    },
    caption: {
      fontFamily: 'Archivo, Arial, sans-serif',
    },
    overline: {
      fontFamily: 'Archivo, Arial, sans-serif',
    },
  },
});

let lightTheme = createTheme({
  ...theme,
  palette: {
    type: 'light',
    mode: 'light',
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
  ...theme,
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
