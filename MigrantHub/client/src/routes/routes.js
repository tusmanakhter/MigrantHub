import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SignUpMigrant from '../account/personal/SignUpMigrant';
import SignUpBusiness from '../account/business/SignUpBusiness';
import SignUpAdmin from '../account/admin/SignUpAdmin';
import Main from '../home/Main';
import Error from '../components/Error';
import Home from '../home/HomePage';
import Login from '../account/Login';
import TempError from '../account/TempError';
import TempHome from '../account/TempHome';
import CreateEvent from '../events/CreateEvent';

export const Routes = () => (
  <Switch>
    <Route path="/" component={Home} exact />
    <Route path="/main" component={Main} exact />
    <Route path="/signup/business" component={SignUpBusiness} exact />
    <Route path="/signup/user" component={SignUpMigrant} exact />
    <Route path="/signup/admin" component={SignUpAdmin} exact />
    <Route path="/login" component={Login} exact />
    <Route path="/temphome" component={TempHome} exact />
    <Route path="/temperror" component={TempError} exact />
    <Route path="/createevent" component={CreateEvent} exact />
    <Route component={Error} />
  </Switch>
);

export default Routes;