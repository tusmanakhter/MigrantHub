import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import SignUpMigrant from '../account/personal/SignUpMigrant';
import SignUpBusiness from '../account/business/SignUpBusiness';
import SignUpAdmin from '../account/admin/SignUpAdmin';
import Main from '../home/Main';
import BusinessMain from '../home/BusinessMain';
import Error from '../components/Error';
import Home from '../home/HomePage';
import Login from '../account/Login';
import TempError from '../account/TempError';
import TempHome from '../account/TempHome';
import EditMigrant from '../account/personal/EditMigrant';
import EditBusiness from '../account/business/EditBusiness';
import AdminDashboard from '../admin/AdminDashboard';
import ProtectedRoute from './ProtectedRoutes';
import ServiceForm from '../services/ServiceForm';
import ServiceList from '../services/ServiceList';
import EventList from '../events/EventList';
import CreateEvent from '../events/CreateEvent';
import Auth from './Auth';
import FeatureAuthentication from '../toggle/FeatureAuthentication';

class Routes extends Component {
  state = {
    isLoading: true,
  }

  async componentDidMount() {
      await Auth.authenticate();
      await FeatureAuthentication.authenticateFeatures();

      this.setState({
      isLoading: false,
    });
  }

  render() {
    const { isLoading } = this.state;

    if (isLoading) {
      return <div />;
    }
    return (
      <Switch>
        <Route path="/" component={Home} exact />
        <ProtectedRoute path="/main" component={Main} type="migrant" exact />
        <ProtectedRoute path="/businessmain" component={BusinessMain} type="business" exact />
        <Route path="/signup/business" component={SignUpBusiness} exact />
        <Route path="/signup/user" component={SignUpMigrant} exact />
        <Route path="/signup/admin" component={SignUpAdmin} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/temphome" component={TempHome} exact />
        <Route path="/temperror" component={TempError} exact />
        <Route path="/editmigrant" component={EditMigrant} exact />
        <Route path="/editbusiness" component={EditBusiness} exact />
        <ProtectedRoute path="/admin/dashboard" component={AdminDashboard} type="admin" exact />
        <Route path="/services/create" component={ServiceForm} exact />
        <Route path="/services" component={ServiceList} exact />
        <Route path="/events/create" component={CreateEvent} exact />
        <Route path="/myservices" component={ServiceList} exact />
        <Route path="/events" component={EventList} exact />
        <Route component={Error} />
      </Switch>
    );
  }
}

export default Routes;
