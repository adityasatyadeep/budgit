// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Lato',
    h1: {
      fontFamily: 'Lato', // "Helvetica Neue"
      fontWeight: 'bold',
      fontSize: 30
    },
    body1: {
      fontFamily: 'Open Sans, sans-serif',
    },
  },
});

export default theme;
