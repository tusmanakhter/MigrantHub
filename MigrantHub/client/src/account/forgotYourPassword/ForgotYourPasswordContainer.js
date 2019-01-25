import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { handleChange } from 'helpers/Forms';
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import registerPageStyle from "assets/jss/material-dashboard-pro-react/views/registerPageStyle";

class ForgotYourPasswordContainer extends Component {
    constructor(props) {
        super(props);
        this.child = React.createRef();
        this.handleChange = handleChange.bind(this);
    }

    state = {
        activeStep: 0,
        email: '',
        password: '',
        confirmPassword: '',
        verificationCode: '',
        messageFromServer: '',
        verificationError: false,
    };

    verifyStep = 0;
    resetStep = this.props.steps.length;

    getStepContent = this.props.getStepContent;

    handleNext = async () => {
        const error = await this.child.current.validate();
        if (!error) {
            if (this.state.activeStep === this.verifyStep) {
                await this.props.verifyAccount(this);
            }
            if(this.state.verificationError){
                this.setState(state => ({
                    activeStep: 1,
                }));
            }else{
                this.setState(state => ({
                    activeStep: state.activeStep + 1,
                }));
            }
        }

        if (this.state.activeStep === this.resetStep) {
            this.props.resetPassword(this);
        }

        this.setState(state => ({
            messageFromServer: this.state.messageFromServer
        }));
    };

    handleBack = () => {
        this.setState(state => ({
            activeStep: state.activeStep - 1,
        }));
    };

    render() {
        const { classes } = this.props;
        const { activeStep, messageFromServer } = this.state;

        return (
            <React.Fragment>
                <div className={classes.register}>
                    <div className={classes.container}>
                        <GridContainer justify="center">
                            <GridItem xs={12} sm={12} md={12}>
                                <Card className={classes.cardSignup}>
                                    <Typography variant="subheading" alignLeft color='secondary'>
                                        {messageFromServer}
                                    </Typography>
                                    <h2 className={classes.cardTitle}>Reset Your Password</h2>
                                    <Stepper activeStep={activeStep} className={classes.stepper}>
                                        {this.props.steps.map(label => (
                                            <Step key={label}>
                                                <StepLabel>{label}</StepLabel>
                                            </Step>
                                        ))}
                                    </Stepper>
                                    <CardBody>
                                        <GridContainer justify="center">
                                            <GridItem xs={12} sm={8} md={5}>
                                                <form className={classes.form}>
                                                    <React.Fragment>
                                                        {activeStep === this.props.steps.length ? (
                                                            <React.Fragment>
                                                                <Typography variant="headline" gutterBottom>
                                                                    Welcome to MigrantHub.
                                                                </Typography>
                                                                <Typography variant="subheading">
                                                                    You may now login.
                                                                </Typography>
                                                                <Link to={`/login`}>
                                                                    <Button round color="primary">
                                                                        Get started
                                                                    </Button>
                                                                </Link>
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
                                                                        {activeStep === this.props.steps.length - 1 ? 'Reset' : 'Next'}
                                                                    </Button>
                                                                </div>
                                                            </React.Fragment>
                                                        )}
                                                    </React.Fragment>
                                                </form>
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

ForgotYourPasswordContainer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(registerPageStyle)(ForgotYourPasswordContainer);
