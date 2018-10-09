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

import AccountInfo from './AccountInfo';
import ContactInfo from './ContactInfo';
import PersonalInfo from './PersonalInfo';
import LanguageInfo from './LanguageInfo';
import FamilyInfo from './FamilyInfo';
import EducationInfo from './EducationInfo';
import EmploymentInfo from './EmploymentInfo';
import OtherInfo from './OtherInfo';

import axios from 'axios';
var qs = require('qs');

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

const steps = ['Account', 'Contact', 'Personal', 'Language', 'Family', 'Education', 'Employment', 'Other'];

class SignUpMigrant extends Component {
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
    family : [],

    // Education Info
    educationLevel: '',
    proficiencyExams: {
      ielts: '',
      french: '',
      others: ''
    },

    // Employment Info
    jobStatus: '',
    lookingForJob: '',
    currentIncome: '', //optional
    workExperience: [], //optional

    // Other Info
    settlingLocation: '',
    settlingDuration: '',
    joiningReason: '',

    // DB response
    messageFromServer: ''
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
        return <PersonalInfo
                innerRef={this.child}
                handleChange={this.handleChange}
                age={this.state.age}
                gender={this.state.gender}
                nationality={this.state.nationality}
                relationshipStatus={this.state.relationshipStatus}
                status={this.state.status}
               />;
      case 3:
        return <LanguageInfo
                innerRef={this.child}
                handleChange={this.handleChange}
                handleAutoSuggestChange={this.handleAutoSuggestChange}
                handleAddObject={this.handleAddObject}
                handleRemoveObject={this.handleRemoveObject}
                handleEditObjectAutosuggest={this.handleEditObjectAutosuggest}
                handleEditObject={this.handleEditObject}
                languages={this.state.languages}
                writingLevel={this.state.writingLevel}
                speakingLevel={this.state.speakingLevel}
                motherTongue={this.state.motherTongue}
               />;
      case 4:
        return <FamilyInfo
                innerRef={this.child}
                handleAddObject={this.handleAddObject}
                handleRemoveObject={this.handleRemoveObject}
                handleEditObject={this.handleEditObject}
                family={this.state.family}
               />;
      case 5:
        return <EducationInfo
                innerRef={this.child}
                handleChange={this.handleChange}
                handleEditSingleObject={this.handleEditSingleObject}
                educationLevel={this.state.educationLevel}
                proficiencyExams={this.state.proficiencyExams}          
               />;
      case 6:
        return <EmploymentInfo
                innerRef={this.child}
                handleChange={this.handleChange}
                handleAddObject={this.handleAddObject}
                handleRemoveObject={this.handleRemoveObject}
                handleEditObject={this.handleEditObject}
                jobStatus={this.state.jobStatus}
                lookingForJob={this.state.lookingForJob}
                currentIncome={this.state.currentIncome}
                workExperience={this.state.workExperience}
               />;
      case 7:
        return <OtherInfo
                innerRef={this.child}
                handleChange={this.handleChange}
                handleAutoSuggestChange={this.handleAutoSuggestChange}
                settlingLocation={this.state.settlingLocation}
                settlingDuration={this.state.settlingDuration}
                joiningReason={this.state.joiningReason}
               />;
      default:
        throw new Error('Unknown step');
    }
  }

  handleNext = () => {
    let error = this.child.current.validate();
    if (!error) {
      this.setState(state => ({
          activeStep: state.activeStep + 1,
      }));
    }
    if(this.state.activeStep === 7){
        this.insertProfile(this);
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

  handleEditObject= (name, index) => (event) => {
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

  // Send profile data in post body to add to mongodb
  insertProfile(e) {
      if(e.state.proficiencyExams.french === ''){
          e.state.proficiencyExams.french = 'false'
      }
      if(e.state.proficiencyExams.ielts === ''){
          e.state.proficiencyExams.ielts = 'false'
      }
      axios.post('/insertProfile',
          qs.stringify({
              email: e.state.email,
              password: e.state.password,
              confirmPassword: e.state.confirmPassword,
              firstName: e.state.firstName,
              lastName: e.state.lastName,
              address: e.state.address,
              apartment: e.state.apartment,
              city: e.state.city,
              province: e.state.province,
              postalCode: e.state.postalCode,
              phoneNumber: e.state.phoneNumber,
              age: e.state.age,
              gender: e.state.gender,
              nationality: e.state.nationality,
              relationshipStatus: e.state.relationshipStatus,
              status: e.state.status,
              languages: e.state.languages,
              writingLevel: e.state.writingLevel,
              speakingLevel: e.state.speakingLevel,
              motherTongue: e.state.motherTongue,
              family: e.state.family,
              educationLevel: e.state.educationLevel,
              proficiencyExams: e.state.proficiencyExams,
              jobStatus: e.state.jobStatus,
              lookingForJob: e.state.lookingForJob,
              currentIncome: e.state.currentIncome,
              workExperience: e.state.workExperience,
              settlingLocation: e.state.settlingLocation,
              settlingDuration: e.state.settlingDuration,
              joiningReason: e.state.joiningReason
          })).then(function (response) {
          e.setState({
              messageFromServer: response.data
          });
      });
  }

  render() {
    const { classes } = this.props;
    const { activeStep } = this.state;

    return (
      <React.Fragment>
          {this.state.messageFromServer.split('\n').map((item, key) => {
              return <span key={key}>{item}<br/></span>
          })}
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

SignUpMigrant.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignUpMigrant);