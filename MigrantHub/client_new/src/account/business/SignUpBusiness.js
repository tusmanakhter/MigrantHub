import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import HomeLayout from '../../home/HomeLayout';
import SignUp from '../common/SignUp';
import AccountInfo from '../common/AccountInfo';
import ContactInfo from '../common/ContactInfo';
import AboutInfo from './AboutInfo';
import IdInfo from './IdInfo';

const qs = require('qs');

class SignUpBusiness extends Component {
  getStepContent(step) {
    const {
      email, password, confirmPassword, corpId, firstName, lastName, address, apartment,
      city, province, postalCode, phoneNumber, organizationName, orgType,
      department, serviceType, description,
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
          <IdInfo
            innerRef={this.child}
            handleChange={this.handleChange}
            corpId={corpId}
          />
        );
      case 2:
        return (
          <ContactInfo
            innerRef={this.child}
            handleChange={this.handleChange}
            firstName={firstName}
            lastName={lastName}
            address={address}
            apartment={apartment}
            city={city}
            province={province}
            postalCode={postalCode}
            phoneNumber={phoneNumber}
          />
        );
      case 3:
        return (
          <AboutInfo
            innerRef={this.child}
            handleChange={this.handleChange}
            organizationName={organizationName}
            orgType={orgType}
            department={department}
            serviceType={serviceType}
            description={description}
          />
        );
      default:
        throw new Error('Unknown step');
    }
  }

  // Send profile data in post body to add to mongodb
  createAccount(event) {
    const {
      email, password, confirmPassword, corpId, firstName, lastName, address, apartment,
      city, province, postalCode, phoneNumber, organizationName, orgType,
      department, serviceType, description,
    } = event.state;
    axios.post('/api/accounts/create/business',
      qs.stringify({
        email,
        corpId,
        password,
        confirmPassword,
        firstName,
        lastName,
        address,
        apartment,
        city,
        province,
        postalCode,
        phoneNumber,
        organizationName,
        orgType,
        department,
        serviceType,
        description,
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
    const steps = ['Account', 'ID', 'Contact', 'About'];

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

SignUpBusiness.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  family: PropTypes.shape({}).isRequired,
};

export default SignUpBusiness;
