import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { handleChange } from 'helpers/Forms';
import { handleAutoSuggestChange, handleEditObjectAutosuggest } from 'helpers/Autosuggest';
import { handleAddObject, handleEditObject, handleEditSingleObject, handleRemoveObject } from 'helpers/Object';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import Group from "@material-ui/icons/Group";
import ListAlt from "@material-ui/icons/ListAlt";
import CalendarToday from "@material-ui/icons/CalendarToday";
import Check from "@material-ui/icons/Check";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import InfoArea from "components/InfoArea/InfoArea.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";

import registerPageStyle from "assets/jss/material-dashboard-pro-react/views/registerPageStyle";
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';


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
    const error = await this.child.current._wrappedInstance.validate();
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
        <div className={classes.register}>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={12}>
                <Card className={classes.cardSignup}>
                  <h2 className={classes.cardTitle}>
                    <FormattedMessage id="signup.register" />
                  </h2>
                  <Stepper activeStep={activeStep} className={classes.stepper}>
                    {this.props.steps.map(label => (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                  <CardBody>
                    <GridContainer justify="center">
                      <GridItem xs={12} sm={12} md={5}>
                        <InfoArea
                          title={<FormattedMessage id="signup.servicehub" />}
                          description={<FormattedMessage id="signup.servicehubDesc" />}
                          icon={ListAlt}
                          iconColor="rose"
                        />
                        <InfoArea
                          title={<FormattedMessage id="signup.eventhub" />}
                          description={<FormattedMessage id="signup.eventhubDesc" />}
                          icon={CalendarToday}
                          iconColor="primary"
                        />
                        <InfoArea
                          title={<FormattedMessage id="signup.connecthub" />}
                          description={<FormattedMessage id="signup.connecthubDesc" />}
                          icon={Group}
                          iconColor="info"
                        />
                      </GridItem>
                      <GridItem xs={12} sm={8} md={5}>
                        <form className={classes.form}>
                          <React.Fragment>
                            {activeStep === this.props.steps.length ? (
                              <React.Fragment>
                                <Typography variant="headline" gutterBottom>
                                  <FormattedMessage id="signup.welcome" />
                            </Typography>
                                <Typography variant="subheading">
                                  <FormattedMessage id="signup.login" />
                            </Typography>
                                <Link to={`/login`}>
                                  <Button round color="primary">
                                    <FormattedMessage id="home.getStarted" />
                                </Button>
                                </Link>
                              </React.Fragment>
                            ) : (
                                <React.Fragment>
                                  {this.getStepContent(activeStep)}
                                  <div className={classes.buttons}>
                                    {activeStep !== 0 && (
                                      <Button onClick={this.handleBack} className={classes.button}>
                                        <FormattedMessage id="back" />
                                      </Button>
                                    )}
                                    <Button
                                      variant="contained"
                                      color="primary"
                                      onClick={this.handleNext}
                                      className={classes.button}
                                    >
                                      {activeStep === this.props.steps.length - 1 
                                        ? (
                                          <FormattedMessage id="signup" />
                                        )
                                        : (
                                          <FormattedMessage id="next" />
                                        )
                                      }
                                    </Button>
                                  </div>
                                </React.Fragment>
                              )}
                          </React.Fragment>
                        </form>
                        <FormControlLabel
                          classes={{
                            root: classes.checkboxLabelControl,
                            label: classes.checkboxLabel
                          }}
                          control={
                            <Checkbox
                              tabIndex={-1}
                              checkedIcon={
                                <Check className={classes.checkedIcon} />
                              }
                              icon={<Check className={classes.uncheckedIcon} />}
                              classes={{
                                checked: classes.checked,
                                root: classes.checkRoot
                              }}
                            />
                          }
                          label={(
                            <FormattedHTMLMessage id="signup.terms" />
                          )}
                        />
                      </GridItem>
                    </GridContainer>
                  </CardBody>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(registerPageStyle)(SignUp);
