import React, { Component } from 'react';
import axios from 'axios';
import SignUp from '../common/SignUp';
import AccountInfo from '../common/AccountInfo';
import HomeLayout from '../../home/HomeLayout';


const qs = require('qs');

class SignUpAdmin extends Component {
  getStepContent(step) {
    const { email, password, confirmPassword } = this.state;

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
      default:
        throw new Error('Unknown step');
    }
  }

  // Send profile data in post body to add to mongodb
  createAccount(e) {
    axios.post('/api/accounts/create/admin',
      qs.stringify({
        email: e.state.email,
        password: e.state.password,
        confirmPassword: e.state.confirmPassword,
      })).then((response) => {
      e.setState({
        messageFromServer: response.data,
      });
    }).catch((error) => {
        e.setState({
            messageFromServer: error.response.data,
        });
    });
  }

  render() {
    const steps = ['Account'];

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

export default SignUpAdmin;
