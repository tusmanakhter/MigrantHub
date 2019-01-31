import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import AppLayout from 'app/AppLayout';
import withStyles from '@material-ui/core/styles/withStyles';
import AdminMain from 'admin/AdminMain';
import CurrentAdmins from 'admin/CurrentAdmins';
import RejectedAdmins from 'admin/RejectedAdmins';
import DeletedAdmins from 'admin/DeletedAdmins';
import UnapprovedAdmins from 'admin/UnapprovedAdmins';

const styles = {};

class AdminDashboard extends Component {
  render() {
    const { match } = this.props;

    return (
      <React.Fragment>
        <Route path={`${match.url}/`} component={AdminMain} exact />
        <Route path={`${match.url}/admins`} component={CurrentAdmins} exact />
        <Route path={`${match.url}/admins/deleted`} component={DeletedAdmins} exact />
        <Route path={`${match.url}/admins/rejected`} component={RejectedAdmins} exact />
        <Route path={`${match.url}/admins/unapproved`} component={UnapprovedAdmins} exact />
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(AdminDashboard);
