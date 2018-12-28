import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';
import HomeLayout from '../../home/HomeLayout';
import SignUp from '../common/SignUp';
import AccountInfo from '../common/AccountInfo';
import PersonalInfo from './Minimal/PersonalInfo';
import AdditionalInfo from './Minimal/AdditionalInfo';

class SignUpMigrant extends Component {
  getStepContent(step) {
    const {
      email, password, confirmPassword, firstName, lastName, age, gender, nationality,
      relationshipStatus, status, educationLevel, jobStatus, settlingLocation, joiningReason,
    } = this.state;

    switch (step) {
      case 0:
        return (
          <AccountInfo
            innerRef={this.child}
            handleChange={this.handleChange}
            email={email}
            password={password}
            confirmPassword={confirmPassword}
          />
        );
      case 1:
        return (
          <PersonalInfo
            innerRef={this.child}
            handleChange={this.handleChange}
            firstName={firstName}
            lastName={lastName}
            age={age}
            gender={gender}
            nationality={nationality}
            relationshipStatus={relationshipStatus}
            status={status}
          />
        );
      case 2:
        return (
          <AdditionalInfo
            innerRef={this.child}
            handleChange={this.handleChange}
            handleAutoSuggestChange={this.handleAutoSuggestChange}
            educationLevel={educationLevel}
            jobStatus={jobStatus}
            settlingLocation={settlingLocation}
            joiningReason={joiningReason}
          />
        );
      default:
        throw new Error('Unknown step');
    }
  }

  // Send profile data in post body to add to mongodb
  createAccount(event) {
    const {
      email, password, confirmPassword, firstName, lastName, age, gender, nationality, relationshipStatus,
      status, educationLevel, jobStatus, settlingLocation, joiningReason,
    } = event.state;

    axios.post('/api/accounts/create/user',
      qs.stringify({
        email,
        password,
        confirmPassword,
        firstName,
        lastName,
        age,
        gender,
        nationality,
        relationshipStatus,
        status,
        educationLevel,
        jobStatus,
        settlingLocation,
        joiningReason,
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
    const steps = ['Account', 'Personal', 'Additional'];

    return (
      <React.Fragment>
        <HomeLayout>
          <SignUp
            createAccount={this.createAccount}
            steps={steps}
            getStepContent={this.getStepContent}
          />
        </HomeLayout>
      </React.Fragment>
    );
  }
}

export default SignUpMigrant;
