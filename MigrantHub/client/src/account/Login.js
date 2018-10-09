import React, { Component } from "react";
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Redirect } from 'react-router-dom'

import Button from '@material-ui/core/Button';
import axios from 'axios';
var qs = require('qs');

const styles = theme => ({});

class Login extends Component {

    constructor() {
        super()
    }

    state = {
        showPassword: false,
        loggedIn: false,
        username: null,
        password: null,
        redirectTo: false,
        redirectToURL: ''

    }

    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
    };

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = () => {
        this.sendLogin(this);
    };
    // Send profile data in post body to add to mongodb
    sendLogin(e) {

        axios.post('/logintemp',
            qs.stringify({
                username: e.state.username,
                password: e.state.password,
            }))            .then(response => {
            console.log('login response: ')
            console.log(response)
            if (response.status === 200) {
                // update App.js state

                this.setState({
                    redirectTo: true,
                    redirectToURL: '/TempHome'
                })
            }
        }).catch(error => {
            console.log('login error: ')
            console.log(error);
            this.setState({
                redirectTo: true,
                redirectToURL: '/TempError'
            })                  
        })
    }

    render() {

        if (this.state.redirectTo) {
            return <Redirect to={this.state.redirectToURL} />
        }
        const { classes } = this.props;

        const username = this.props.username;
        const password = this.props.password;
        
        return (
            <React.Fragment>
                <Typography variant="title" gutterBottom>
                    Account Information
                </Typography>
                <Grid container spacing={24}>
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
                    <Grid item xs={12} sm={6}>
                        <FormControl margin="normal" fullWidth>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input
                                name="password"
                                type={this.state.showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={event => this.handleChange(event)}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="Toggle password visibility"
                                            onClick={this.handleClickShowPassword}
                                        >
                                            {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </Grid>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleSubmit}
                        className={classes.button}
                    >                 Log-In
                    </Button>
                </Grid>
</React.Fragment>
        )
    }
} 

Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);