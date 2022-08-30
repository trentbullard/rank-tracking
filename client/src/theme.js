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
});

let lightTheme = createTheme({
  ...theme,
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
console.log(darkTheme);

export { lightTheme, darkTheme };
