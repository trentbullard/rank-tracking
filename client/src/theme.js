import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import blue from '@mui/material/colors/blue';
import green from '@mui/material/colors/green';

let theme = createTheme({
  palette: {
    primary: {
      main: blue[600],
    },
    secondary: {
      main: green[500],
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
