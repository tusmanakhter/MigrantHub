import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
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
    return (
      <React.Fragment>
        <Button color="" onClick={this.logout}>
          <FormattedMessage id="logout" />
        </Button>
      </React.Fragment>
    );
  }
}
Logout.propTypes = {
  history: PropTypes.shape({}).isRequired,
};

Logout.contextType = AuthConsumer;

export default withRouter(Logout);
