import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route } from 'react-router-dom'
import Routes from './routes/routes'

ReactDOM.render(
    <BrowserRouter>
        <Routes />
    </BrowserRouter>, document.getElementById('root')
);
registerServiceWorker();
