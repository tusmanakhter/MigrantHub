import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import SignUpMigrant from 'account/personal/SignUpMigrant';
import SignUpBusiness from 'account/business/SignUpBusiness';
import SignUpAdmin from 'account/admin/SignUpAdmin';
import Main from 'home/Main';
import BusinessMain from 'home/BusinessMain';
import Error from 'components/Error';
import Home from 'home/HomePage';
import Login from 'account/Login';
import TempError from 'account/TempError';
import TempHome from 'account/TempHome';
import EditMigrant from 'account/personal/EditMigrant';
import EditBusiness from 'account/business/EditBusiness';
import AdminDashboard from 'admin/AdminDashboard';
import ProtectedRoute from 'routes/ProtectedRoute';
import UnprotectedRoute from 'routes/UnprotectedRoute';
import ServiceForm from 'services/ServiceForm';
import ServiceList from 'services/ServiceList';
import Search from 'search/Search';
import EventList from 'events/EventList';
import EventForm from 'events/EventForm';
import ServiceShare from 'services/ServiceShare';
import ViewMigrantProfile from 'account/personal/ViewMigrantProfile';
import ViewBusinessProfile from 'account/business/ViewBusinessProfile';
import { AuthConsumer } from 'routes/AuthContext';
import UsersList from 'People/UsersList';
import FriendPanel from 'components/FriendPanel/FriendPanel';
import AccountSelection from 'account/AccountSelection';
import ServiceSuggestionForm from 'services/ServiceSuggestionForm';
import ServiceSuggestionList from 'services/ServiceSuggestionList';

class Routes extends Component {
  state = {
    isLoading: true,
  }

  async componentDidMount() {
    const Auth = this.context;
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
        <ProtectedRoute path="/main" component={Main} migrant exact />
        <ProtectedRoute path="/businessmain" component={BusinessMain} business exact />
        <UnprotectedRoute path="/signup/account-selection" component={AccountSelection} exact />
        <UnprotectedRoute path="/signup/business" component={SignUpBusiness} exact />
        <UnprotectedRoute path="/signup/personal" component={SignUpMigrant} exact />
        <UnprotectedRoute path="/signup/admin" component={SignUpAdmin} exact />
        <UnprotectedRoute path="/login" component={Login} exact />
        <Route path="/temphome" component={TempHome} exact />
        <Route path="/temperror" component={TempError} exact />
        <ProtectedRoute path="/editmigrant" component={EditMigrant} migrant exact />
        <ProtectedRoute path="/editbusiness" component={EditBusiness} business exact />
        <ProtectedRoute path="/admin/dashboard" component={AdminDashboard} admin />
        <ProtectedRoute path="/services/create" component={ServiceForm} exact />
        <ProtectedRoute path="/services/suggestions/create" component={ServiceSuggestionForm} migrant exact />
        <ProtectedRoute path="/services/suggestions" component={ServiceSuggestionList} business admin exact />
        <ProtectedRoute path="/services" component={ServiceList} exact />
        <ProtectedRoute path="/services/share/:id" component={props => <ServiceShare serviceId={props.match.params.id} />} />
        <ProtectedRoute path="/search" component={Search} exact />
        <ProtectedRoute path="/events/create" component={EventForm} exact />
        <ProtectedRoute path="/events" component={EventList} exact />
        <ProtectedRoute path="/users" component={UsersList} exact />
        <ProtectedRoute path="/migrant/profile" component={ViewMigrantProfile} exact />
        <ProtectedRoute path="/business/profile" component={ViewBusinessProfile} exact />
        <ProtectedRoute path="/friends" component={FriendPanel} exact />
        <Route component={Error} />
      </Switch>
    );
  }
}

Routes.contextType = AuthConsumer;

export default Routes;
