import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Header from '../../components/Header/Header';
import ContactInfo from '../common/ContactInfo';
import PersonalInfo from './PersonalInfo';
import LanguageInfo from './LanguageInfo';
import FamilyInfo from './FamilyInfo';
import EducationInfo from './EducationInfo';
import EmploymentInfo from './EmploymentInfo';
import OtherInfo from './OtherInfo';
import { handleChange } from '../../helpers/Forms';
import { handleAutoSuggestChange, handleEditObjectAutosuggest } from '../../helpers/Autosuggest';
import { handleAddObject, handleEditObject, handleEditSingleObject, handleRemoveObject } from '../../helpers/Object';

const qs = require('qs');

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});

class EditMigrant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      address: '',
      apartment: '',
      city: '',
      province: '',
      postalCode: '',
      phoneNumber: '',
      age: '',
      gender: '',
      nationality: '',
      relationshipStatus: '',
      status: '',
      languages: [],
      writingLevel: '',
      speakingLevel: '',
      motherTongue: '',
      family: [],
      educationLevel: '',
      proficiencyExams: {
        ielts: false,
        french: false,
        others: '',
      },
      jobStatus: '',
      lookingForJob: '',
      currentIncome: '',
      workExperience: [],
      settlingLocation: '',
      settlingDuration: '',
      joiningReason: '',
    };

    this.contactChild = React.createRef();
    this.personalChild = React.createRef();
    this.langChild = React.createRef();
    this.familyChild = React.createRef();
    this.educationChild = React.createRef();
    this.employmentChild = React.createRef();
    this.otherChild = React.createRef();

    this.getAccount = this.getAccount.bind(this);
    this.handleChange = handleChange.bind(this);
    this.handleAutoSuggestChange = handleAutoSuggestChange.bind(this);
    this.handleEditObjectAutosuggest = handleEditObjectAutosuggest.bind(this);
    this.handleAddObject = handleAddObject.bind(this);
    this.handleEditObject = handleEditObject.bind(this);
    this.handleEditSingleObject = handleEditSingleObject.bind(this);
    this.handleRemoveObject = handleRemoveObject.bind(this);
  }

  componentDidMount() {
    this.getAccount(this);
  }

  componentWillReceiveProps() {
    this.getAccount(this);
  }

  getAccount() {
    const user = JSON.parse(localStorage.getItem('user'));
    axios.get('/api/migrants/' + user.username).then((response) => {
      if (response.status === 200) {
        const jsonObj = qs.parse(qs.stringify(response.data));

        let tempLanguages;
        let tempWorkExperience;
        let tempFamily;
        let tempProficiencyExams;
        let tempMotherTongue;
        let tempSettlingLocation;

        if (jsonObj.languages !== undefined) {
          tempLanguages = jsonObj.languages;
        } else {
          tempLanguages = [];
        }

        if (jsonObj.workExperience !== undefined) {
          tempWorkExperience = jsonObj.workExperience;
        } else {
          tempWorkExperience = [];
        }

        if (jsonObj.family !== undefined) {
          tempFamily = jsonObj.family;
        } else {
          tempFamily = [];
        }
        if (jsonObj.proficiencyExams !== undefined) {
            tempProficiencyExams = jsonObj.proficiencyExams;
        } else {
            tempProficiencyExams = {
                ielts: false,
                french: false,
                others: "",
            };
        }
        if (jsonObj.motherTongue !== undefined) {
          tempMotherTongue = jsonObj.motherTongue;
        } else {
          tempMotherTongue = '';
        }

        if (jsonObj.settlingLocation !== undefined) {
          tempSettlingLocation = jsonObj.settlingLocation;
        } else {
          tempSettlingLocation = '';
        }

        this.setState({
          email: jsonObj.email,
          password: jsonObj.password,
          confirmPassword: jsonObj.confirmPassword,
          firstName: jsonObj.firstName,
          lastName: jsonObj.lastName,
          address: jsonObj.address,
          apartment: jsonObj.apartment,
          city: jsonObj.city,
          province: jsonObj.province,
          postalCode: jsonObj.postalCode,
          phoneNumber: jsonObj.phoneNumber,
          age: jsonObj.age,
          gender: jsonObj.gender,
          nationality: jsonObj.nationality,
          relationshipStatus: jsonObj.relationshipStatus,
          status: jsonObj.status,
          languages: tempLanguages,
          writingLevel: jsonObj.writingLevel,
          speakingLevel: jsonObj.speakingLevel,
          motherTongue: tempMotherTongue,
          family: tempFamily,
          educationLevel: jsonObj.educationLevel,
          proficiencyExams: tempProficiencyExams,
          jobStatus: jsonObj.jobStatus,
          lookingForJob: jsonObj.lookingForJob,
          currentIncome: jsonObj.currentIncome,
          workExperience: tempWorkExperience,
          settlingLocation: tempSettlingLocation,
          settlingDuration: jsonObj.settlingDuration,
          joiningReason: jsonObj.joiningReason,
        });
      }
    });
  }

  handleSave = async () => {
    const error = await this.validate();

    if (!error) {
      this.updateAccount(this);
    }
  };

  validate = async () => {
    const contactError = await this.contactChild.current.validate();
    const personalError = await this.personalChild.current.validate();
    const langError = await this.langChild.current.validate();
    const familyError = await this.familyChild.current.validate();
    const educationError = await this.educationChild.current.validate();
    const employmentError = await this.employmentChild.current.validate();
    const otherError = await this.otherChild.current.validate();

    const errors = [contactError, personalError, langError, familyError,
      educationError, employmentError, otherError];
    if (errors.indexOf(true) > -1) {
      return true;
    }
    return false;
  }

  updateAccount(e) {
    const {
      email, password, confirmPassword, firstName, lastName, address, apartment, city, province,
      postalCode, phoneNumber, age, gender, nationality, relationshipStatus, status,
      languages, writingLevel, speakingLevel, motherTongue, family, educationLevel,
      proficiencyExams, jobStatus, lookingForJob, currentIncome, workExperience,
      settlingLocation, settlingDuration, joiningReason,
    } = this.state;

    axios.put('/api/migrants/' + email,
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
      e.setState({
        messageFromServer: response.data,
      });
    });
  }

  render() {
    const {
      firstName, lastName, address, apartment, city, province, postalCode, phoneNumber,
      age, gender, nationality, relationshipStatus, status, languages, writingLevel,
      speakingLevel, motherTongue, family, educationLevel, proficiencyExams, jobStatus,
      lookingForJob, currentIncome, workExperience, settlingLocation, settlingDuration,
      joiningReason,
    } = this.state;
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Header />
        <ContactInfo
          innerRef={this.contactChild}
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
        <PersonalInfo
          innerRef={this.personalChild}
          handleChange={this.handleChange}
          age={age}
          gender={gender}
          nationality={nationality}
          relationshipStatus={relationshipStatus}
          status={status}
        />
        <LanguageInfo
          innerRef={this.langChild}
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
        <FamilyInfo
          innerRef={this.familyChild}
          handleAddObject={this.handleAddObject}
          handleRemoveObject={this.handleRemoveObject}
          handleEditObject={this.handleEditObject}
          family={family}
        />
        <EducationInfo
          innerRef={this.educationChild}
          handleChange={this.handleChange}
          handleEditSingleObject={this.handleEditSingleObject}
          educationLevel={educationLevel}
          proficiencyExams={proficiencyExams}
        />
        <EmploymentInfo
          innerRef={this.employmentChild}
          handleChange={this.handleChange}
          handleAddObject={this.handleAddObject}
          handleRemoveObject={this.handleRemoveObject}
          handleEditObject={this.handleEditObject}
          jobStatus={jobStatus}
          lookingForJob={lookingForJob}
          currentIncome={currentIncome}
          workExperience={workExperience}
        />
        <OtherInfo
          innerRef={this.otherChild}
          handleChange={this.handleChange}
          handleAutoSuggestChange={this.handleAutoSuggestChange}
          settlingLocation={settlingLocation}
          settlingDuration={settlingDuration}
          joiningReason={joiningReason}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={this.handleSave}
          className={classes.button}
        >
                Save
        </Button>
      </React.Fragment>
    );
  }
}


EditMigrant.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(EditMigrant);
