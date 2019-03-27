import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import ContactInfo from 'account/common/ContactInfo';
import PersonalInfo from 'account/personal/PersonalInfo';
import LanguageInfo from 'account/personal/LanguageInfo';
import FamilyInfo from 'account/personal/FamilyInfo';
import EducationInfo from 'account/personal/EducationInfo';
import EmploymentInfo from 'account/personal/EmploymentInfo';
import OtherInfo from 'account/personal/OtherInfo';
import Paper from '@material-ui/core/Paper';
import { handleChange } from 'helpers/Forms';
import { handleAutoSuggestChange, handleEditObjectAutosuggest } from 'helpers/Autosuggest';
import {
  handleAddObject, handleEditObject, handleEditSingleObject, handleRemoveObject,
} from 'helpers/Object';
import { AuthConsumer } from 'routes/AuthContext';
import qs from 'qs';
import { FormattedMessage } from 'react-intl';
import { toast } from 'react-toastify';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = theme => ({
  layout: {
    background: 'white',
    padding: 20,
    [theme.breakpoints.down('sm')]: {
      padding: 10,
    },
  },
  item: {
    paddingTop: 10,
    paddingBottom: 20,
  },
  button: {
    margin: theme.spacing.unit,
  },
});

class EditMigrant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountProgress: 0,
      alert: null,
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
    this.handleChange = handleChange.bind(this);
    this.handleAutoSuggestChange = handleAutoSuggestChange.bind(this);
    this.handleEditObjectAutosuggest = handleEditObjectAutosuggest.bind(this);
    this.handleAddObject = handleAddObject.bind(this);
    this.handleEditObject = handleEditObject.bind(this);
    this.handleEditSingleObject = handleEditSingleObject.bind(this);
    this.handleRemoveObject = handleRemoveObject.bind(this);
  }

  componentDidMount() {
    this.getAccount();
  }

  componentWillReceiveProps() {
    this.getAccount();
  }

  getAccount = () => {
    const { user } = this.context;
    
    axios.get(`/api/migrants/${user.username}`).then((response) => {
      if (response.status === 200) {
        const migrantInfo = qs.parse(qs.stringify(response.data));
        if (migrantInfo.proficiencyExams) {
          migrantInfo.proficiencyExams = {
            ielts: (migrantInfo.proficiencyExams.ielts === 'true'),
            french: (migrantInfo.proficiencyExams.french === 'true'),
            others: migrantInfo.proficiencyExams.others || '',
          };
        }
        const progress = Object.keys(migrantInfo).filter(key => (migrantInfo[key] !== null && migrantInfo[key] !== ''));
        this.setState({
          ...migrantInfo,
          accountProgress: Math.round((progress.length / 27) * 100),
        });
      }
    });
  }

  validate = async () => {
    const contactError = await this.contactChild.current._wrappedInstance.validate();
    const personalError = await this.personalChild.current._wrappedInstance.validate();
    const langError = await this.langChild.current._wrappedInstance.validate();
    const familyError = await this.familyChild.current._wrappedInstance.validate();
    const educationError = await this.educationChild.current._wrappedInstance.validate();
    const employmentError = await this.employmentChild.current._wrappedInstance.validate();
    const otherError = await this.otherChild.current._wrappedInstance.validate();

    const errors = [contactError, personalError, langError, familyError,
      educationError, employmentError, otherError];
    if (errors.indexOf(true) > -1) {
      return true;
    }
    return false;
  }

  updateAccount = async () => {
    const error = await this.validate();
    if (error) {
      return;
    }

    const { user } = this.context;

    const {
      firstName, lastName, address, apartment, city, province,
      postalCode, phoneNumber, age, gender, nationality, relationshipStatus, status,
      languages, writingLevel, speakingLevel, motherTongue, family, educationLevel,
      proficiencyExams, jobStatus, lookingForJob, currentIncome, workExperience,
      settlingLocation, settlingDuration, joiningReason,
    } = this.state;

    axios.put(`/api/migrants/${user.username}`,
      qs.stringify({
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
      toast.success(response.data);
    }).catch((e) => {
      toast.error(e.response.data);
    });
  }

  render() {
    const {
      firstName, lastName, address, apartment, city, province, postalCode, phoneNumber,
      age, gender, nationality, relationshipStatus, status, languages, writingLevel,
      speakingLevel, motherTongue, family, educationLevel, proficiencyExams, jobStatus,
      lookingForJob, currentIncome, workExperience, settlingLocation, settlingDuration,
      joiningReason, alert, accountProgress,
    } = this.state;
    const { user } = this.context;
    const { classes } = this.props;

    return (
      <Paper className={classes.layout}>
        {alert}
        <Typography
          className={classes.title}
          align="left"
          color="textSecondary"
          variant="h5"
          gutterBottom
        >
          Edit Your Profile
        </Typography>
        <Grid container direction="column" justify="center">
          <legend> <FormattedMessage id="profile.progress" /> </legend>
          {accountProgress}%
          <LinearProgress
            variant="determinate"
            color="primary"
            value={accountProgress}
          />
          <h6><FormattedMessage id="profile.progressdesc" /></h6>
          <small>
            <i><b><FormattedMessage id="profile.legalwarn" /></b></i>
          </small>
        </Grid>
        <div className={classes.item}>
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
            user={user}
          />
        </div>
        <div className={classes.item}>
          <PersonalInfo
            innerRef={this.personalChild}
            handleChange={this.handleChange}
            age={age}
            gender={gender}
            nationality={nationality}
            relationshipStatus={relationshipStatus}
            status={status}
          />
        </div>
        <div className={classes.item}>
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
        </div>
        <div className={classes.item}>
          <FamilyInfo
            innerRef={this.familyChild}
            handleAddObject={this.handleAddObject}
            handleRemoveObject={this.handleRemoveObject}
            handleEditObject={this.handleEditObject}
            family={family}
          />
        </div>
        <div className={classes.item}>
          <EducationInfo
            innerRef={this.educationChild}
            handleChange={this.handleChange}
            handleEditSingleObject={this.handleEditSingleObject}
            educationLevel={educationLevel}
            proficiencyExams={proficiencyExams}
          />
        </div>
        <div className={classes.item}>
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
        </div>
        <div className={classes.item}>
          <OtherInfo
            innerRef={this.otherChild}
            handleChange={this.handleChange}
            handleAutoSuggestChange={this.handleAutoSuggestChange}
            settlingLocation={settlingLocation}
            settlingDuration={settlingDuration}
            joiningReason={joiningReason}
          />
        </div>
        <div>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            onClick={this.updateAccount}
          >
            Save
          </Button>
        </div>
      </Paper>
    );
  }
}


EditMigrant.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

EditMigrant.contextType = AuthConsumer;

export default withStyles(styles)(EditMigrant);
