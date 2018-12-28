import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import axios from 'axios';
import Header from '../../components/Header/Header';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const qs = require('qs');

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'left',
        color: theme.palette.text.secondary,
    },
    label: {
        fontWeight: 'bold',
    }
});

class ViewMigrantProfile extends Component {
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

    this.getAccount = this.getAccount.bind(this);
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
            tempProficiencyExams = [];
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
          motherTongue: jsonObj.motherTongue,
          family: tempFamily,
          educationLevel: jsonObj.educationLevel,
          proficiencyExams: tempProficiencyExams,
          jobStatus: jsonObj.jobStatus,
          lookingForJob: jsonObj.lookingForJob,
          currentIncome: jsonObj.currentIncome,
          workExperience: tempWorkExperience,
          settlingLocation: jsonObj.settlingLocation,
          settlingDuration: jsonObj.settlingDuration,
          joiningReason: jsonObj.joiningReason,
        });
      }
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
          <div className={classes.root}>
              <Grid
                  container spacing={6}
                  direction="column"
                  justify="flex-start"
                  alignItems="stretch"
              >
                  <Grid item xs={12}>
                      <Paper className={classes.paper}>
                          <Typography variant="title" gutterBottom>
                              Contact Information
                          </Typography>
                      </Paper>
                  </Grid>
                  <Grid item xs={12}>
                      <Paper className={classes.paper}>
                          <label className={classes.label}>
                              First Name:
                          </label>
                          {firstName}
                      </Paper>
                  </Grid>
                  <Grid item xs={12}>
                      <Paper className={classes.paper}>
                          <label className={classes.label}>
                              Last Name:
                          </label>
                          {lastName}
                      </Paper>
                  </Grid>
                  <Grid item xs={12}>
                      <Paper className={classes.paper}>
                          <label className={classes.label}>
                              Address:
                          </label>
                           {address}
                      </Paper>
                  </Grid>
                  <Grid item xs={12}>
                      <Paper className={classes.paper}>
                          <label className={classes.label}>
                              Apartment:
                          </label>
                          {apartment}
                      </Paper>
                  </Grid>

                  <Grid item xs={12}>
                      <Paper className={classes.paper}>
                          <label className={classes.label}>
                              City:
                          </label>
                          {city}
                      </Paper>
                  </Grid>
                  <Grid item xs={12}>
                      <Paper className={classes.paper}>
                          <label className={classes.label}>
                              Province:
                          </label>
                          {province}
                      </Paper>
                  </Grid>

                  <Grid item xs={12}>
                      <Paper className={classes.paper}>
                          <label className={classes.label}>
                              Postal Code:
                          </label>
                          {postalCode}
                      </Paper>
                  </Grid>
                  <Grid item xs={12}>
                      <Paper className={classes.paper}>
                          <label className={classes.label}>
                              Phone Number:
                          </label>
                          {phoneNumber}
                          </Paper>
                  </Grid>
              </Grid>
              <Grid
                  container spacing={6}
                  direction="column"
                  justify="flex-start"
                  alignItems="stretch"
              >
                  <Grid item xs={12}>
                      <Paper className={classes.paper}>
                          <Typography variant="title" gutterBottom>
                              Personal Information
                          </Typography>
                      </Paper>
                  </Grid>
                  <Grid item xs={12}>
                      <Paper className={classes.paper}>
                          <label className={classes.label}>
                              Age:
                          </label>
                          {age}
                      </Paper>
                  </Grid>
                  <Grid item xs={12}>
                      <Paper className={classes.paper}>
                          <label className={classes.label}>
                              Gender:
                          </label>
                          {gender}
                      </Paper>
                  </Grid>
                  <Grid item xs={12}>
                      <Paper className={classes.paper}>
                          <label className={classes.label}>
                              Nationality:
                          </label>
                          {nationality}
                      </Paper>
                  </Grid>
                  <Grid item xs={12}>
                      <Paper className={classes.paper}>
                          <label className={classes.label}>
                              Relationship Status:
                          </label>
                          {relationshipStatus}
                      </Paper>
                  </Grid>

                  <Grid item xs={12}>
                      <Paper className={classes.paper}>
                          <label className={classes.label}>
                              Status:
                          </label>
                          {status}
                      </Paper>
                  </Grid>
                  <Grid item xs={12}>
                      <Paper className={classes.paper}>
                          <label className={classes.label}>
                              Province:
                          </label>
                          {province}
                      </Paper>
                  </Grid>

                  <Grid item xs={12}>
                      <Paper className={classes.paper}>
                          <label className={classes.label}>
                              Postal Code:
                          </label>
                          {postalCode}
                      </Paper>
                  </Grid>
                  <Grid item xs={12}>
                      <Paper className={classes.paper}>
                          <label className={classes.label}>
                              Phone Number:
                          </label>
                          {phoneNumber}
                      </Paper>
                  </Grid>
              </Grid>
              <Grid
                  container spacing={6}
                  direction="column"
                  justify="flex-start"
                  alignItems="stretch"
              >
                  <Grid item xs={12}>
                      <Paper className={classes.paper}>
                          <Typography variant="title" gutterBottom>
                              Language Information
                          </Typography>
                      </Paper>
                  </Grid>
                  <Grid item xs={12}>
                      <Paper className={classes.paper}>
                          <label className={classes.label}>
                              Mother Tongue:
                          </label>
                          {motherTongue}
                      </Paper>
                  </Grid>
                  <Grid item xs={12}>
                      <Paper className={classes.paper}>
                          <label className={classes.label}>
                              Speaking Level:
                          </label>
                          {speakingLevel}
                      </Paper>
                  </Grid>
                  <Grid item xs={12}>
                      <Paper className={classes.paper}>
                          <label className={classes.label}>
                              Writing Level:
                          </label>
                          {writingLevel}
                      </Paper>
                  </Grid>
                  <Grid item xs={12}>
                      <Paper className={classes.paper}>
                          <Typography variant="title" gutterBottom>
                              Additional Languages
                          </Typography>
                      </Paper>
                  </Grid>
                  {languages.map((language, index) => (
                      <Grid
                          container spacing={6}
                          direction="row"
                          justify="flex-start"
                          alignItems="stretch"
                      >
                          <Grid item xs={4}>
                              <Paper className={classes.paper}>
                                  <label className={classes.label}>
                                      Language:
                                  </label>
                                  {language.name}
                              </Paper>
                          </Grid>
                          <Grid item xs={4}>
                              <Paper className={classes.paper}>
                                  <label className={classes.label}>
                                      Writing Level:
                                  </label>
                                  {language.writingLevel}
                              </Paper>
                          </Grid>
                          <Grid item xs={4}>
                              <Paper className={classes.paper}>
                                  <label className={classes.label}>
                                      Speaking Level:
                                  </label>
                                  {language.speakingLevel}
                              </Paper>
                          </Grid>
                      </Grid>
                  ))}
              </Grid>
              <Grid
                  container spacing={6}
                  direction="column"
                  justify="flex-start"
                  alignItems="stretch"
              >
                  <Grid item xs={12}>
                      <Paper className={classes.paper}>
                          <Typography variant="title" gutterBottom>
                              Family Information
                          </Typography>
                      </Paper>
                  </Grid>
                  {family.map((member, index) => (
                      <Grid
                          container spacing={6}
                          direction="row"
                          justify="flex-start"
                          alignItems="stretch"
                      >
                          <Grid item xs={3}>
                          <Paper className={classes.paper}>
                              <label className={classes.label}>
                                  Age:
                              </label>
                              {member.age}
                          </Paper>
                      </Grid>
                          <Grid item xs={3}>
                              <Paper className={classes.paper}>
                                  <label className={classes.label}>
                                      Relationship Status:
                                  </label>
                                  {member.relationshipStatus}
                              </Paper>
                          </Grid>
                          <Grid item xs={3}>
                              <Paper className={classes.paper}>
                                  <label className={classes.label}>
                                      Relation:
                                  </label>
                                  {member.relation}
                              </Paper>
                          </Grid>
                          <Grid item xs={3}>
                              <Paper className={classes.paper}>
                                  <label className={classes.label}>
                                      Gender:
                                  </label>
                                  {member.gender}
                              </Paper>
                          </Grid>
                      </Grid>
                  ))}
              </Grid>
              <Grid
                  container spacing={6}
                  direction="column"
                  justify="flex-start"
                  alignItems="stretch"
              >
                  <Grid item xs={12}>
                      <Paper className={classes.paper}>
                          <Typography variant="title" gutterBottom>
                              Education Information
                          </Typography>
                      </Paper>
                  </Grid>
                  <Grid item xs={12}>
                      <Paper className={classes.paper}>
                          <label className={classes.label}>
                              Education Level:
                          </label>
                          {educationLevel}
                      </Paper>
                  </Grid>
                  <Grid item xs={12}>
                      <Paper className={classes.paper}>
                          <Typography variant="title" gutterBottom>
                              Proficiency Exams
                          </Typography>
                      </Paper>
                  </Grid>
                  <Grid
                      container spacing={6}
                      direction="column"
                      justify="flex-start"
                      alignItems="stretch"
                  >
                      <Grid item xs={12}>
                          <Paper className={classes.paper}>
                              <label className={classes.label}>
                                  IELTS:
                              </label>
                              {proficiencyExams.ielts? ('True') : ('False')}
                          </Paper>
                      </Grid>
                      <Grid item xs={12}>
                          <Paper className={classes.paper}>
                              <label className={classes.label}>
                                  French:
                              </label>
                              {proficiencyExams.french? ('True') : ('False')}
                          </Paper>
                      </Grid>
                      <Grid item xs={12}>
                          <Paper className={classes.paper}>
                              <label className={classes.label}>
                                  Others:
                              </label>
                              {proficiencyExams.others}
                          </Paper>
                      </Grid>
                  </Grid>
              </Grid>
              <Grid
                  container spacing={6}
                  direction="column"
                  justify="flex-start"
                  alignItems="stretch"
              >
                  <Grid item xs={12}>
                      <Paper className={classes.paper}>
                          <Typography variant="title" gutterBottom>
                              Employment Information
                          </Typography>
                      </Paper>
                  </Grid>
                  <Grid item xs={12}>
                      <Paper className={classes.paper}>
                          <label className={classes.label}>
                              Job Status:
                          </label>
                          {jobStatus}
                      </Paper>
                  </Grid>
                  <Grid item xs={12}>
                      <Paper className={classes.paper}>
                          <label className={classes.label}>
                              Looking For Job:
                          </label>
                          {lookingForJob}
                      </Paper>
                  </Grid>
                  <Grid item xs={12}>
                      <Paper className={classes.paper}>
                          <label className={classes.label}>
                              Current Income:
                          </label>
                          {currentIncome}
                      </Paper>
                  </Grid>
                  <Grid item xs={12}>
                      <Paper className={classes.paper}>
                          <Typography variant="title" gutterBottom>
                              Work Experience:
                          </Typography>
                      </Paper>
                  </Grid>
                  {workExperience.map((work, index) => (
                      <Grid
                          container spacing={6}
                          direction="row"
                          justify="flex-start"
                          alignItems="stretch"
                      >
                          <Grid item xs={3}>
                              <Paper className={classes.paper}>
                                  <label className={classes.label}>
                                      Title:
                                  </label>
                                  {work.title}
                              </Paper>
                          </Grid>
                          <Grid item xs={3}>
                              <Paper className={classes.paper}>
                                  <label className={classes.label}>
                                      Company:
                                  </label>
                                  {work.company}
                              </Paper>
                          </Grid>
                          <Grid item xs={3}>
                              <Paper className={classes.paper}>
                                  <label className={classes.label}>
                                      Years:
                                  </label>
                                  {work.years}
                              </Paper>
                          </Grid>
                          <Grid item xs={3}>
                              <Paper className={classes.paper}>
                                  <label className={classes.label}>
                                      Gender:
                                  </label>
                                  {work.gender}
                              </Paper>
                          </Grid>
                      </Grid>
                  ))}
              </Grid>
              <Grid
                  container spacing={6}
                  direction="column"
                  justify="flex-start"
                  alignItems="stretch"
              >
                  <Grid item xs={12}>
                      <Paper className={classes.paper}>
                          <Typography variant="title" gutterBottom>
                              Employment Information
                          </Typography>
                      </Paper>
                  </Grid>
                  <Grid item xs={12}>
                      <Paper className={classes.paper}>
                          <label className={classes.label}>
                              Settling Location:
                          </label>
                          {settlingLocation}
                      </Paper>
                  </Grid>
                  <Grid item xs={12}>
                      <Paper className={classes.paper}>
                          <label className={classes.label}>
                              Settling Duration:
                          </label>
                          {settlingDuration}
                      </Paper>
                  </Grid>
                  <Grid item xs={12}>
                      <Paper className={classes.paper}>
                          <label className={classes.label}>
                              Joining Reason:
                          </label>
                          {joiningReason}
                      </Paper>
                  </Grid>
              </Grid>
          </div>
      </React.Fragment>
    );
  }
}

ViewMigrantProfile.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(ViewMigrantProfile);
