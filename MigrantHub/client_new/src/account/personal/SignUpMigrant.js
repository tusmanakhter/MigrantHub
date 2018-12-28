import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';
import HomeLayout from '../../home/HomeLayout';
import SignUp from '../common/SignUp';
import AccountInfo from '../common/AccountInfo';
import ContactInfo from '../common/ContactInfo';
import PersonalInfo from './PersonalInfo';
import LanguageInfo from './LanguageInfo';
import FamilyInfo from './FamilyInfo';
import EducationInfo from './EducationInfo';
import EmploymentInfo from './EmploymentInfo';
import OtherInfo from './OtherInfo';

class SignUpMigrant extends Component {
  getStepContent(step) {
    const {
      email, password, confirmPassword, firstName, lastName, address, apartment,
      city, province, postalCode, phoneNumber, age, gender, nationality, relationshipStatus,
      status, languages, writingLevel, speakingLevel, motherTongue, family, educationLevel,
      proficiencyExams, jobStatus, lookingForJob, currentIncome, workExperience,
      settlingLocation, settlingDuration, joiningReason,
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
      case 2:
        return (
          <PersonalInfo
            innerRef={this.child}
            handleChange={this.handleChange}
            age={age}
            gender={gender}
            nationality={nationality}
            relationshipStatus={relationshipStatus}
            status={status}
          />
        );
      case 3:
        return (
          <LanguageInfo
            innerRef={this.child}
            handleChange={this.handleChange}
            handleAutoSuggestChange={this.handleAutoSuggestChange}
            handleAddObject={this.handleAddObject}
            handleRemoveObject={this.handleRemoveObject}
            handleEditObjectAutosuggest={this.handleEditObjectAutosuggest}
            handleEditObject={this.handleEditObject}
            languages={languages}
            writingLevel={writingLevel}
            speakingLevel={speakingLevel}
            motherTongue={motherTongue}
          />
        );
      case 4:
        return (
          <FamilyInfo
            innerRef={this.child}
            handleAddObject={this.handleAddObject}
            handleRemoveObject={this.handleRemoveObject}
            handleEditObject={this.handleEditObject}
            family={family}
          />
        );
      case 5:
        return (
          <EducationInfo
            innerRef={this.child}
            handleChange={this.handleChange}
            handleEditSingleObject={this.handleEditSingleObject}
            educationLevel={educationLevel}
            proficiencyExams={proficiencyExams}
          />
        );
      case 6:
        return (
          <EmploymentInfo
            innerRef={this.child}
            handleChange={this.handleChange}
            handleAddObject={this.handleAddObject}
            handleRemoveObject={this.handleRemoveObject}
            handleEditObject={this.handleEditObject}
            jobStatus={jobStatus}
            lookingForJob={lookingForJob}
            currentIncome={currentIncome}
            workExperience={workExperience}
          />
        );
      case 7:
        return (
          <OtherInfo
            innerRef={this.child}
            handleChange={this.handleChange}
            handleAutoSuggestChange={this.handleAutoSuggestChange}
            settlingLocation={settlingLocation}
            settlingDuration={settlingDuration}
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
      email, password, confirmPassword, firstName, lastName, address, apartment,
      city, province, postalCode, phoneNumber, age, gender, nationality, relationshipStatus,
      status, languages, writingLevel, speakingLevel, motherTongue, family, educationLevel,
      proficiencyExams, jobStatus, lookingForJob, currentIncome, workExperience,
      settlingLocation, settlingDuration, joiningReason,
    } = event.state;

    if (proficiencyExams.french === '') {
      event.state.proficiencyExams.french = 'false';
    }
    if (proficiencyExams.ielts === '') {
      event.state.proficiencyExams.ielts = 'false';
    }

    axios.post('/api/accounts/create/user',
      qs.stringify({
        email,
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
        age,
        gender,
        nationality,
        relationshipStatus,
        status,
        languages,
        writingLevel,
        speakingLevel,
        motherTongue,
        family,
        educationLevel,
        proficiencyExams,
        jobStatus,
        lookingForJob,
        currentIncome,
        workExperience,
        settlingLocation,
        settlingDuration,
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
