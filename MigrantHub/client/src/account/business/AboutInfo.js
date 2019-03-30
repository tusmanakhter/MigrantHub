import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import TextBox from 'components/fields/generic/TextBox';
import Dropdown from 'components/fields/generic/Dropdown';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import validator from 'validator';
import { organizationTypes } from 'lib/SignUpConstants';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

const styles = ({});
class AboutInfo extends Component {
  state = {
    organizationNameError: '',
    orgTypeError: '',
    departmentError: '',
    serviceTypeError: '',
    descriptionError: '',
  }

  validate = () => {
    let isError = false;
    const errors = {
      organizationNameError: '',
      orgTypeError: '',
      departmentError: '',
      serviceTypeError: '',
      descriptionError: '',
    };

    const {
      organizationName, orgType, department, serviceType, description, intl,
    } = this.props;

    if (validator.isEmpty(organizationName)) {
      errors.organizationNameError = `${intl.formatMessage({ id: 'business.orgname' })}  ${intl.formatMessage({ id: 'isrequired' })}`;
      isError = true;
    }

    if (validator.isEmpty(orgType)) {
      errors.orgTypeError = `${intl.formatMessage({ id: 'business.orgtype' })}  ${intl.formatMessage({ id: 'isrequired' })}`;
      isError = true;
    }

    if (validator.isEmpty(department)) {
      errors.departmentError = `${intl.formatMessage({ id: 'business.dept' })}  ${intl.formatMessage({ id: 'isrequired' })}`;
      isError = true;
    }

    if (validator.isEmpty(serviceType)) {
      errors.serviceTypeError = `${intl.formatMessage({ id: 'business.service' })}  ${intl.formatMessage({ id: 'isrequired' })}`;
      isError = true;
    }

    if (validator.isEmpty(description)) {
      errors.descriptionError = `${intl.formatMessage({ id: 'business.desc' })}  ${intl.formatMessage({ id: 'isrequired' })}`;
      isError = true;
    }

    this.setState({
      ...errors,
    });

    return isError;
  }

  render() {
    const {
      organizationNameError, orgTypeError, departmentError, serviceTypeError, descriptionError,
    } = this.state;
    const {
      handleChange, organizationName, orgType, department, serviceType, description,
    } = this.props;

    return (
      <React.Fragment>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Typography align="left" color="textSecondary" variant="h6" gutterBottom>
              <FormattedMessage id="signup.about" />
            </Typography>
            <Divider />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextBox
              name="organizationName"
              label={<FormattedMessage id="business.orgname" />}
              placeholder=""
              value={organizationName}
              error={organizationNameError}
              handleChange={event => handleChange(event)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Dropdown
              name="orgType"
              label={<FormattedMessage id="business.orgtype" />}
              value={orgType}
              options={organizationTypes}
              error={orgTypeError}
              handleChange={event => handleChange(event)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextBox
              name="department"
              label={<FormattedMessage id="business.dept" />}
              placeholder=""
              value={department}
              error={departmentError}
              handleChange={event => handleChange(event)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextBox
              name="serviceType"
              label={<FormattedMessage id="business.service" />}
              placeholder=""
              value={serviceType}
              error={serviceTypeError}
              handleChange={event => handleChange(event)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextBox
              name="description"
              label={<FormattedMessage id="business.desc" />}
              placeholder=""
              value={description}
              error={descriptionError}
              handleChange={event => handleChange(event)}
            />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

AboutInfo.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  handleChange: PropTypes.func.isRequired,
  organizationName: PropTypes.string.isRequired,
  orgType: PropTypes.string.isRequired,
  department: PropTypes.string.isRequired,
  serviceType: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  intl: intlShape.isRequired,
};

export default withStyles(styles)(injectIntl(AboutInfo, { withRef: true }));
