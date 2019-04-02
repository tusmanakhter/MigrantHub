import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import GoogleLogin from 'react-google-login';
import axios from 'axios';
import { AuthConsumer } from 'routes/AuthContext';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { toast } from 'react-toastify';

const qs = require('qs');

const style = {
  googleBtn: {
    fontWeight: 500,
    fontSize: 'inherit !important',
    width: '100%',
    height: 46,
    padding: 11,
    borderRadius: '4px !important',
    background: '#db3236 !important',
    color: 'white !important',
    border: '0px transparent !important',
    textAlign: 'center',
    display: 'inline-block !important',
    '&:hover': {
      background: '#C52D30 !important',
      opacity: '1 !important',
    },
  },
};

class BaseGoogleButton extends Component {
  googleAuthenticationLogin = (reply) => {
    const { context } = this.props;
    const Auth = context;
    axios.post('/api/accounts/auth/google',
      qs.stringify({
        access_token: reply.accessToken,
      })).then(async (response) => {
      if (response.status === 200) {
        await Auth.authenticate();
      }
    }).catch(() => {
      toast.error('Incorrect Google login.');
    });
  };

  onLoginFailure = () => {
    toast.error('Incorrect Google login.');
  };

  render() {
    const { classes, text } = this.props;

    return (
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        buttonText={text}
        onSuccess={this.googleAuthenticationLogin}
        onFailure={() => this.onLoginFailure}
        className={classes.googleBtn}
        icon={false}
      >
        <i className="fa fa-google" style={{ marginRight: '5px' }} />
        <span>{text}</span>
      </GoogleLogin>
    );
  }
}

BaseGoogleButton.propTypes = {
  classes: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
  context: PropTypes.shape({}).isRequired,
};

const GoogleButton = props => (
  <AuthConsumer>
    {context => <BaseGoogleButton context={context} {...props} />}
  </AuthConsumer>
);

export default withStyles(style)(GoogleButton);
