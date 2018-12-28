import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { handleChange } from '../../helpers/Forms';
import { handleAutoSuggestChange, handleEditObjectAutosuggest } from '../../helpers/Autosuggest';
import { handleAddObject, handleEditObject, handleEditSingleObject, handleRemoveObject } from '../../helpers/Object';

const styles = theme => ({
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

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.child = React.createRef();
    this.handleChange = handleChange.bind(this);
    this.handleAutoSuggestChange = handleAutoSuggestChange.bind(this);
    this.handleEditObjectAutosuggest = handleEditObjectAutosuggest.bind(this);
    this.handleAddObject = handleAddObject.bind(this);
    this.handleEditObject = handleEditObject.bind(this);
    this.handleEditSingleObject = handleEditSingleObject.bind(this);
    this.handleRemoveObject = handleRemoveObject.bind(this);
  }

  state = {
    activeStep: 0,

    // Account Info
    email: '',
    password: '',
    confirmPassword: '',

    // Id Info
    corpId: '',

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
    organizationName: '',
    orgType: '',
    department: '',
    serviceType: '',
    description: '',

    // Personal Info
    age: '',
    gender: '',
    nationality: '',
    relationshipStatus: '',
    status: '',

    // Language Info
    languages: [],
    writingLevel: '',
    speakingLevel: '',
    motherTongue: '',

    // Family Info
    family: [],

    // Education Info
    educationLevel: '',
    proficiencyExams: {
      ielts: '',
      french: '',
      others: '',
    },

    // Employment Info
    jobStatus: '',
    lookingForJob: '',
    currentIncome: '', // optional
    workExperience: [], // optional

    // Other Info
    settlingLocation: '',
    settlingDuration: '',
    joiningReason: '',

    // DB response
    messageFromServer: '',
  }

  sendStep = this.props.steps.length

  getStepContent = this.props.getStepContent

  handleNext = async () => {
    const error = await this.child.current.validate();
    if (!error) {
      this.setState(state => ({
        activeStep: state.activeStep + 1,
      }));
    }
    if (this.state.activeStep === this.sendStep) {
      this.props.createAccount(this);
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

  render() {
    const { classes } = this.props;
    const { activeStep } = this.state;

    return (
      <React.Fragment>
        <CssBaseline />
        {this.state.messageFromServer}
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography variant="display1" align="center">
              Sign Up
            </Typography>
            <Stepper activeStep={activeStep} className={classes.stepper}>
              {this.props.steps.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <React.Fragment>
              {activeStep === this.props.steps.length ? (
                <React.Fragment>
                  <Typography variant="headline" gutterBottom>
                    Welcome to MigrantHub.
                  </Typography>
                  <Typography variant="subheading">
                    You may now login.
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
                      {activeStep === this.props.steps.length - 1 ? 'Sign Up' : 'Next'}
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

SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignUp);
