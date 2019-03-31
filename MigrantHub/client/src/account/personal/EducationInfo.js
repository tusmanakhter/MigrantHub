import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import validator from 'validator';
import EducationLevel from 'components/fields/education/EducationLevel';
import ProficiencyExams from 'components/fields/education/ProficiencyExams';
import Other from 'components/fields/Other';
import Divider from '@material-ui/core/Divider';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

const styles = ({});

class EducationInfo extends Component {
  state = {
    educationLevelError: '',
  }

  validate = () => {
    const { educationLevel, intl } = this.props;
    let isError = false;
    const errors = {
      educationLevelError: '',
    };

    if (validator.isEmpty(educationLevel)) {
      errors.educationLevelError = `${intl.formatMessage({ id: 'educ.level' })}  ${intl.formatMessage({ id: 'isrequired' })}`;
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
      handleChange, handleEditSingleObject, educationLevel, proficiencyExams,
    } = this.props;
    const { educationLevelError } = this.state;

    return (
      <React.Fragment>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Typography align="left" color="textSecondary" variant="h6" gutterBottom>
              <FormattedMessage id="signup.education" />
            </Typography>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <EducationLevel
              educationLevel={educationLevel}
              educationLevelError={educationLevelError}
              handleChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <ProficiencyExams
              proficiencyExams={proficiencyExams}
              handleChange={handleEditSingleObject}
            />
          </Grid>
          <Grid item xs={12} sm={9}>
            <Other
              other={proficiencyExams.others}
              otherError=""
              handleChange={handleEditSingleObject('proficiencyExams', 'others')}
            />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

EducationInfo.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleEditSingleObject: PropTypes.func.isRequired,
  educationLevel: PropTypes.string.isRequired,
  proficiencyExams: PropTypes.shape({}).isRequired,
  intl: intlShape.isRequired,
};

export default withStyles(styles)(injectIntl(EducationInfo, { withRef: true }));
