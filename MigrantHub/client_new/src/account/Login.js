import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Redirect } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import LockIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import axios from 'axios';
import HomeLayout from '../home/HomeLayout';
import Auth from '../routes/Auth';
import FacebookLogin from 'react-facebook-login';
import UserTypes from '../lib/UserTypes';

const qs = require('qs');

const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block', // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class Login extends Component {
  state = {
    showPassword: false,
    redirectTo: false,
    redirectToURL: '',

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
                } else if(response.data.type === UserTypes.MIGRANT) {
                    this.setState({
                        redirectTo: true,
                        redirectToURL: '/main',
                    });
                } else if(response.data.type === UserTypes.BUSINESS) {
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
          <CssBaseline />
          <main className={classes.layout}>
            <Paper className={classes.paper}>
              <Typography component="h2" variant="display1">
                Sign in
              </Typography>
              <Avatar className={classes.avatar}>
                <LockIcon />
              </Avatar>
              <form className={classes.form}>
                <Grid container>
                  <Grid item xs={12}>
                    <TextField
                      id="username"
                      name="username"
                      label="Email"
                      value={username}
                      onChange={event => this.handleChange(event)}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl margin="normal" fullWidth>
                      <InputLabel htmlFor="password">Password</InputLabel>
                      <Input
                        name="password"
                        type={this.state.showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={event => this.handleChange(event)}
                        endAdornment={(
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="Toggle password visibility"
                              onClick={this.handleClickShowPassword}
                            >
                              {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
)}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={<Checkbox value="remember" color="primary" />}
                      label="Remember me"
                    />
                  </Grid>
                    <Grid item xs={12}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={this.handleSubmit}
                            className={classes.submit}>
                            Sign in
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <FacebookLogin
                            size="small"
                            appId={process.env.REACT_APP_FACEBOOK_APP_ID}
                            autoLoad={false}
                            fields="name, email"
                            callback={this.facebookAuthenticationLogin} />
                    </Grid>
                </Grid>
              </form>
            </Paper>
          </main>
        </HomeLayout>
      </React.Fragment>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(Login);
