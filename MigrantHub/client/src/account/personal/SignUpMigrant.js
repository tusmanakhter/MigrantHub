import React, { Component } from 'react';
import HomeLayout from '../../home/HomeLayout'
import SignUp from '../common/SignUp';
import AccountInfo from '../common/AccountInfo';
import ContactInfo from '../common/ContactInfo';
import PersonalInfo from './PersonalInfo';
import LanguageInfo from './LanguageInfo';
import FamilyInfo from './FamilyInfo';
import EducationInfo from './EducationInfo';
import EmploymentInfo from './EmploymentInfo';
import OtherInfo from './OtherInfo';

import axios from 'axios';
var qs = require('qs');

class SignUpMigrant extends Component {
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

  // Send profile data in post body to add to mongodb
  createAccount(e) {
      if(e.state.proficiencyExams.french === ''){
          e.state.proficiencyExams.french = 'false'
      }
      if(e.state.proficiencyExams.ielts === ''){
          e.state.proficiencyExams.ielts = 'false'
      }
      axios.post('/account/create/user',
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
    const steps = ['Account', 'Contact', 'Personal', 'Language', 'Family', 'Education', 'Employment', 'Other'];

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