import React, { Component } from 'react';
import PropTypes from 'prop-types';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import Face from "@material-ui/icons/Face";
import Email from "@material-ui/icons/Email";

// core components
import HomeLayout from 'home/HomeLayout';
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Input from '@material-ui/core/Input';
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';

import loginPageStyle from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx";
import "assets/jss/material-dashboard-pro-react/views/loginPage.css";
import classNames from "classnames";
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Auth from 'routes/Auth';
import UserTypes from 'lib/UserTypes';
import { TextField } from '@material-ui/core';
const qs = require('qs');


class Login extends React.Component {
  state = {
    showPassword: false,
    redirectTo: false,
    redirectToURL: '',

  }
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden"
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

  handleSubmit = () => {
    this.sendLogin(this);
  };

  // Send profile data in post body to add to mongodb
  sendLogin(e) {
    axios.post('/api/accounts/login',
      qs.stringify({
        username: e.state.username,
        password: e.state.password,
      })).then(async (response) => {
        if (response.status === 200) {
          await Auth.authenticate();
          if (response.data.type === UserTypes.ADMIN) {
            this.setState({
              redirectTo: true,
              redirectToURL: '/admin/dashboard',
            });
          } else if (response.data.type === UserTypes.MIGRANT) {
            this.setState({
              redirectTo: true,
              redirectToURL: '/main',
            });
          } else if (response.data.type === UserTypes.BUSINESS) {
            this.setState({
              redirectTo: true,
              redirectToURL: '/businessmain',
            });
          }
        }
      }).catch((error) => {
        this.setState({
          redirectTo: true,
          redirectToURL: '/TempError',
        });
      });
  }

  // Send profile data in post body to add to mongodb /api/accounts/auth/facebook
  facebookAuthenticationLogin = (reply) => {
    axios.post('/api/accounts/auth/facebook',
      qs.stringify({
        access_token: reply.accessToken,
      })).then(async (response) => {
        if (response.status === 200) {
          await Auth.authenticate();
          if (response.data.type === UserTypes.MIGRANT) {
            this.setState({
              redirectTo: true,
              redirectToURL: '/main',
            });
          }
        }
      }).catch((error) => {
        this.setState({
          redirectTo: true,
          redirectToURL: '/TempError',
        });
      });
  };

  // Send profile data in post body to add to mongodb /api/accounts/auth/facebook
  googleAuthenticationLogin = (reply) => {
    axios.post('/api/accounts/auth/google',
      qs.stringify({
        access_token: reply.accessToken,
      })).then(async (response) => {
        if (response.status === 200) {
          await Auth.authenticate();
          if (response.data.type === UserTypes.MIGRANT) {
            this.setState({
              redirectTo: true,
              redirectToURL: '/main',
            });
          }
        }
      }).catch(() => {
        this.setState({
          redirectTo: true,
          redirectToURL: '/TempError',
        });
      });
  };

  onLoginFailure = () => {
    this.setState({
      redirectTo: true,
      redirectToURL: '/TempError',
    });
  };

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={this.state.redirectToURL} />;
    }
    const { classes } = this.props;

    const username = this.props.username;
    const password = this.props.password;

    return (
      <React.Fragment>
        <HomeLayout>
          <div className="login">
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
                          <h4 className={classes.cardTitle}>Log in</h4>
                          <div className={classes.socialLine}>
                            <Button
                              color="transparent"
                              justIcon
                              appId={process.env.REACT_APP_FACEBOOK_APP_ID}
                              autoLoad={false}
                              fields="name, email"
                              callback={this.facebookAuthenticationLogin}
                            >
                              <Icon className={classNames(classes.icon, "fab fa-facebook-square")} />
                            </Button>
                            <Button
                              color="transparent"
                              justIcon
                              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                              buttonText="Google Login"
                              onSuccess={this.googleAuthenticationLogin}
                              onFailure={() => this.onLoginFailure}
                            >
                              <Icon className={classNames(classes.icon, "fab fa-google-plus")} />
                            </Button>
                          </div>
                        </CardHeader>
                        <TextField
                          id="username"
                          name="username"
                          label="Email"
                          value={username}
                          onChange={event => this.handleChange(event)}
                          fullWidth
                        />
                        <TextField
                          id="password"
                          name="password"
                          type="password"
                          label="Password"
                          value={password}
                          onChange={event => this.handleChange(event)}
                          fullWidth
                        />
                      </CardBody>
                      <CardFooter className={classes.justifyContentCenter}>
                        <Button color="warning" simple size="lg" block
                          fullWidth
                          variant="contained"
                          onClick={this.handleSubmit}
                          className={classes.submit}>
                          Sign in
                        </Button>
                      </CardFooter>
                      <Button variant="outlined" className={classes.button}>Forgot Password?</Button>
                    </Card>
                  </form>
                </GridItem>
              </GridContainer>
            </div>
          </div >
        </HomeLayout>
      </React.Fragment>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(loginPageStyle)(Login);