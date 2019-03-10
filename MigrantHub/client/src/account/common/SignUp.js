import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import NextIcon from '@material-ui/icons/ArrowForward';
import BackIcon from '@material-ui/icons/ArrowBack';
import CheckIcon from '@material-ui/icons/Check';
import CircularProgress from '@material-ui/core/CircularProgress';
import { injectIntl, FormattedMessage, FormattedHTMLMessage } from 'react-intl';

const styles = {
  stepper: {
    paddingRight: 0,
    paddingLeft: 0,
  },
  item: {
    marginBottom: 16,
  },
  btn: {
    textTransform: 'unset',
    height: 46,
    fontSize: 'inherit',
  },
  terms: {
    fontSize: 14,
    marginBottom: 16,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
  },
};

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      loading: false,
    };

    const { steps, getStepContent } = this.props;
    this.sendStep = steps.length;
    this.getStepContent = getStepContent;
  }

  handleNext = async () => {
    const { activeStep } = this.state;
    const { createAccount, validate, steps } = this.props;

    const isValid = await validate(activeStep);

    if (isValid) {
      if (activeStep === steps.length - 1) {
        this.setState({
          loading: true,
        });
        const createError = await createAccount();

        if (createError) {
          this.setState({
            loading: false,
          });
        }
      } else {
        this.setState(state => ({
          activeStep: state.activeStep + 1,
        }));
      }
    }
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  render() {
    const { classes, steps } = this.props;
    const { activeStep, loading } = this.state;

    let nextButtonMessage;
    if (activeStep === steps.length - 1 && loading) {
      nextButtonMessage = (
        <>
          <CircularProgress size={30} color="inherit" />
        </>
      );
    } else if (activeStep === steps.length - 1) {
      nextButtonMessage = (
        <>
          <FormattedMessage id="signup" />
          <CheckIcon style={{ marginLeft: 5 }} />
        </>
      );
    } else {
      nextButtonMessage = (
        <>
          <FormattedMessage id="next" />
          <NextIcon style={{ marginLeft: 5 }} />
        </>
      );
    }

    return (
      <>
        {steps.length !== 1 ? (
          <>
            <Stepper alternativeLabel activeStep={activeStep} className={classes.stepper}>
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <form onSubmit={e => e.preventDefault()}>
              {this.getStepContent(activeStep)}
              <div className={classes.buttons}>
                <div className={classes.item}>
                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    onClick={this.handleBack}
                    className={classes.btn}
                    disabled={activeStep === 0}
                  >
                    <BackIcon />
                    <FormattedMessage id="back" style={{ marginRight: 5 }} />
                  </Button>
                </div>
                <div className={classes.item}>
                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    onClick={this.handleNext}
                    className={classes.btn}
                  >
                    {nextButtonMessage}
                  </Button>
                </div>
              </div>
            </form>
          </>
        ) : (
          <form onSubmit={e => e.preventDefault()}>
            {this.getStepContent()}
            <div className={classes.item}>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                onClick={this.handleNext}
                className={classes.btn}
                fullWidth
              >
                {nextButtonMessage}
              </Button>
            </div>
          </form>
        )}
        <div className={classes.terms}>
          <FormattedHTMLMessage id="signup.terms" />
        </div>
      </>
    );
  }
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
  steps: PropTypes.array.isRequired,
  getStepContent: PropTypes.func.isRequired,
  validate: PropTypes.func.isRequired,
};

export default withStyles(styles)(injectIntl(SignUp));
