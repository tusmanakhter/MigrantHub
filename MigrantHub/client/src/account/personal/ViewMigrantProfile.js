import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { AuthConsumer } from 'routes/AuthContext';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';

// @material-ui/icons
import PermIdentity from '@material-ui/icons/PermIdentity';

// core components
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';
import Clearfix from 'components/Clearfix/Clearfix.jsx';
import Card from 'components/Card/Card.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import CardHeader from 'components/Card/CardHeader.jsx';
import CardIcon from 'components/Card/CardIcon.jsx';
import CustomLinearProgress from 'components/CustomLinearProgress/CustomLinearProgress.jsx';
import { FormattedMessage } from 'react-intl';

const qs = require('qs');

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginLeft: 75,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  label: {
    fontWeight: 'bold',
  },
});

class ViewMigrantProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountProgress: 0,
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
    const { user } = this.context;
    axios.get(`/api/migrants/${user.username}`).then((response) => {
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
        const progress = Object.keys(jsonObj).map((key, index) => (jsonObj.key !== null ? jsonObj.key : ''));
        this.setState({
          accountProgress: Math.round((progress.length / 32) * 100),
        });
      }
    });
  }

  render() {
    const {
      accountProgress, firstName, lastName, address, apartment, city, province, postalCode, phoneNumber,
      age, gender, nationality, relationshipStatus, status, languages, writingLevel,
      speakingLevel, motherTongue, family, educationLevel, proficiencyExams, jobStatus,
      lookingForJob, currentIncome, workExperience, settlingLocation, settlingDuration,
      joiningReason, email,
    } = this.state;
    const { classes } = this.props;

    return (
      <React.Fragment>
        <div className={classes.root}>
          <GridItem>
            <legend> <FormattedMessage id="profile.progress" /> </legend>
            {accountProgress}%
            <CustomLinearProgress
              variant="determinate"
              color="info"
              value={accountProgress}
            />
            <h6><FormattedMessage id="profile.progressdesc" /></h6>
            <small>
              <br /><i><b><FormattedMessage id="profile.legalwarn" /></b></i>
            </small>
          </GridItem>
          <div>
            <GridContainer>
              <GridItem xs={11}>
                <Card>
                  <CardHeader color="info" icon>
                    <CardIcon color="warning">
                      <PermIdentity />
                    </CardIcon>
                  </CardHeader>
                  <CardBody>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={6}>
                        First Name
                        <p><b>{firstName || 'N/A'}</b></p>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={6}>
                        Last Name
                        <p><b>{lastName || 'N/A'}</b></p>
                      </GridItem>
                    </GridContainer>
                    <br />
                    <hr />
                    <b>PERSONAL INFORMATION</b>
                    <br />
                    <hr />
                    <br />
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={4}>
                        Age
                        <p><b>{age || 'N/A'}</b></p>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                        Gender
                        <p><b>{gender || 'N/A'}</b></p>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                        Nationality
                        <p><b>{nationality || 'N/A'}</b></p>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                        Relationship Status
                        <p><b>{relationshipStatus || 'N/A'}</b></p>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                        Status
                        <p><b>{status}</b></p>
                      </GridItem>
                    </GridContainer>
                    <Clearfix />
                  </CardBody>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
          <GridContainer>
            <GridItem xs={11}>
              <Card>
                <CardBody>
                  <br />
                  <hr />
                  <b>LANGUAGE INFORMATION</b>
                  <br />
                  <hr />
                  <br />
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={4}>
                      Mother Tongue
                      <p><b>{motherTongue || 'N/A'}</b></p>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      Speaking Level
                      <p><b>{speakingLevel || 'N/A'}</b></p>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      Writing Level
                      <p><b>{writingLevel || 'N/A'}</b></p>
                    </GridItem>
                  </GridContainer>
                  <br />
                  <hr />
                  <b>EDUCATION INFORMATION</b>
                  <br />
                  <hr />
                  <br />
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={4}>
                      Education Level
                      <p><b>{motherTongue || 'N/A'}</b></p>
                    </GridItem>
                  </GridContainer>
                  <br />
                  <hr />
                  <b>PROFICIENCY EXAMS</b>
                  <br />
                  <hr />
                  <br />
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={4}>
                      IELTS
                      <p><b>{proficiencyExams.ielts ? ('True') : ('False')}</b></p>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      French
                      <p><b>{proficiencyExams.french ? ('True') : ('False')}</b></p>
                    </GridItem>
                  </GridContainer>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
          <GridContainer>
            <GridItem xs={11}>
              <Card>
                <CardBody>
                  <br />
                  <hr />
                  <b>EMPLOYMENT INFORMATION</b>
                  <br />
                  <hr />
                  <br />
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={4}>
                      Looking for a job
                      <p><b>{lookingForJob || 'N/A'}</b></p>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      Current Income
                      <p><b>{currentIncome || 'N/A'}</b></p>
                    </GridItem>
                  </GridContainer>
                  <br />
                  <hr />
                  <b>SETTLING INFORMATION</b>
                  <br />
                  <hr />
                  <br />
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={4}>
                      Location
                      <p><b>{settlingLocation || 'N/A'}</b></p>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      Duration
                      <p><b>{settlingDuration || 'N/A'}</b></p>
                    </GridItem>
                  </GridContainer>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </React.Fragment>
    );
  }
}

ViewMigrantProfile.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

ViewMigrantProfile.contextType = AuthConsumer;

export default withStyles(styles)(ViewMigrantProfile);
