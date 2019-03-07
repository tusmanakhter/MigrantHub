import React from 'react';
import Routes from 'routes/Routes';
import { BrowserRouter } from 'react-router-dom';
import { IntlProvider } from 'locales/IntlContext';
import { AuthProvider } from 'routes/AuthContext';
import { CookiesProvider } from 'react-cookie';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from 'Theme';

import 'font-awesome/css/font-awesome.min.css';
import 'assets/scss/material-dashboard-pro-react.scss';
import 'react-toastify/dist/ReactToastify.css';


require('dotenv').config();

const App = () => (
  <CookiesProvider>
    <IntlProvider>
      <AuthProvider>
        <BrowserRouter>
          <MuiThemeProvider theme={theme}>
            <div className="App">
              <Routes />
            </div>
          </MuiThemeProvider>
        </BrowserRouter>
      </AuthProvider>
    </IntlProvider>
  </CookiesProvider>
);

export default App;
