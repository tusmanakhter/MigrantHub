import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import AccountInfo from './BusinessAccountInfo';
import MerchantContactInfo from './MerchantContactInfo';
import MerchantAboutInfo from './MerchantAboutInfo';


const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 900,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3,
    },
  },
  stepper: {
    padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit,
  },
});

const steps = ['Account', 'Contact', 'About'];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <AccountInfo />;
    case 1:
      return <MerchantContactInfo />;
    case 2:
      return <MerchantAboutInfo />;
    default:
      throw new Error('Unknown step');
  }
}

class SignUpMerchant extends Component {
  state = {
    activeStep: 0
  }

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  render() {
    const { classes } = this.props;
    const { activeStep } = this.state;

    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar position="absolute" color="default" className={classes.appBar}>
          <Toolbar>
            <Typography variant="title" color="inherit" noWrap>
              MigrantHub
          </Typography>
          </Toolbar>
        </AppBar>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography variant="display1" align="center">
              Business Account Sign Up
            </Typography>
            <p>This account allows for organizations to provide their services to all newcomers.</p>
            <Stepper activeStep={activeStep} className={classes.stepper}>
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <React.Fragment>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography variant="headline" gutterBottom>
                    Thank you for your order.
                </Typography>
                  <Typography variant="subheading">
                    Your account has been created! We will redirect you shortly.
                </Typography>
                </React.Fragment>
              ) : (
                  <React.Fragment>
                    {getStepContent(activeStep)}
                    <div className={classes.buttons}>
                      {activeStep !== 0 && (
                        <Button onClick={this.handleBack} className={classes.button}>
                          Back
                    </Button>
                      )}
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleNext}
                        className={classes.button}
                      >
                        {activeStep === steps.length - 1 ? 'Sign Up' : 'Next'}
                      </Button>
                    </div>
                  </React.Fragment>
                )}
            </React.Fragment>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

SignUpMerchant.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignUpMerchant);