import React from 'react';
import { Route, Switch } from 'react-router-dom';
import App from '../App';
import Login from '../account/Login';
import TempHome from '../account/TempHome';
import TempError from '../account/TempError';
import CreateEvent from '../events/CreateEvent';

export const Routes = () => (
  <Switch>
    <Route exact path='/' component={App} />
    <Route exact path='/signin' component={Login} />
    <Route exact path='/TempHome' component={TempHome} />
    <Route exact path='/TempError' component={TempError} />
    <Route exact path='/CreateEvent' component={CreateEvent} />
  </Switch>
);
export default Routes;