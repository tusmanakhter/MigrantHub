import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';
import { AuthConsumer } from 'routes/AuthContext';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { toast } from 'react-toastify';

const qs = require('qs');

const style = {
  facebookBtn: {
    fontWeight: 500,
    fontSize: 'inherit',
    width: '100%',
    height: 46,
    padding: 11,
    borderRadius: 4,
    background: '#3b5998',
    color: 'white',
    border: '0px transparent',
    textAlign: 'center',
    display: 'inline-block',
    '&:hover': {
      background: '#355088',
      cursor: 'pointer',
    },
    fontFamily: 'inherit',
  },
};

class BaseFacebookButton extends Component {
  facebookAuthenticationLogin = (reply) => {
    const { context } = this.props;
    const Auth = context;
    axios.post('/api/accounts/auth/facebook',
      qs.stringify({
        access_token: reply.accessToken,
      })).then(async (response) => {
      if (response.status === 200) {
        await Auth.authenticate();
      }
    }).catch(() => {
      toast.error('Incorrect Facebook login.');
    });
  };

  render() {
    const { classes, text } = this.props;

    return (
      <FacebookLogin
        appId={process.env.REACT_APP_FACEBOOK_APP_ID}
        autoLoad={false}
        fields="name, email"
        textButton={text}
        callback={this.facebookAuthenticationLogin}
        cssClass={classes.facebookBtn}
        icon={<i className="fa fa-facebook" style={{ marginRight: '5px' }} />}
      />
    );
  }
}

BaseFacebookButton.propTypes = {
  classes: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
  context: PropTypes.shape({}).isRequired,
};

const FacebookButton = props => (
  <AuthConsumer>
    {context => <BaseFacebookButton context={context} {...props} />}
  </AuthConsumer>
);

export default withStyles(style)(FacebookButton);
