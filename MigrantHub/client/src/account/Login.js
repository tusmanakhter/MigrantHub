import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';
import validator from 'validator';
import axios from 'axios';
import { AuthConsumer } from 'routes/AuthContext';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { toast } from 'react-toastify';
import Button from '@material-ui/core/Button';
import TextBox from 'components/fields/generic/TextBox';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
import { Link as RouterLink } from 'react-router-dom';
import { handleChange } from 'helpers/Forms';
import { Close } from '@material-ui/icons';
import logo from 'assets/img/logo-1.png';

const qs = require('qs');

const styles = theme => ({
  layout: {
    flexGrow: 1,
    height: '100%',
    width: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: theme.palette.common.white,
  },
  content: {
    width: 288,
  },
  login: {
    height: '100%',
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.palette.white,
    backgroundSize: 'cover',
  },
  facebookBtn: {
    fontWeight: 500,
    fontSize: 14,
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
  googleBtn: {
    fontWeight: 500,
    fontSize: 14,
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
  textbox: {
    height: 24,
    padding: 11,
  },
  facebook: {
    marginBottom: 8,
    '& > span': {
      transition: 'unset !important',
    },
  },
  item: {
    marginBottom: 16,
  },
  dividerWithText: {
    marginTop: 16,
    marginBottom: 16,
    display: 'flex',
    alignItems: 'center',
  },
  divider: {
    flexShrink: 1,
    width: '100%',
    margin: 5,
  },
  dividerText: {
    margin: '0px 5px 0px 5px',
  },
  close: {
    position: 'fixed',
    top: 33,
    right: 33,
    color: 'inherit',
    '& a:hover': {
      color: 'black',
      transform: 'scale(1.1)',
    },
  },
  logo: {
    position: 'fixed',
    top: 33,
    left: 33,
  },
  loginBtn: {
    textTransform: 'unset',
  },
});
class BaseLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
      email: '',
      password: '',
      emailError: '',
      passwordError: '',
    };

    this.handleChange = handleChange.bind(this);
  }

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  handleSubmit = () => {
    const error = this.validate();
    if (!error) {
      this.sendLogin(this);
    }
  };

  // Send profile data in post body to add to mongodb /api/accounts/auth/facebook
  facebookAuthenticationLogin = (reply) => {
    const Auth = this.context;
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

  // Send profile data in post body to add to mongodb /api/accounts/auth/facebook
  googleAuthenticationLogin = (reply) => {
    const Auth = this.context;
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

  validate = () => {
    const { email, password } = this.state;
    const { intl } = this.props;

    let isError = false;
    const errors = {
      emailError: '',
      passwordError: '',
    };

    if (validator.isEmpty(email)) {
      errors.emailError = `${intl.formatMessage({ id: 'email' })}  ${intl.formatMessage({ id: 'isrequired' })}`;
      isError = true;
    } else if (!validator.isEmail(email)) {
      errors.emailError = `${intl.formatMessage({ id: 'email' })}  ${intl.formatMessage({ id: 'notvalid' })}`;
      isError = true;
    }

    if (validator.isEmpty(password)) {
      errors.passwordError = `${intl.formatMessage({ id: 'password' })}  ${intl.formatMessage({ id: 'isrequired' })}`;
      isError = true;
    }

    this.setState(prevState => ({
      ...prevState,
      ...errors,
    }));

    return isError;
  }

  // Send profile data in post body to add to mongodb
  sendLogin(e) {
    const { context } = this.props;
    const Auth = context;
    axios.post('/api/accounts/login',
      qs.stringify({
        username: e.state.email,
        password: e.state.password,
      })).then(async (response) => {
      if (response.status === 200) {
        await Auth.authenticate();
      }
    }).catch(() => {
      toast.error('Incorrect email or password.');
      this.setState({
        password: '',
      });
    });
  }

  render() {
    const {
      email, password, emailError, passwordError,
    } = this.state;

    const { classes, history } = this.props;

    return (
      <div className={classes.layout}>
        <div className={classes.logo}>
          <RouterLink to="/">
            <img src={logo} alt="Home" />
          </RouterLink>
        </div>
        <div className={classes.close}>
          <a role="button" onClick={() => history.goBack()} className={classes.close}>
            <Close fontSize="large" />
          </a>
        </div>
        <div className={classes.content}>
          <div className={classes.item}>
            <Typography variant="h5">Log in to MigrantHub</Typography>
          </div>
          <div className={classes.facebook}>
            <FacebookLogin
              appId={process.env.REACT_APP_FACEBOOK_APP_ID}
              autoLoad={false}
              fields="name, email"
              textButton="Log in with Facebook"
              callback={this.facebookAuthenticationLogin}
              cssClass={classes.facebookBtn}
              icon={<i className="fa fa-facebook" style={{ marginRight: '5px' }} />}
            />
          </div>
          <div className={classes.google}>
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              buttonText="Log in with Google"
              onSuccess={this.googleAuthenticationLogin}
              onFailure={() => this.onLoginFailure}
              className={classes.googleBtn}
              icon={false}
            >
              <i className="fa fa-google" style={{ marginRight: '5px' }} />
              <span>Log in with Google</span>
            </GoogleLogin>
          </div>
          <div className={classes.dividerWithText}>
            <Divider className={classes.divider} />
            <span className={classes.dividerText}>or</span>
            <Divider className={classes.divider} />
          </div>
          <form onSubmit={e => e.preventDefault()}>
            <div className={classes.item}>
              <TextBox
                name="email"
                label={<FormattedMessage id="email" />}
                value={email}
                handleChange={event => this.handleChange(event)}
                variant="outlined"
                error={emailError}
                inputClass={classes.textbox}
                margin="dense"
              />
            </div>
            <div className={classes.item}>
              <TextBox
                name="password"
                type="password"
                label={<FormattedMessage id="password" />}
                value={password}
                handleChange={event => this.handleChange(event)}
                variant="outlined"
                error={passwordError}
                inputClass={classes.textbox}
                margin="dense"
              />
            </div>
            <div className={classes.item}>
              <Button
                type="submit"
                color="secondary"
                fullWidth
                variant="contained"
                onClick={this.handleSubmit}
                className={classes.loginBtn}
              >
                <FormattedMessage id="login" />
              </Button>
            </div>
          </form>
          <div className={classes.item}>
            <Link
              component={RouterLink}
              to="/forgotpassword"
            >
              <FormattedMessage id="login.forgot" />
            </Link>
          </div>
          <div className={classes.item}>
            <Divider />
          </div>
          <Typography>Don't have an account? <Link component={RouterLink} to="/signup/account-selection">Sign up.</Link></Typography>
        </div>
      </div>
    );
  }
}

const Login = props => (
  <AuthConsumer>
    {context => <BaseLogin context={context} {...props} />}
  </AuthConsumer>
);

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  intl: intlShape.isRequired,
};

export default withStyles(styles)(injectIntl(Login));
