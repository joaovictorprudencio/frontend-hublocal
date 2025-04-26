import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0385FD',
    },
    secondary: {
      main: '#00CC99',
    },
    error: {
      main: '#C90808',
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
});

export default theme;