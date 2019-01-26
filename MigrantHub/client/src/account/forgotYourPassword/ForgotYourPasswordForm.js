import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';
import HomeLayout from 'home/HomeLayout';
import ForgotYourPasswordContainer from 'account/forgotYourPassword/ForgotYourPasswordContainer';
import EmailInfo from 'account/forgotYourPassword/EmailInfo';
import NewPasswordInfo from 'account/forgotYourPassword/NewPasswordInfo';
import VerificationCode from 'account/forgotYourPassword/VerificationCode';
import { FormattedMessage } from 'react-intl';

class ForgotYourPasswordForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messageFromServer: '',
            verificationError: false,
        };
    }
    getStepContent(step) {
        const { email, password, confirmPassword, verificationCode } = this.state;

        switch (step) {
            case 0:
                return (
                    <EmailInfo
                        innerRef={this.child}
                        handleChange={this.handleChange}
                        email={email}
                    />
                );
            case 1:
                return (
                    <VerificationCode
                        innerRef={this.child}
                        handleChange={this.handleChange}
                        verificationCode={verificationCode}
                    />
                );
            case 2:
                return (
                    <NewPasswordInfo
                        innerRef={this.child}
                        handleChange={this.handleChange}
                        password={password}
                        confirmPassword={confirmPassword}
                    />
                );
            default:
                throw new Error('Unknown step');
        }
    }

    verifyAccount(event){
        const { email } = event.state;
        axios.post('/api/accounts/forgot/user',
            qs.stringify({
                email,
            })).then((response) => {
            event.setState({
                messageFromServer: <FormattedMessage id="forgotpassword.validationcode.sent" />
            });
        }).catch((error) => {
            event.setState({
                verificationError: true,
                messageFromServer: error.response.data,
            });
        });
    }

    resetPassword(event) {
        const { email, password, verificationCode } = event.state;

        axios.post('/api/accounts/reset/user',
            qs.stringify({
                email,
                password,
                verificationCode,
            })).then((response) => {
            event.setState({
                messageFromServer: response.data,
            });
        }).catch((error) => {
            event.setState({
                messageFromServer: error.response.data,
            });
        });
    }

    render() {
        const steps = [
            <FormattedMessage id="email" />,
            <FormattedMessage id="forgotpassword.validationcode" />,
            <FormattedMessage id="forgotpassword.resetPassword" />,
        ];
        const { messageFromServer, verificationError } = this.state;

        return (
            <React.Fragment>
                <HomeLayout>
                    <ForgotYourPasswordContainer
                        resetPassword={this.resetPassword}
                        verifyAccount={this.verifyAccount}
                        steps={steps}
                        getStepContent={this.getStepContent}
                        verificationError={verificationError}
                        messageFromServer={messageFromServer}
                    />
                </HomeLayout>
            </React.Fragment>
        );
    }
}

export default ForgotYourPasswordForm;
