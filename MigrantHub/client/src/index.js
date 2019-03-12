import 'react-app-polyfill/ie9'; // For IE 9-11 support
import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from 'registerServiceWorker';
import App from 'App';
import 'index.css';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
