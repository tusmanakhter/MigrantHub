import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Button from 'components/CustomButtons/Button.jsx';
import axios from 'axios';
import { AuthConsumer } from 'routes/AuthContext';
import { FormattedMessage } from 'react-intl';

class Logout extends Component {
  logout = () => {
    const Auth = this.context;
    axios.post('/api/accounts/logout').then(async (response) => {
      if (response.status === 200) {
        await Auth.unauthenticate();
        const { history } = this.props;
        history.push('/');
      }
    });
  };

  render() {
    this.logout();
    return null;
  }
}
Logout.propTypes = {
  history: PropTypes.shape({}).isRequired,
};

export default withRouter(Logout);

Logout.contextType = AuthConsumer;
