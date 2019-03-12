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
      light: '#51598c',
      main: '#24305e',
      dark: '#000734',
    },
    secondary: {
      light: '#ff9e9a',
      main: '#f76c6c',
      dark: '#bf3a41',
    },
    third: {
      light: '#daffff',
      main: '#a8d0e6',
      dark: '#789fb4',
    },
    fourth: {
      light: '#ffffd3',
      main: '#f8e9a1',
      dark: '#c4b772',
    },
    fifth: {
      light: '#6772b5',
      main: '#374785',
      dark: '#002058',
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
    contrastThreshold: 0.1,
  },
});

export default theme;
