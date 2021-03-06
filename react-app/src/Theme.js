import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#243B5E',
    },
    secondary: {
      main: '#FFE031',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: 'rgb(66,175,255)',
    },
  },
});

export default theme;
