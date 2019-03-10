import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import SignUp from 'account/common/SignUp';
import AccountInfo from 'account/common/AccountInfo';
import ContactInfo from 'account/common/ContactInfo';
import AboutInfo from 'account/business/AboutInfo';
import IdInfo from 'account/business/IdInfo';
import { FormattedMessage } from 'react-intl';

const qs = require('qs');

class SignUpBusiness extends Component {
  getStepContent(step) {
    const {
      email, password, corpId, firstName, lastName, address, apartment,
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
      email, password, corpId, firstName, lastName, address, apartment,
      city, province, postalCode, phoneNumber, organizationName, orgType,
      department, serviceType, description,
    } = event.state;
    axios.post('/api/accounts/create/business',
      qs.stringify({
        email,
        corpId,
        password,
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
    const steps = [
      <FormattedMessage id="signup.account" />,
      'ID',
      'Contact',
      <FormattedMessage id="signup.about" />,
    ];

    return (
      <React.Fragment>
        <SignUp
          createAccount={this.createAccount}
          steps={steps}
          getStepContent={this.getStepContent}
        />
      </React.Fragment>
    );
  }
}

export default SignUpBusiness;
