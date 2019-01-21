import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import validator from 'validator';
import FirstName from 'components/fields/contact/FirstName';
import LastName from 'components/fields/contact/LastName';
import Age from 'components/fields/personal/Age';
import Nationality from 'components/fields/personal/Nationality';
import Gender from 'components/fields/personal/Gender';
import Status from 'components/fields/personal/Status';
import RelationshipStatus from 'components/fields/personal/RelationshipStatus';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

const styles = ({});

class PersonalInfo extends Component {
  state = {
    firstNameError: '',
    lastNameError: '',
    ageError: '',
    genderError: '',
    nationalityError: '',
    relationshipStatusError: '',
    statusError: '',
  }

  validate = () => {
    const {
      firstName, lastName, age, gender, nationality, relationshipStatus, status, intl,
    } = this.props;
    let isError = false;
    const errors = {
      firstNameError: '',
      lastNameError: '',
      ageError: '',
      genderError: '',
      nationalityError: '',
      relationshipStatusError: '',
      statusError: '',
    };

    if (validator.isEmpty(firstName)) {
      errors.firstNameError = `${intl.formatMessage({ id: 'contact.firstname' })}  ${intl.formatMessage({ id: 'isrequired' })}`;
      isError = true;
    } else if (!validator.isAlpha(firstName)) {
      errors.firstNameError = `${intl.formatMessage({ id: 'contact.firstname' })}  ${intl.formatMessage({ id: 'notvalid' })}`;
      isError = true;
    }

    if (validator.isEmpty(lastName)) {
      errors.lastNameError = `${intl.formatMessage({ id: 'contact.lastname' })}  ${intl.formatMessage({ id: 'isrequired' })}`;
      isError = true;
    } else if (!validator.isAlpha(lastName)) {
      errors.lastNameError = `${intl.formatMessage({ id: 'contact.lastname' })}  ${intl.formatMessage({ id: 'notvalid' })}`;
      isError = true;
    }

    if (validator.isEmpty(age)) {
      errors.ageError = `${intl.formatMessage({ id: 'personal.age' })}  ${intl.formatMessage({ id: 'isrequired' })}`;
      isError = true;
    } else if (!validator.isInt(age, { min: 1, max: 100 })) {
      errors.ageError = `${intl.formatMessage({ id: 'personal.age' })}  ${intl.formatMessage({ id: 'notvalid' })}`;
      isError = true;
    }

    if (validator.isEmpty(gender)) {
      errors.genderError = `${intl.formatMessage({ id: 'personal.gender' })}  ${intl.formatMessage({ id: 'isrequired' })}`;
      isError = true;
    }

    if (validator.isEmpty(nationality)) {
      errors.nationalityError = `${intl.formatMessage({ id: 'personal.nationality' })}  ${intl.formatMessage({ id: 'isrequired' })}`;
      isError = true;
    } else if (!validator.isAlpha(nationality)) {
      errors.nationalityError = `${intl.formatMessage({ id: 'personal.nationality' })}  ${intl.formatMessage({ id: 'notvalid' })}`;
      isError = true;
    }

    if (validator.isEmpty(relationshipStatus)) {
      errors.relationshipStatusError = `${intl.formatMessage({ id: 'personal.relationship' })}  ${intl.formatMessage({ id: 'isrequired' })}`;
      isError = true;
    }

    if (validator.isEmpty(status)) {
      errors.statusError = `${intl.formatMessage({ id: 'personal.status' })}  ${intl.formatMessage({ id: 'isrequired' })}`;
      isError = true;
    }

    this.setState(prevState => ({
      ...prevState,
      ...errors,
    }));

    return isError;
  }

  render() {
    const {
      handleChange, firstName, lastName, age, gender, nationality, relationshipStatus, status,
    } = this.props;
    const {
      firstNameError, lastNameError, ageError, genderError, nationalityError, relationshipStatusError, statusError,
    } = this.state;

    return (
      <React.Fragment>
        <Typography variant="title" gutterBottom>
          <FormattedMessage id="signup.personalinfo" />
        </Typography>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={6}>
            <FirstName
              firstName={firstName}
              firstNameError={firstNameError}
              handleChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <LastName
              lastName={lastName}
              lastNameError={lastNameError}
              handleChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Age
              age={age}
              ageError={ageError}
              handleChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <Nationality
              nationality={nationality}
              nationalityError={nationalityError}
              handleChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Gender
              gender={gender}
              genderError={genderError}
              handleChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Status
              status={status}
              statusError={statusError}
              handleChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <RelationshipStatus
              relationshipStatus={relationshipStatus}
              relationshipStatusError={relationshipStatusError}
              handleChange={handleChange}
            />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

PersonalInfo.propTypes = {
  handleChange: PropTypes.func.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  age: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  nationality: PropTypes.string.isRequired,
  relationshipStatus: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  intl: intlShape.isRequired,
};

export default withStyles(styles)(injectIntl(PersonalInfo, { withRef: true }));
