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
import ProtectedRoute from './ProtectedRoute';
import UnprotectedRoute from './UnprotectedRoute';
import ServiceForm from '../services/ServiceForm';
import ServiceList from '../services/ServiceList';
import EventList from '../events/EventList';
import EventForm from '../events/EventForm';
import ServiceShare from '../services/ServiceShare';
import ViewMigrantProfile from '../account/personal/ViewMigrantProfile';
import ViewBusinessProfile from '../account/business/ViewBusinessProfile';
import Auth from './Auth';
import UsersList from '../People/UsersList';
import ServiceCategories from '../services/ServiceCategories';

class Routes extends Component {
  state = {
    isLoading: true,
  }

  async componentDidMount() {
    await Auth.authenticate();
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
        <UnprotectedRoute path="/" component={Home} exact />
        <ProtectedRoute path="/main" component={Main} type="migrant" exact />
        <ProtectedRoute path="/businessmain" component={BusinessMain} type="business" exact />
        <UnprotectedRoute path="/signup/business" component={SignUpBusiness} exact />
        <UnprotectedRoute path="/signup/user" component={SignUpMigrant} exact />
        <UnprotectedRoute path="/signup/admin" component={SignUpAdmin} exact />
        <UnprotectedRoute path="/login" component={Login} exact />
        <Route path="/temphome" component={TempHome} exact />
        <Route path="/temperror" component={TempError} exact />
        <ProtectedRoute path="/editmigrant" component={EditMigrant} type="migrant" exact />
        <ProtectedRoute path="/editbusiness" component={EditBusiness} type="business" exact />
        <ProtectedRoute path="/admin/dashboard" component={AdminDashboard} type="admin" />
        <Route path="/services/create" component={ServiceForm} exact />
        <Route path="/services" component={ServiceList} exact />
        <Route path="/categories" component={ServiceCategories} exact />
        <Route path="/services/share/:id" render={(props) => <ServiceShare serviceId={props.match.params.id} />} />
        <Route path="/events/create" component={EventForm} exact />
        <Route path="/myservices" component={ServiceList} exact />
        <Route path="/events" component={EventList} exact />
        <Route path="/myevents" component={EventList} exact />
        <Route path="/users" component={UsersList} exact />
        <Route path="/migrant/profile" component={ViewMigrantProfile} exact />
        <Route path="/business/profile" component={ViewBusinessProfile} exact />
        <Route component={Error} />
      </Switch>
    );
  }
}

export default Routes;
