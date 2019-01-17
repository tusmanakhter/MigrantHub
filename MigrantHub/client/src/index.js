import 'react-app-polyfill/ie9'; // For IE 9-11 support
import 'react-app-polyfill/ie11'; // For IE 11 support
import React from 'react';
import ReactDOM from 'react-dom';
import 'index.css';
import { BrowserRouter } from 'react-router-dom';
import registerServiceWorker from 'registerServiceWorker';
import App from 'App';
import { IntlProvider } from 'locales/IntlContext';

import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

require('dotenv').config();

ReactDOM.render(
  <IntlProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </IntlProvider>,
  document.getElementById('root'),
);
registerServiceWorker();
