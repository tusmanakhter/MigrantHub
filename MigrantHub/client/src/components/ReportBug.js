import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Button from 'components/CustomButtons/Button.jsx';
import axios from 'axios';
import { AuthConsumer } from 'routes/AuthContext';
import { FormattedMessage } from 'react-intl';

class ReportBug extends Component {
  reportBug = () => {
    const Auth = this.context;
    // axios.post('/api/accounts/logout').then(async (response) => {
    //   if (response.status === 200) {
    //     await Auth.unauthenticate();
    //     const { history } = this.props;
    //     history.push('/');
    //   }
    // });
  };

  render() {
    return (
      <React.Fragment>
        <Button color="info" round size="sm" onClick={this.reportBug}>
          <FormattedMessage id="report.bug" />
        </Button>
      </React.Fragment>
    );
  }
}
ReportBug.propTypes = {
  history: PropTypes.shape({}).isRequired,
};

export default withRouter(ReportBug);

ReportBug.contextType = AuthConsumer;
