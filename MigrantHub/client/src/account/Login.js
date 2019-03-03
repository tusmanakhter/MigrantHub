import React, { Component } from 'react';
import PropTypes from 'prop-types';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { GoogleLogin } from 'react-google-login';
import validator from 'validator';
import loginPageStyle from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx";
import classNames from "classnames";
import axios from 'axios';
import { AuthConsumer } from 'routes/AuthContext';
import { TextField } from '@material-ui/core';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { toast } from 'react-toastify';

const qs = require('qs');


class BaseLogin extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
      showPassword: false,
      email: '',
      password: '',
      emailError: '',
      passwordError: '',
    };
  }

  componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    this.timeOutFunction = setTimeout(
      function () {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      700
    );
  }

  componentWillUnmount() {
    clearTimeout(this.timeOutFunction);
    this.timeOutFunction = null;
  }

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleCheckForEnter = (event) => {
    if (event.key === 'Enter') {
      this.handleSubmit();
    }
  }

  handleSubmit = () => {
    const error = this.validate();
    if (!error) {
      this.sendLogin(this);
    }
  };

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
      }).catch((error) => {
        toast.error('Incorrect email or password.');
        this.setState({
          password: '',
        });
      });
  }

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

    forgotPassword = () => {
      this.setState({
        redirectTo: true,
        redirectToURL: '/forgotpassword',
      });
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

  render() {
    const { email, password, emailError, passwordError } = this.state;

    const { classes } = this.props;

    return (
      <React.Fragment>
        <div className={classes.login}>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={6} md={4}>
                <form className={classes.form}>
                  <Card login className={classes[this.state.cardAnimaton]}>
                    <CardBody>
                      <CardHeader
                        className={`${classes.cardHeader} ${classes.textCenter}`}
                        color="warning"
                      >
                        <h4 className={classes.cardTitle}>
                          <FormattedMessage id="login" />
                        </h4>
                        <h6 className={classes.cardTitle}>
                          <b>
                            <FormattedMessage id="login.social" />
                          </b>
                        </h6>
                        <div className={classes.socialLine}>
                          <FacebookLogin
                            appId={process.env.REACT_APP_FACEBOOK_APP_ID}
                            autoLoad={false}
                            fields="name, email"
                            callback={this.facebookAuthenticationLogin}
                            render={renderProps => (
                              <Button onClick={renderProps.onClick}
                                justIcon
                                color="transparent">
                                <Icon className={classNames(classes.icon, "fab fa-facebook-square")} />
                              </Button>
                            )}
                          />
                          <GoogleLogin
                            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                            buttonText="Login"
                            onSuccess={this.googleAuthenticationLogin}
                            onFailure={() => this.onLoginFailure}
                            render={renderProps => (
                              <Button onClick={renderProps.onClick}
                                justIcon
                                color="transparent">
                                <Icon className={classNames(classes.icon, "fab fa-google-plus")} />
                              </Button>
                            )}
                          />
                        </div>
                      </CardHeader>
                      <h6>
                        <font color="gray"><br />
                          <FormattedMessage id="login.already" />
                        </font>
                      </h6>
                      <TextField
                        id="email"
                        name="email"
                        label={<FormattedMessage id="email" />}
                        value={email}
                        onChange={event => this.handleChange(event)}
                        fullWidth
                        helperText={emailError}
                        error={emailError.length > 0}
                      />
                      <TextField
                        id="password"
                        name="password"
                        type="password"
                        label={<FormattedMessage id="password" />}
                        value={password}
                        onChange={event => this.handleChange(event)}
                        fullWidth
                        helperText={passwordError}
                        error={passwordError.length > 0}
                        onKeyPress={event => this.handleCheckForEnter(event)}
                      />
                    </CardBody>
                    <CardFooter className={classes.justifyContentCenter}>
                      <Button color="warning" simple size="lg" block
                        fullWidth
                        variant="contained"
                        onClick={this.handleSubmit}
                        className={classes.submit}
                      >
                        <FormattedMessage id="login" />
                      </Button>
                    </CardFooter>
                    <Button
                      variant="outlined"
                      className={classes.button}
                      onClick={this.forgotPassword}>
                      <FormattedMessage id="login.forgot" />
                    </Button>
                  </Card>
                </form>
              </GridItem>
            </GridContainer>
          </div>
        </div >
      </React.Fragment>
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

export default withStyles(loginPageStyle)(injectIntl(Login));
