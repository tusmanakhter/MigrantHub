import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import { AuthConsumer } from 'routes/AuthContext';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { toast } from 'react-toastify';
import Divider from '@material-ui/core/Divider';
import { handleChange, login } from 'helpers/Forms';
import Grid from '@material-ui/core/Grid';
import TextBox from 'components/fields/generic/TextBox';
import JobFormStepper from 'jobs/form/JobFormStepper';
import JobFormLayout from 'jobs/form/JobFormLayout';
import FormValidator from 'forms/FormValidator';
import Validations from 'forms/Validations';
import { handleAutoSuggestChange } from 'helpers/Autosuggest';
import PositionType from 'components/fields/employment/PositionType';
import Location from 'components/fields/other/Location';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { FormHelperText } from '@material-ui/core';
import { PhoneMask } from 'lib/Masks';
import MaskedTextbox from 'components/fields/generic/MaskedTextbox';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const qs = require('qs');

const styles = theme => ({
  item: {
    marginBottom: 16,
  },
});

class BaseJobForm extends Component {
  constructor(props) {
    super(props);

    this.validator = new FormValidator(Validations.jobFormCreate);

    this.state = {
      loading: false,
      activeStep: 0,
      redirectToJobDetails: false,
      redirectToJobList: false,
      title: '',
      description: EditorState.createEmpty(),
      descriptionLength: 0,
      positionType: '',
      companyName: '',
      contactName: '',
      contactEmail: '',
      contactPhone: '',
      location: '',
      salaryStart: '',
      salaryEnd: '',
      website: '',
      dataRetrieved: false,
      validation: this.validator.valid(),
    };

    this.handleChange = handleChange.bind(this);
    this.handleAutoSuggestChange = handleAutoSuggestChange.bind(this);

    const { location } = this.props;
    if (location.state) {
      this.getData = this.getData.bind(this);
    }
  }

  componentDidMount() {
    const { location } = this.props;
    if (location.state) {
      this.getData(this);
    }
  }

  componentWillReceiveProps() {
    const { location } = this.props;
    if (location.state) {
      this.getData(this);
    }
  }

  getData() {
    const { dataRetrieved } = this.state;
    const { location } = this.props;
    const { state } = location;
    const { editMode, jobId } = state;

    if (!dataRetrieved) {
      this.setState({
        editMode,
        jobId,
      });

      axios.get(`/api/job/${jobId}`, {
        params: {
          _id: jobId,
        },
      }).then((response) => {
        console.log(response.data);
        const parsedObj = qs.parse(response.data);
        this.setState({
          title: parsedObj.title,
          positionType: parsedObj.positionType,
          companyName: parsedObj.companyName,
          contactName: parsedObj.contactName,
          contactEmail: parsedObj.contactPhone,
          contactPhone: parsedObj.contactPhone,
          location: parsedObj.location,
          salaryStart: parsedObj.salaryEnd,
          salaryEnd: parsedObj.salaryEnd,
          website: parsedObj.website,
        });

        if (parsedObj.description) {
          this.setState({
            description: EditorState.createWithContent(convertFromRaw(JSON.parse(parsedObj.description))),
            descriptionLength: EditorState.createWithContent(convertFromRaw(JSON.parse(parsedObj.description))).getCurrentContent().getPlainText('').length,
          });
        } else {
          this.setState({
            description: EditorState.createEmpty(),

          });
        }
      });
    }
  }


  onEditorStateChange = (description) => {
    this.setState({
      description,
      descriptionLength: description.getCurrentContent().getPlainText('').length,
    });
  };

  getStepContent = (step) => {
    const {
      title, description, positionType, companyName, contactName, contactEmail, contactPhone, location, salaryStart, salaryEnd,
      website, validation,
    } = this.state;

    const { classes } = this.props;

    switch (step) {
      case 0:
        return (
          <div className={classes.item}>
            <Grid container spacing={8}>
              <Grid item xs={12} sm={6}>
                <TextBox
                  name="title"
                  label="PositionTitle"
                  value={title}
                  handleChange={event => this.handleChange(event)}
                  error={validation.title.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <PositionType
                  positionType={positionType}
                  positionTypeError={validation.positionType.message}
                  handleChange={event => this.handleChange(event)}
                />
              </Grid>
              <Grid item xs={12}>
                <Location
                  location={location}
                  locationError={validation.location.message}
                  handleAutoSuggestChange={this.handleAutoSuggestChange('location')}
                />
              </Grid>
            </Grid>
          </div>
        );
      case 1:
        return (
          <div className={classes.item}>
            <Grid container spacing={8}>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Editor
                  editorState={description}
                  onEditorStateChange={this.onEditorStateChange}
                />
                <FormHelperText error={validation.descriptionLength.message}>{validation.descriptionLength.message}</FormHelperText>
              </Grid>
            </Grid>
          </div>
        );
      case 2:
        return (
          <div className={classes.item}>
            <Grid container spacing={8}>
              <Grid item xs={12}>
                <TextBox
                  name="companyName"
                  label="Company Name"
                  value={companyName}
                  handleChange={event => this.handleChange(event)}
                  error={validation.companyName.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextBox
                  name="website"
                  label="Website (Optional)"
                  value={website}
                  handleChange={event => this.handleChange(event)}
                  error=""
                />
              </Grid>
              <Grid item xs={12}>
                <TextBox
                  name="contactName"
                  label="Contact Name"
                  value={contactName}
                  handleChange={event => this.handleChange(event)}
                  error={validation.contactName.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextBox
                  name="contactEmail"
                  label="Contact Email"
                  value={contactEmail}
                  handleChange={event => this.handleChange(event)}
                  error={validation.contactEmail.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <MaskedTextbox
                  name="contactPhone"
                  label="Contact Phone"
                  placeholder=""
                  value={contactPhone}
                  error={validation.contactPhone.message}
                  mask={PhoneMask}
                  handleChange={event => this.handleChange(event)}
                />
              </Grid>
            </Grid>
          </div>
        );
      default:
        throw new Error('Unknown step');
    }
  }

  validate = async (step) => {
    switch (step) {
      case 0:
        this.validator = new FormValidator(Validations.jobFormStep1);
        break;
      case 1:
        this.validator = new FormValidator(Validations.jobFormStep2);
        break;
      case 2:
        this.validator = new FormValidator(Validations.jobFormStep3);
        break;
      default:
        throw new Error('Unknown step');
    }

    let validation;
    if (step === 1) {
      this.setState({ loading: true });
      validation = await this.validator.validate(this.state);
      this.setState({ loading: false });
    } else {
      validation = await this.validator.validate(this.state);
    }

    this.setState(prevState => ({
      validation: {
        ...prevState.validation,
        ...validation,
      },
    }));

    return validation.isValid;
  };

  createJob = async () => {
    const {
      title, description, positionType, companyName, contactName, contactEmail, contactPhone, location, salaryStart, salaryEnd,
      website,
    } = this.state;
    const rawState = JSON.stringify(convertToRaw(description.getCurrentContent()));

    try {
      const result = await axios.post('/api/job/',
        qs.stringify({
          title,
          description: rawState,
          positionType,
          companyName,
          contactName,
          contactEmail,
          contactPhone,
          location,
          salaryStart,
          salaryEnd,
          website,
        }));
      if (result.status === 200) {
        toast.success('Job Post Created!');
        this.setState({
          loading: false,
          redirectToJobList: true,
        });
      }
      return false;
    } catch (e) {
      this.setState({
        loading: false,
      });
      toast.error('Error Creating Job Post!');
      return true;
    }
  };

  updateJob = async () => {
    const {
      title, description, positionType, companyName, contactName, contactEmail, contactPhone, location, salaryStart, salaryEnd,
      website, jobId,
    } = this.state;

    const rawState = JSON.stringify(convertToRaw(description.getCurrentContent()));

    try {
      const result = await axios.put(`/api/job/${jobId}`,
        qs.stringify({
          _id: jobId,
          title,
          description: rawState,
          positionType,
          companyName,
          contactName,
          contactEmail,
          contactPhone,
          location,
          salaryStart,
          salaryEnd,
          website,
        }));
      if (result.status === 200) {
        toast.success('Job Post Updated!');
        this.setState({
          loading: false,
          redirectToJobDetails: true,
        });
      }
      return false;
    } catch (e) {
      this.setState({
        loading: false,
      });
      toast.error('Error Updating Job Post!');
      return true;
    }
  };

  renderRedirectToJobDetails = () => {
    const { redirectToJobDetails, jobId } = this.state;
    if (redirectToJobDetails) {
      return <Redirect to={`/jobs/${jobId}`} />;
    }
  }

  renderRedirectToJobList = () => {
    const { redirectToJobList } = this.state;
    if (redirectToJobList) {
      return <Redirect to="/jobs/" />;
    }
  }

  render() {
    const steps = [
      'Position',
      'Description',
      'Company Info',
    ];

    const { classes } = this.props;
    const { editMode } = this.state;


    return (
      <JobFormLayout>
        {this.renderRedirectToJobDetails()}
        {this.renderRedirectToJobList()}
        <div className={classes.item}>
          <Typography variant="h5"><FormattedMessage id="job.create" /></Typography>
        </div>
        <div className={classes.item}>
          <JobFormStepper
            formSubmit={editMode ? this.updateJob : this.createJob}
            steps={steps}
            getStepContent={this.getStepContent}
            validate={this.validate}
          />
        </div>
        <div className={classes.item}>
          <Divider />
        </div>
      </JobFormLayout>
    );
  }
}

const JobForm = props => (
  <AuthConsumer>
    {context => <BaseJobForm context={context} {...props} />}
  </AuthConsumer>
);

BaseJobForm.propTypes = {
  classes: PropTypes.object.isRequired,
  intl: intlShape.isRequired,
};

export default withStyles(styles)(injectIntl(JobForm));
