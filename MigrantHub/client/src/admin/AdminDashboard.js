import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import AdminMain from 'admin/AdminMain';

const styles = {};

class AdminDashboard extends Component {
  render() {
    const { match } = this.props;

    return (
      <React.Fragment>
        <Route path={`${match.url}/`} component={AdminMain} exact />
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(AdminDashboard);
