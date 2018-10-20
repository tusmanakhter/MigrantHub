import React, { Component } from 'react';

import SignUp from '../common/SignUp';
import AccountInfo from '../common/AccountInfo';
import ContactInfo from '../common/ContactInfo';
import AboutInfo from './AboutInfo';
import IdInfo from './IdInfo';

import axios from 'axios';
var qs = require('qs');

class SignUpBusiness extends Component {
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
        return <IdInfo
          innerRef={this.child}
          handleChange={this.handleChange}
          corpId={this.state.corpId}
        />;
      case 2:
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
      case 3:
        return <AboutInfo
          ref={this.child}
          handleChange={this.handleChange}
          age={this.state.age}
          gender={this.state.gender}
          organizationName={this.state.organizationName}
          orgType={this.state.orgType}
          department={this.state.department}
          serviceType={this.state.serviceType}
          description={this.state.description}
        />;
      default:
        throw new Error('Unknown step');
    }
  }

  // Send profile data in post body to add to mongodb
  insertBusinessProfile(e) {
    axios.post('/insertBusinessProfile',
      qs.stringify({
        email: e.state.email,
        corpId: e.state.corpId,
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
        organizationName: e.state.organizationName,
        orgType: e.state.orgType,
        department: e.state.department,
        serviceType: e.state.serviceType,
        description: e.state.description,
      })).then(function (response) {
        e.setState({
          messageFromServer: response.data
        });
      });
  }

  render() {
    const steps = ['Account', 'ID', 'Contact', 'About'];

    return (
      <React.Fragment>
        <SignUp
          insertProfile={this.insertBusinessProfile}
          steps={steps}
          getStepContent={this.getStepContent}
        />
      </React.Fragment>
    );
  }
}

export default SignUpBusiness;