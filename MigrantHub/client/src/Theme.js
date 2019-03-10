import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    common: {
      black: '#000',
      white: '#fff',
    },
    background: {
      paper: '#fff',
      default: '#fafafa',
    },
    surface: {
      main: '#fff',
    },
    primary: {
      light: '#617dff',
      main: '#0251d6',
      dark: '#002aa3',
    },
    secondary: {
      light: '#ffab89',
      main: '#fa7a5b',
      dark: '#c24a30',
    },
    error: {
      light: '#e57373',
      main: '#f44336',
      dark: '#d32f2f',
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.54)',
      disabled: 'rgba(0, 0, 0, 0.38)',
      hint: 'rgba(0, 0, 0, 0.38)',
    },
    borders: {
      main: '#bcbcbc',
    },
  },
});

export default theme;
