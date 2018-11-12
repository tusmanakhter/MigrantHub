import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Auth from '../routes/Auth';

class Logout extends Component {
  logout = () => {
    axios.post('/api/accounts/logout').then((response) => {
      if (response.status === 200) {
        Auth.unauthenticate();
        const { history } = this.props;
        history.push('/');
      }
    });
  };

  render() {
    return (
      <React.Fragment>
        <Button variant="contained" color="primary" onClick={this.logout}>
          Logout
        </Button>
      </React.Fragment>
    );
  }
}
Logout.propTypes = {
  history: PropTypes.shape({}).isRequired,
};
export default withRouter(Logout);
