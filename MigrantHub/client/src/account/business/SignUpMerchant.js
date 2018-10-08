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

import AccountInfo from '../personal/AccountInfo';
import ContactInfo from '../personal/ContactInfo';
import AboutInfo from './AboutInfo';

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

class SignUpBusiness extends Component {
  constructor(props){
    super(props);
    this.child = React.createRef();
  }

  state = {
    activeStep: 0,

    // Account Info
    email: '',
    password: '',
    confirmPassword: '',

    // Contact Info
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    province: '',
    postalCode: '',
    phoneNumber: '',

    // About Info
    corpId: '',
    organizationName: '',
    orgType: '',
    department: '',
    serviceType: '',
    description: '',

  }

  getStepContent(step) {
    switch (step) {
      case 0:
        return <AccountInfo
                innerRef={this.child}
                handleChange={this.handleChange}
                email={this.state.email}
                password={this.state.password}
                confirmPassword={this.state.confirmPassword}
               />;
      case 1:
        return <ContactInfo
                innerRef={this.child}
                handleChange={this.handleChange}
                firstName={this.state.firstName}
                lastName={this.state.lastName}
                address={this.state.address}
                apartment={this.state.apartment}
                city={this.state.city}
                province={this.state.province}
                postalCode={this.state.postalCode}
                phoneNumber={this.state.phoneNumber}
               />;
      case 2:
        return <AboutInfo
                ref={this.child}
                handleChange={this.handleChange}
                age={this.state.age}
                gender={this.state.gender}
                organizationName={this.state.organizationName}
                orgType={this.state.orgType}
                department={this.state.department}
                serviceType={this.state.serviceType}
                description={this.state.description}
               />;
      default:
        throw new Error('Unknown step');
    }
  }

  handleNext = () => {
    let error = this.validate();
    if (!error) {
      this.setState(state => ({
        activeStep: state.activeStep + 1,
      }));
    }
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

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleAutoSuggestChange = name => (event, { newValue }) => {
    this.setState({
      [name]: newValue,
    });
  };

  handleAddObject = (name, object) => {
    this.setState({
      [name]: this.state[name].concat([object]),
    });
  }

  handleRemoveObject = (name, index) => {
    this.setState({
      [name]: this.state[name].filter((s, _index) => _index !== index),
    });
  }

  handleEditObjectAutosuggest = (name, fieldName, index) => (event, { newValue }) => {
    this.setState({
      [name]: this.state[name].map((s, _index) => {
        if (_index !== index) return s;
        return { ...s, [fieldName]: newValue };
      }),
    });
  }

  handleEditObject = (name, index) => (event) => {
    this.setState({
      [name]: this.state[name].map((s, _index) => {
        if (_index !== index) return s;
        return { ...s, [event.target.name]: event.target.value };
      }),
    });
  }

  handleEditSingleObject = (name, fieldName) => (event) => {
    let obj = {};
    obj[name] = { ...this.state[name] };
    let value = ((event.target.type === 'checkbox') ? event.target.checked :
      event.target.value);
    obj[name][fieldName] = value;
    this.setState({ [name]: obj[name] });
  }

  validate = () => {
    let error = this.child.current.validate();
    return error;
  }

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
              Sign Up
          </Typography>
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
                    Welcome to MigrantHub.
                </Typography>
                  <Typography variant="subheading">
                    Check email for activation.
                </Typography>
                </React.Fragment>
              ) : (
                  <React.Fragment>
                    {this.getStepContent(activeStep)}
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

SignUpBusiness.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignUpBusiness);