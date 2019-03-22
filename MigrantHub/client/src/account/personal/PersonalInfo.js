import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import validator from 'validator';
import Age from 'components/fields/personal/Age';
import Nationality from 'components/fields/personal/Nationality';
import Gender from 'components/fields/personal/Gender';
import Status from 'components/fields/personal/Status';
import RelationshipStatus from 'components/fields/personal/RelationshipStatus';
import Divider from '@material-ui/core/Divider';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

const styles = ({});

class PersonalInfo extends Component {
  state = {
    ageError: '',
    genderError: '',
    nationalityError: '',
    relationshipStatusError: '',
    statusError: '',
  }

  validate = () => {
    const {
      age, gender, nationality, relationshipStatus, status, intl,
    } = this.props;
    let isError = false;
    const errors = {
      ageError: '',
      genderError: '',
      nationalityError: '',
      relationshipStatusError: '',
      statusError: '',
    };

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
      handleChange, age, gender, nationality, relationshipStatus, status,
    } = this.props;
    const {
      ageError, genderError, nationalityError, relationshipStatusError, statusError,
    } = this.state;

    return (
      <React.Fragment>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Typography align="left" color="textSecondary" variant="h6" gutterBottom>
              <FormattedMessage id="signup.personalinfo" />
            </Typography>
            <Divider />
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
  age: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  gender: PropTypes.string.isRequired,
  nationality: PropTypes.string.isRequired,
  relationshipStatus: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  intl: intlShape.isRequired,
};

export default withStyles(styles)(injectIntl(PersonalInfo, { withRef: true }));
